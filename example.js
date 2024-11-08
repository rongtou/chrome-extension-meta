import { parseBatchExecuteResponse, preparedBatchExecute } from "./mod.js";
import { HttpsProxyAgent } from 'https-proxy-agent';
const proxyUrl = 'http://127.0.0.1:1087';
const proxyAgent = new HttpsProxyAgent(proxyUrl);
const encoded = preparedBatchExecute({

  host: "chromewebstore.google.com",
  app: "ChromeWebStoreConsumerFeUi",
  rpcs: [{ id: "xY2Ddd", args: ["jjplpolfahlhoodebebfjdbpcbopcmlk"] }],
});

console.log(encoded);

const response = await fetch(encoded.url, {
  method: "POST",
  headers: encoded.headers,
  body: encoded.body,
  agent: proxyAgent,
});

const raw = await response.text();

const results = parseBatchExecuteResponse(raw);
console.log(results);