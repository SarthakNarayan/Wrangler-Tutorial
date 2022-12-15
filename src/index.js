import { router } from "./routes";

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
