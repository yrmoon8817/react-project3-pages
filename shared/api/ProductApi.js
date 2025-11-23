const BASE = process.env.NODE_ENV === "production"
  ? "/react-project3-pages"
  : "";
const fetchProductList = () => fetch(`${BASE}/api/product/list`).then(res => res.json());
const fetchProduct = (id) => fetch(`${BASE}/api/product/${id}`).then(res => res.json());
const ProductApi = {
  fetchProductList,
  fetchProduct,
};

export default ProductApi;
