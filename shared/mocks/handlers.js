import { http, HttpResponse } from "msw";
import { database } from "./data.js";

const RESPONSE_DELAY_MS = 1000;
const BASE = process.env.NODE_ENV === "production"
  ? "/react-project3-pages"
  : "";
export const handlers = [
  // product
  http.get(`${BASE}/api/product/list`, () => {
    return HttpResponse.json(database.findProducts(), { delay: RESPONSE_DELAY_MS });
  }),

  http.get(`${BASE}/api/product/:id`, ({ params }) => {
    const product = database.findProducts(params.id);
    return HttpResponse.json(product, { delay: RESPONSE_DELAY_MS });
  }),

  // order (유사하게 나머지 핸들러 수정)
  http.get(`${BASE}/api/order/list`, () => {
    return HttpResponse.json(database.findOrder(), { delay: RESPONSE_DELAY_MS });
  }),

  http.get(`${BASE}/api/order/my`, () => {
    const order = database.findOrder();
    const index = Date.now() % 2;
    order.status = ["음식 준비중", "배달중"][index];
    order.position = [[30, 30], [60, 60]][index];
    return HttpResponse.json(order, { delay: RESPONSE_DELAY_MS });
  }),

  http.post(`${BASE}/api/order`, async ({ request }) => {
    const body = await request.json();
    const order = database.createOrder(body);
    return HttpResponse.json({ ...order }, { delay: RESPONSE_DELAY_MS });
  }),
];