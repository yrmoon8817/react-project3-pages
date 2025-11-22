import React, {useState, useEffect} from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import ErrorDialog from "../../components/ErrorDialog";
import PaymentButton from "./PaymentButton";
import PaymentSuccessDialog from "./PaymentSuccessDialog";
import OrderForm from "./OrderForm";
import ProductItem from "../../components/ProductItem";
import OrderApi from "/shared/api/OrderApi";
import ProductApi from "/shared/api/ProductApi";
import * as MyRouter from '../../libs/MyRouter'
import * as MyLayout from "../../libs/MyLayout";

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
