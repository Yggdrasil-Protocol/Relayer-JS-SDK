const RelayerWS = require("./dist");

const ws = new RelayerWS(["SPOT:BTC_USDT"]);

ws.addListener("open", () => {
    console.log("opened");
});

ws.addListener("close", () => {
    console.log("closed");
});

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
