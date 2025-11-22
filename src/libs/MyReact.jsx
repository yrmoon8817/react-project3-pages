import React,{memo, useEffect, useState} from "react";
import {createEventEmitter} from '../../shared/lib/EventEmitter'

const MyReact = (function MyReact(){
  let memorizedStates=[];

  let isInitialized = [];
  let cursor = 0;
  const deps=[];
  const cleanups=[];

  function useState(initialValue=""){
    const {forceUpdate} = useForceUpdate();
    if(!isInitialized[cursor]){
      memorizedStates[cursor]=initialValue;
      isInitialized[cursor]=true;
    }
    const state = memorizedStates[cursor];

    const setStateAt = (_cursor) =>(nextState)=>{
      if(state === nextState) return;
      memorizedStates[_cursor]= nextState;
      forceUpdate();
    }
    const setState = setStateAt(cursor);
    cursor= cursor +1;
    return [state, setState]
  }
  function useForceUpdate(){
    const [value, setValue] = React.useState(1);
    const forceUpdate = () => {
      setValue(value + 1);
      cursor=0;
    }
    return {forceUpdate};
  }

  function useEffect(effect,nextDeps){
    function runDeferredEffect(){
      function runEffect(){
        const cleanup = effect();
        if(cleanup) cleanups[cursor] = cleanup;
      }
      const ENOUGH_TIME_TO_RENDER =1;
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER);
    }
    if(!isInitialized[cursor]){
      isInitialized[cursor]=true;
      deps[cursor] = nextDeps;
      cursor+=1;
      runDeferredEffect();
      return;
    }
    const prevDeps= deps[cursor];
    const depsSame = prevDeps.every((prevDep, index)=> prevDep ===nextDeps[index])
    if(depsSame) {
      cursor +=1;
      return
    }
    deps[cursor] = nextDeps;
    cursor +=1;
    runDeferredEffect();
  }

  function resetCursor(){
    cursor = 0;
  }
  function cleanupEffects(){
    cleanups.forEach(cleanup => typeof cleanup === 'function' && cleanup());
  }
  function createContext(initialValue){
    const emitter = createEventEmitter(initialValue);
    function Provider({value,children}){

      useEffect(()=>{
        emitter.set(value);
      },[value]);

      return <>{children}</>;
    }
    return {
      Provider, emitter
    }
  }
  function useContext(context){
    const [value, setValue] = React.useState(context.emitter.get());
    React.useEffect(()=>{
      context.emitter.on(setValue);

      return () => context.emitter.off(setValue);
    },[context]);
    return value;
  }
  function useRef(initialValue){
    if(!isInitialized[cursor]) {
      memorizedStates[cursor] = {current:initialValue};
      isInitialized[cursor]=true;
    }
    const memorizedState = memorizedStates[cursor]
    cursor +=1
    return memorizedState;
  }
  function createStore(reducer, initialValue){
    // 어떻게 상태를 바꾸는지는 모르지만 상태를 바꾸는 방법을 인자로 받고 그 함수를 호출해서 진짜 상태를 바꾸는 역할을 한다.
    let currentState = initialValue;
    const listeners= [];
    const getState = () => currentState;
    const subscribe = callback => listeners.push(callback);
    const dispatch = action =>{
      let nextState = reducer(currentState, action);
      if(nextState !== currentState){
        nextState=currentState;
        listeners.forEach((listener)=>{
          listener();
        })
      }
    }
    return {
      getState, 
      subscribe,
      dispatch
    }
  }
  function useReducer(reducer, initialValue){
    const {forceUpdate} = useForceUpdate();
    if(!isInitialized[cursor]){
      memorizedStates[cursor]=createStore(reducer, initialValue);
      isInitialized[cursor]=true;
    }
    const store = memorizedStates[cursor];
    store.subscribe(forceUpdate);
    cursor +=1;
    return [store.getState(), store.dispatch]
  }
  function useMemo(nextCreate, deps){
    if(!memorizedStates[cursor]){
      let nextValue = nextCreate();
      memorizedStates[cursor] = [nextValue, deps]
      cursor+=1
      return nextValue;
    }
    const nextDeps = deps;
    const [prevValue, prevDeps] = memorizedStates[cursor]
    if(prevDeps.every((prev, index)=> prev == nextDeps[index])){
      cursor +=1;
      return prevValue;
    }
    const nextValue = nextCreate();
    memorizedStates[cursor] = [nextValue, deps];
    cursor +=1;
    return nextValue;
  }
  function useCallback(callback, deps){
    return useMemo(()=> callback, deps)
  }
  // 컴포넌트를 메모이제이션
  function memo(TargetComponent){
    return (nextProps)=>{
      if(!TargetComponent.memorizedState){
        const nextValue = React.createElement(TargetComponent, nextProps);
        TargetComponent.memorizedState = [nextValue, nextProps];
        return nextValue;
      }
      const [prevValue, prevProps] = TargetComponent.memorizedState;
      const sameProps = Object.keys(nextProps).every(key=>{
        return nextProps[key]===prevProps[key];
      })
      if(sameProps) return prevValue;
      const nextValue = React.createElement(TargetComponent, nextProps);
      TargetComponent.memorizedState = [nextValue, nextProps];
      return nextValue;
    }
  }
  return {useState, useEffect, resetCursor,cleanupEffects,createContext,useContext, useRef, createStore, useReducer,useMemo, memo, useCallback}
})();

export default MyReact;