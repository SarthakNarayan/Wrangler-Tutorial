import {
  getListOfKeys,
  addKeyToKV,
  isValidUrl,
  getKeyValueJSON,
} from "./helper";

export default class Handlers {
  static index = async (request, KV) => {
    const keyValue = await getKeyValueJSON(KV);
    if (keyValue && Object.keys(keyValue).length === 0) {
      return new Response(
        "No links found in the key value store. Add links to using /links method"
      );
    }
    let key = Object.keys(keyValue).reduce((key, v) =>
      keyValue[v] < keyValue[key] ? v : key
    );
    const count = parseInt(keyValue[key]);
    await KV.put(key, (count + 1).toString());
    return Response.redirect(key);
  };

  static getAllKeys = async (request, KV) => {
    const keys = await getListOfKeys(KV);
    return new Response(JSON.stringify({ keys }));
  };

  static getKeyValues = async (request, KV) => {
    const keyValues = await getKeyValueJSON(KV);
    return new Response(JSON.stringify(keyValues));
  };

  static addKeys = async (request, KV) => {
    const arrayOfLinks = await request.json();
    if (!Array.isArray(arrayOfLinks)) {
      return new Response(
        "Incorrect links format in body. Array of links expected",
        { status: 400 }
      );
    }

    for (link of arrayOfLinks) {
      if (!isValidUrl(link)) {
        return new Response(`This link (${link}) is invalid`, { status: 400 });
      }
    }

    await addKeyToKV(arrayOfLinks, KV);
    return new Response("Successfully added links to KV");
  };

  static notFound = () => {
    return new Response("Not Found.", { status: 404 });
  };

  static deleteKey = async (request, KV) => {
    const { params, query } = request;
    await KV.delete(params.key);
    return new Response(`Deleted key ${params.key}`);
  };

  static deleteAll = async (request, KV) => {
    const keys = await getListOfKeys(KV);
    await Promise.all(keys.map((key) => KV.delete(key)));
    return new Response("Successfully deleted all keys");
  };
}
