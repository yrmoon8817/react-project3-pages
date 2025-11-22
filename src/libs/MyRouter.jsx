import React, {useState, useEffect, useContext} from 'react';
const routerContext = React.createContext({

});
routerContext.displayName = 'RouterContext';


export const Router = ({children}) =>{
  const [path, setPath] = useState(window.location.pathname);

  const changePath = (path)  =>{
    setPath(path);
    window.history.pushState({path}, "", path);
  }
  const handlePopstate = (event) =>{
    const nextPath = event.state && event.state.path;
    if(!nextPath) return;
    setPath(nextPath);
  }
  useEffect(()=>{
    window.addEventListener('popstate',handlePopstate);
    window.history.replaceState({path}, "");

    return ()=>{window.removeEventListener("popstate", handlePopstate)}
  },[path]);
  const contextValue = {
    path,
    changePath
  }

  return (
    <routerContext.Provider value={contextValue} >
      {children}
    </routerContext.Provider>

  )
}
export const Routes = ({children}) =>{
  const {path} = useContext(routerContext);
  let selectedRoute = null;
  React.Children.forEach(children, (child)=>{
    // 리액트 엘리먼트인지 검사한다.
    if(!React.isValidElement(child)) return;

    // 프레그먼트인지 검사한다.
    if(child.type === React.Fragment) return;

    // Route 컴포넌트인지 검사한다. 덕 타이핑
    if(!child.props.path || !child.props.element) return;

    // Route에 등록된 컴포넌트가 요청한 경로에 해당하는지 검사한다.
    // 요청 경로에서 쿼리 문자열을 제거하고 비교한다.
    if(child.props.path !== path.replace(/\?.*$/, "")) return;
    // 엘리먼트를 찾음
    selectedRoute = child.props.element;
  });
  return selectedRoute;
}
export const Route = () =>null;

export const Link = ({to, ...rest}) =>{
  const {path, changePath} = useContext(routerContext);
  const handleClick = (e) => {
    e.preventDefault();
    if(to !== path) changePath(to);
  };
  return <a {...rest} href={to} onClick={handleClick} />;
};

// 커스텀 훅의 조건 React의 혹을 사용해야한다.
export const useNavigate = () =>{
  const {path, changePath} = useContext(routerContext);
  const navigate = (nextPath) =>{
    if(path !== nextPath) changePath(nextPath);
  }
  // navigate 함수를 반환하는 역할의 함수
  return navigate;
}

export const useMatch =()=>{
  const {path} = useContext(routerContext);
  const match = (comparedPath) => path === comparedPath;
  return match;
} 

// 아직은 커스텀 훅이 아님
export const useParams = () =>{
  // useMemo 사용해야함
  return React.useMemo(()=>{
    const params = new URLSearchParams(window.location.search);
    const paramObject = {};
    for(const [key, value] of params) {
      paramObject[key] = value;
    }
    return paramObject;
  }, []);
};