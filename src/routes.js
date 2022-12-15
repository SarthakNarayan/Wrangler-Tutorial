import { Router } from "itty-router";
import Handlers from "./handlers";
import { KV } from "./helper";

export const router = Router();

router.get("/", async (request) => Handlers.index(request, KV));
router.get("/keys", async (request) => Handlers.getAllKeys(request, KV));
router.get("/values", async (request) => Handlers.getKeyValues(request, KV));

router.post("/keys", async (request) => Handlers.addKeys(request, KV));
router.post("/deletekey/:key", async (request) =>
  Handlers.deleteKey(request, KV)
);
router.post("/deleteall", async (request) => Handlers.deleteAll(request, KV));
router.all("*", () => Handlers.notFound()); // 404 for everything else
