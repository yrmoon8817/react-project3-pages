import Card from "../../components/Card";

const OrderPaymentCard = ({ order }) => {
  const {
    totalPrice,
    paymentMethod,
    productPrice,
    deliveryPrice,
    discountPrice,
  } = order;

  return (
    <Card
      header={
        <dl className="pay_box">
          <div className="info_group">
            <dt className="type">총 결제금액:</dt>
            <dd className="value" >{totalPrice.toLocaleString()}원</dd>
          </div>        
          <div className="info_group">
            <dt className="type">결제 방법:</dt>
            <dd className="value" >{paymentMethod}</dd>
          </div>        
        </dl>
      }
      data={[
        {
          term: "메뉴가격",
          description: <>{productPrice.toLocaleString()}원</>,
        },
        {
          term: "배달료",
          description: <>{deliveryPrice.toLocaleString()}원</>,
        },
        {
          term: "할인금액",
          description: <>{discountPrice.toLocaleString()}원</>,
        },
      ]}
    />
  );
};

export default OrderPaymentCard;
