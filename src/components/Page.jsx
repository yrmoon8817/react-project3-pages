import React from 'react';
import * as MyLayout from "../libs/MyLayout.jsx"

const Page = ({ header, children, footer }) => (
  <div className="Page">
    <header>{header}</header>
    <main>{children}</main>
    <footer>{footer}</footer>
    <MyLayout.DialogContainer />
  </div>
);

export default Page;
