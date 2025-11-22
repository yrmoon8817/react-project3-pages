import React from 'react';
import * as MyRouter from "../libs/MyRouter.jsx"

const Navbar = () => {
  const match = MyRouter.useMatch();

 return ( 
  <nav className="Navbar">
    <MyRouter.Link className={match("/")? "active":""} to="/">
      메뉴목록
    </MyRouter.Link>
    <MyRouter.Link className={match("/order")? "active":""} to="/order">주문내역</MyRouter.Link>
  </nav>
 )
}

export default Navbar;
