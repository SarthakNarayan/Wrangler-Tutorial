export const KV = LINKS; // name of the KV

export const getListOfKeys = async (KV) => {
  // return existing keys as an array
  const allKeys = await KV.list();
  const arrayAllKeys = allKeys.keys;
  const existingKeys = arrayAllKeys.map((key) => key.name);
  return existingKeys;
};

export const getKeyValueJSON = async (KV) => {
  const keys = await getListOfKeys(KV);
  const values = await Promise.all(keys.map(async (key) => KV.get(key)));
  let keyValues = {};
  for (let index in values) {
    keyValues[keys[index]] = values[index];
  }
  return keyValues;
};

// checks if the key exists in KV. If not then it is added to KV.
export const addKeyToKV = async (linksArray, KV) => {
  const existingKeys = await getListOfKeys(KV);
  const linksToAdd = linksArray.filter(
    (value) => !existingKeys.includes(value)
  );
  linksToAdd.map(async (link) => {
    await KV.put(link, "0");
  });
};

export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};
