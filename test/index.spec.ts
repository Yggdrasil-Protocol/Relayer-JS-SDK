import RelayerWS from "../src/index";

describe("RelayerWS", () => {
    let relayerWS: RelayerWS;

    beforeEach(() => {
        relayerWS = new RelayerWS(["SPOT:BTC_USDT", "SPOT:ETH_USDT"]);
    });

    afterEach(() => {
        relayerWS.close();
    });

    it("should establish a connection", async () => {
        const mockConnect = jest.spyOn(relayerWS, "connect");
        const mockConsoleLog = jest.spyOn(console, "log");

        relayerWS.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockConnect).toHaveBeenCalled();
        expect(mockConsoleLog).toHaveBeenCalledWith("Connection established");
    });

    it("should send a PING message", async () => {
        const mockConsoleLog = jest.spyOn(console, "log");

        relayerWS.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockConsoleLog).toHaveBeenCalledWith("Sent PING");
    });

    it("should receive a PONG message", async () => {
        const mockConsoleLog = jest.spyOn(console, "log");

        relayerWS.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockConsoleLog).toHaveBeenCalledWith("Received PONG");
    });

    it("should receive a message", async () => {
        const mockSendEvent = jest.spyOn(relayerWS, "emit");

        relayerWS.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockSendEvent).toHaveBeenCalled();
    });

    it("should receive info event", async () => {
        const mockConsoleInfo = jest.spyOn(console, "info");

        relayerWS.addListener("info", (e) => {
            console.info(e);
        });

        relayerWS.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockConsoleInfo).toHaveBeenCalled();
    });

    it("should receive data events", async () => {
        const mockConsoleLog = jest.spyOn(console, "log");

        relayerWS.addListener("data", (e) => {
            console.log(e);
        });

        relayerWS.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockConsoleLog).toHaveBeenCalled();
    });
});
