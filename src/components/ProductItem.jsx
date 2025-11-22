import Button from "./Button";

const ProductItem = ({ product, onClick }) => {
  const { name, price, thumbnail } = product;

  return (
    <div className="ProductItem">
      <div className="description">
        <strong className="food_name">{name}</strong>
        <span className="price">{price.toLocaleString()}원</span>
        {onClick && (
          <Button styleType="brand" onClick={onClick}>
            주문하기
          </Button>
        )}
      </div>
      <div className="thumbnail">
        <img src={thumbnail} alt={`${name} ${price.toLocaleString()}원`} />
      </div>
    </div>
  );
};

export default ProductItem;
