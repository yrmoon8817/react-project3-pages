import React from "react"
import Card from "../../components/Card";
import Button from "../../components/Button";
import * as MyLayout from "../../libs/MyLayout"
import Dialog from "../../components/Dialog";

const OrderStatusCard = ({ order }) => {
  console.log("OrderStatusCard rendered")
  const { status, name, orderDate, id, position } = order;
  const {openDialog, closeDialog} = MyLayout.useDialog();

  const calculateDeliveryMinute=()=>{
    console.log("calculateDeliveryMinute");
    const 오랜시간 = 9999;
    for(let i = 0; i<오랜시간; i++){
      
    }
    if(!position[0]) return '-';
    return `${position[0]}분`;

  }
  const expectedDeliveryMinutes = React.useMemo(calculateDeliveryMinute, [position[0]]);
  const handleClick = React.useCallback(() =>{
    openDialog(
      <Dialog footer={<Button onClick={closeDialog}>확인</Button>}>
        <ul>
          <li>위도: {position[0]}</li>
          <li>경도: {position[1]}</li>
        </ul>
      </Dialog>
    )
  },[position[0], position[1]])
  return (
    <Card
      header={
        <div className="state_box">
          <span className="state_menu">{name}</span><strong className="state_title">{status}</strong>
        </div>
      }
      data={[
        { term: "주문일시", description: orderDate },
        { term: "주문번호", description: id },
        { term: "도착예상시간",description:<ExpectedDeliveryMinutes value={expectedDeliveryMinutes} onClick={handleClick}/>},
      ]}
      footer={
        <>
          <Button>전화</Button>
          <Button>가게보기</Button>
        </>
      }
    />
  );
};

export default OrderStatusCard;

const ExpectedDeliveryMinutes = React.memo(({value,onClick})=>{
  console.log("ExpectedDeliveryMinutes Rendered");
  return (
    <>
      {value}
      <Button onClick={onClick} className="btn_location">위치보기</Button>
    </>
  )
})
