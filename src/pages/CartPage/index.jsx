import React, {useState, useEffect} from "react";
import ProductApi from "../../../shared/api/ProductApi.js";
import OrderApi from "../../../shared/api/OrderApi.js";
import * as MyRouter from '../../libs/MyRouter.jsx'
import * as MyLayout from "../../libs/MyLayout.jsx";
import Page from "../../components/Page.jsx";
import Title from "../../components/Title.jsx";
import Navbar from "../../components/Navbar.jsx";
import ErrorDialog from "../../components/ErrorDialog.jsx";
import PaymentButton from "./PaymentButton.jsx";
import PaymentSuccessDialog from "./PaymentSuccessDialog.jsx";
import OrderForm from "./OrderForm.jsx";
import ProductItem from "../../components/ProductItem.jsx";

const CartPage = () => {
  const [product, setProduct] =  useState();
  const {productId} = MyRouter.useParams();
  const {startLoading, finishLoading} =  MyLayout.useLoading();
  const {openDialog} =  MyLayout.useDialog();
  
  const handleSubmit = async(values) => {
    startLoading("결제중...");
    try {
      await OrderApi.createOrder(values);
    }catch (e) {
      finishLoading();
      openDialog(<ErrorDialog/>);
      return;
    }
    finishLoading();
    openDialog(<PaymentSuccessDialog/>);
  };
  const fetch = async(productId) =>{
    startLoading("장바구니에 담는중...")
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    }catch (e) {
      openDialog(<ErrorDialog/>);
      return;
    }
    finishLoading();
  }
  useEffect(()=>{
    if(productId) fetch(productId);
    
  },[productId]);
  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && <ProductItem product={product} />}
        <OrderForm onSubmit={handleSubmit} />
      </Page>
    </div>
    );
}

export default CartPage;
