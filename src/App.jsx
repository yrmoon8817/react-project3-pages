import React from 'react';
import * as MyForm from './libs/MyForm';
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderPage from './pages/OrderPage';
import * as MyRouter from './libs/MyRouter';
import * as MyLayout from './libs/MyLayout';
import MyReact from './libs/MyReact';
import './style.css';

const App = () => (
  <MyLayout.Layout>
    <MyRouter.Router>
      <MyRouter.Routes>
        <MyRouter.Route path="/cart" element={<CartPage />} />
        <MyRouter.Route path="/order" element={<OrderPage />} />
        <MyRouter.Route path="/" element={<ProductPage />} />
      </MyRouter.Routes>
    </MyRouter.Router>
  </MyLayout.Layout>
)
export default App;

// const Board = ({posts, tag})=>{
//   MyReact.resetCursor();
//   const [darkTheme, setDartTheme] = React.useState(false)
//   const filterPosts = () => {
//     console.log('filterPosts');
//     return posts.filter(post => (tag? post.tag===tag : true));
//   }
//   const filteredPosts = MyReact.useMemo(filterPosts,[posts, tag]);
//   const handleClick = React.useCallback((postId)=>{
//     console.log("handleClick", postId)
//   },[])
//   console.log("Board rendered");

//   return <>
//   <div>
//     <button onClick={()=>setDartTheme(!darkTheme)}>테마 변경</button>
//     <span>{darkTheme?"다크모드":"라이트모드"}</span>
//     <FilteredPosts value={filteredPosts} onClick={handleClick}/>
//   </div>  
//   </>
// }
// 인자가 같으면 항상 같은 내용을 반환함
// const FilteredPosts = MyReact.memo(({value, onClick})=>{
//   console.log('FilterPosts render')
//   return (
//     <ul>
//       {value.map(({id, content, tag})=>(
//         <li key={id} onClick={onClick}>
//           {content} <span>#{tag}</span>
//         </li>
//       ))}
//     </ul>
//   )
// })
// export default() =>{
//   const [tag, setTag] = React.useState('');
//   return (
//   <>
//   <button onClick={()=>setTag("")}>All</button>
//   <button onClick={()=>setTag("tag1")}>Tag1</button>
//   <button onClick={()=>setTag("tag2")}>Tag2</button>
//   <Board posts={[
//     {id: 'id1', content:'content1', tag:'tag1'},
//     {id: 'id2', content:'content2', tag:'tag2'},
//     {id: 'id3', content:'content3', tag:'tag3'},
//   ]} tag={tag}/></>)
// }


// function RegisterForm(){
//   const [state, setState]=React.useState({
//     value:{nickname:"", password:""},
//     error:{nickname:"", password:""},
//   });
//   const handleChange=(e)=>{
//     setState({
//       ...state,
//       value: {
//         ...state.value,
//         [e.target.name]:e.target.value
//       }
//     })
//   }
//   const handleReset=(e)=>{
//     setState({
//       value:{nickname:"", password:""},
//       error:{nickname:"", password:""},
//     })
//   }
//   const handleSubmit=(e)=>{
//     setState({
//       ...state,
//       error: {
//         nickname: /^\w+$/.test(state.value.nickname) ? '' : '영문, 숫자만 입력하세요.',
//         password: /^.{3,6}$/.test(state.value.password) ? '' : '3자이상 6자이하로 입력하세요.',
//       }
//     })
//   }

//   return(
//     <>
//       <div>
//         <label>닉네임:</label>
//         <input type="text" name="nickname" value={state.value.nickname} onChange={handleChange}/>
//         <span>{state.error.nickname}</span>
//       </div>
//       <div>
//         <label>비밀번호:</label>
//         <input type="password" name="password" value={state.value.password} onChange={handleChange}/>
//         <span>{state.error.password}</span>
//       </div>
//       <button onClick={handleReset}>초기화</button>
//       <button onClick={handleSubmit}>회원가입</button>
//     </>
//   )

// }

// export default RegisterForm;

// const LoginForm = () =>{


//   const validate = values =>{
//     const errors = {
//       email:'',
//       password:''
//     }
//     if(!values.email) {
//       errors.email = "이메일을 입력하세요."
//     }
//     if(!values.password) {
//       errors.password="비밀번호를 입력하세요."
//     }
//     return errors;
//   }
//   const handleSubmit=(values)=>{
//     console.log('Submitted', values)
//   }
//   return (
//     <MyForm.Form 
//       initialValues={{email:'', password:''}} 
//       validate={validate}
//       onSubmit={handleSubmit}
//       style={{"display":"flex","flexDirection":"column"}}
//     >
//       <MyForm.Field type="text" autoFocus placeholder="Email" name="email" />
//       <MyForm.ErrorMessage name="email"/>
//       <MyForm.Field type="password" name="password" placeholder="Password" style={{"fontSize":"14px", "margin":"10px 0 0 0"}} />
//       <MyForm.ErrorMessage name="password"/>
//       <button type="submit" style={{"marginTop":"30px"}}>Login</button>
//     </MyForm.Form>
//   )
// }
// export default LoginForm;


// import MyReact from './libs/MyReact';
// export default () =>{
//   const ref1 = MyReact.useRef(1);
//   const ref2 = MyReact.useRef();
//   const [state, setState] = React.useState(0);
//   if(state > 2) {
//     ref1.current = ref1.current +1 ;
//   }
//   return (
//   <>
//   <button onClick={()=>setState(state+1)}>state증가 (state: {state})</button>
//   <div>{ref1.current}</div>
//   <input ref={ref2}/>
//   <button onClick={()=>console.log('input value',ref2.current.value)}>ref2 조회</button>
//   </>
//   )
// }

// const countContext = MyReact.createContext({});
// const CountProvider = ({children})=>{
//   const [count, setCount] = React.useState(0);
//   const value = {count, setCount}
//   return <countContext.Provider value={value}>{children}</countContext.Provider>
// }

// const Count = () =>{
//   const {count} = MyReact.useContext(countContext);
//   return <div>{count}</div>
// }

// const PlusButton = () =>{
//   const {count, setCount} = MyReact.useContext(countContext);
//   const handleClick = () => setCount(count + 1);
//   return <button onClick={handleClick}>카운트 증가</button>;
// }
// export default () => (<CountProvider>
//   <Count/>
//   <PlusButton/>
// </CountProvider>)

// import MyReact from "./libs/MyReact";
// function NameField (){
//   const [firstname, setFirstname] = MyReact.useState("사용자1");
//   const [lastname, setLastname] = MyReact.useState("김");

//   const handleChangeFirstname = e =>{
//     setFirstname(e.target.value);
//   }
//   const handleChangeLastname = e =>{
//     setLastname(e.target.value);
//   }

//   return (<>
//     <input value={firstname} onChange={handleChangeFirstname} />
//     <input value={lastname} onChange={handleChangeLastname} />
//   </>)
  
// }

// export default () => <NameField/>;

// import MyReact from "./libs/MyReact";
// const Counter = () =>{
//   MyReact.resetCursor();
//   const [count, setCount] = React.useState(0);
//   const [name, setName] = React.useState("");
//   const handleClick=()=>setCount(count + 1);
//   const handleChangeName=(e)=>{
//     return setName(e.target.value)
//   }
//   MyReact.useEffect(()=>{
//     document.title = `count: ${count} | name: ${name}`;
//     console.log("effect1");
//     return function cleanup(){
//       document.title='';
//       console.log('effect1 cleanup')
//     }
//   }, [count, name])
//   MyReact.useEffect(()=>{
//     localStorage.setItem("name", name);
//     console.log("effect2");
//   }, [name])
//   MyReact.useEffect(()=>{
//     setName(localStorage.getItem("name")||"");
//      console.log("effect3");
//   },[])
//   console.log("Counter rendered")
//   return <>
//   <button onClick={handleClick}>더하기</button>
//   <input value={name} onChange={handleChangeName}/>
//   </>
// }
// export default ()=>{
//   const [mounted, setMounted] = React.useState(false);
//   const handleToggle = () =>{
//     const nextMounted = !mounted
//     if(!nextMounted) MyReact.cleanupEffects();
//     setMounted(nextMounted);
//   }
//   return <>
//   <button onClick={handleToggle}>컴포넌트 토글</button>
//   {mounted && <Counter/>}
//   </>;
// }