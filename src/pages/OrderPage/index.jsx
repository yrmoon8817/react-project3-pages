import React, {useState, useEffect} from "react";
import OrderApi from "../../../shared/api/OrderApi.js";
import * as MyLayout from "../../libs/MyLayout.jsx";
import Page from "../../components/Page.jsx";
import Title from "../../components/Title.jsx";
import Navbar from "../../components/Navbar.jsx";
import ErrorDialog from "../../components/ErrorDialog.jsx";
import OrderDeliveryCard from "./OrderDeliveryCard.jsx";
import OrderPaymentCard from "./OrderPaymentCard.jsx";
import OrderStatusCard from "./OrderStatusCard.jsx";

const OrderPage = () => {
  const [order, setOrder] = useState();
  const {openDialog} = MyLayout.useDialog();
  const {startLoading, finishLoading} = MyLayout.useLoading();
  const fetch = async ()=>{
    startLoading("주문 정보 로딩중...");
    try {
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    }catch (e){
      openDialog(<ErrorDialog/>);
      return;
    }
    finishLoading();
  }
  useEffect(()=>{
    fetch();
  },[]);
  useEffect(()=>{
    const timer = setInterval(async()=>{
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    },5000);
    return () =>{
      clearInterval(timer);
    }
  }, [])
  return (
    <div className="OrderPage">
      <Page header={<Title>주문내역</Title>} footer={<Navbar />}>
        {order && (
          <>
            <OrderStatusCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderDeliveryCard order={order} />
          </>
        )}
      </Page>
    </div>
  )
}

export default OrderPage;
