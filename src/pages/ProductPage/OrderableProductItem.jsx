import React from 'react';
import * as MyRouter from "../../libs/MyRouter.jsx"
import ProductItem from "../../components/ProductItem.jsx";

const OrderableProductItem = ({ product }) => {
  const navigate = MyRouter.useNavigate();
  const handleClick = () => {
    navigate(`/cart?productId=${product.id}`);
  };
  return <ProductItem product={product} onClick={handleClick} />;
};

export default OrderableProductItem;
