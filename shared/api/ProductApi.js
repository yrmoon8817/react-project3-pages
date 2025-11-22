const fetchProductList = async() => {
  return await fetch("/api/product/list").then((res) => res.json());
};

const fetchProduct = async (id) => {
  return await fetch(`/api/product/${id}`).then((res) => res.json());
};


const ProductApi = {
  fetchProductList,
  fetchProduct,
};

export default ProductApi;
