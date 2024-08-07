const RelayerWS = require("./dist");

const ws = new RelayerWS(["SPOT:BTC_USDT"]);
ws.addListener("data", (e) => {
    console.log(e);
});

ws.addListener("info", (e) => {
    console.info(e);
});

setTimeout(() => {
    ws.close();
}, 2000);

ws.connect();
