const RelayerWS = require("./dist").default;

const ws = new RelayerWS(["SPOT:BTC_USDT"]);
ws.addListener("data", (e) => {
    console.log(e);
});

ws.addListener("info", (e) => {
    console.info(e);
});

setTimeout(() => {
    ws.close();
}, 1000);

ws.connect();
