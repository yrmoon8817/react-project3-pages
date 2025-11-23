const BASE = process.env.NODE_ENV === "production"
  ? "/react-project3-pages"
  : "";

const fetchMyOrder = async () => {
  return fetch(`${BASE}/api/order/my`).then((res) => res.json());
};

const createOrder = async (order) => {
  return fetch(`${BASE}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ★ JSON 보낼 때 일반적으로 필요
    },
    body: JSON.stringify(order),
  }).then((res) => res.json());
};

const OrderApi = {
  fetchMyOrder,
  createOrder,
};

export default OrderApi;
