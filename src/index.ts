import { WS } from "./ws";

export default WS.RelayerWS;
module.exports = WS.RelayerWS;
Object.assign(module.exports, WS.RelayerWS);

// const ws = new WS.RelayerWS(["SPOT:BTC_USDT"]);
// ws.addListener("data", (e) => {
//     console.log(e);
// });

// ws.addListener("info", (e) => {
//     console.info(e);
// });

// setTimeout(() => {
//     ws.close();
// }, 10000);

// ws.connect();
