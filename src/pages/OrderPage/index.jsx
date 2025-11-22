import React, {useState, useEffect} from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import ErrorDialog from "../../components/ErrorDialog";
import OrderDeliveryCard from "./OrderDeliveryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderStatusCard from "./OrderStatusCard";
import OrderApi from "../../../shared/api/OrderApi";
import * as MyLayout from "../../libs/MyLayout";

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
