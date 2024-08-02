// import { WS } from "./ws";

export function hello(name: string): string {
    return `Hello ${name}`;
}

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
