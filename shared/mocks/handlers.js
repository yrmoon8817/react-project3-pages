import { http, HttpResponse } from "msw";
import { database } from "data";

const RESPONSE_DELAY_MS = 1000;

export const handlers = [
  // product
  http.get("/api/product/list", () => {
    return HttpResponse.json(database.findProducts(), { delay: RESPONSE_DELAY_MS });
  }),

  http.get("/api/product/:id", ({ params }) => {
    const product = database.findProducts(params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404, delay: RESPONSE_DELAY_MS });
    }
    return HttpResponse.json(product, { delay: RESPONSE_DELAY_MS });
  }),

  // order (유사하게 나머지 핸들러 수정)
  http.get("/api/order/list", () => {
    return HttpResponse.json(database.findOrder(), { delay: RESPONSE_DELAY_MS });
  }),

  http.get("/api/order/my", () => {
    const order = database.findOrder();
    const index = Date.now() % 2;
    order.status = ["음식 준비중", "배달중"][index];
    order.position = [[30, 30], [60, 60]][index];
    return HttpResponse.json(order, { delay: RESPONSE_DELAY_MS });
  }),

  http.post("/api/order", async ({ request }) => {
    const body = await request.json();
    const order = database.createOrder(body);
    return HttpResponse.json({ ...order }, { delay: RESPONSE_DELAY_MS });
  }),
];