import ProductItem from "../../components/ProductItem";
import * as MyRouter from "../../libs/MyRouter"

const OrderableProductItem = ({ product }) => {
  const navigate = MyRouter.useNavigate();
  const handleClick = () => {
    navigate(`/cart?productId=${product.id}`);
  };
  return <ProductItem product={product} onClick={handleClick} />;
};

export default OrderableProductItem;
