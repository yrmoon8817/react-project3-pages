const fetchProductList = async () => {
  return fetch("/api/product/list").then((res) => res.json());
};

const fetchProduct = async (id) => {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
};

const ProductApi = {
  fetchProductList,
  fetchProduct,
};

export default ProductApi;
