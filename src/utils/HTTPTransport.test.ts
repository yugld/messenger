import * as sinon from "sinon";
import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon";
import HTTPTransport from "./HTTPTransport";
import { expect } from "chai";
import { afterEach } from "mocha";

describe("HTTPTransport class", () => {
    let requests: SinonFakeXMLHttpRequest[] = [];
    let XHR: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const originalXHR = global.XMLHttpRequest;

    beforeEach(() => {
        XHR = sinon.useFakeXMLHttpRequest();
        // @ts-ignore
        global.XMLHttpRequest = XHR;

        XHR.onCreate = (xhr) => {
            requests.push(xhr);
        };
        instance = new HTTPTransport("/auth");
    });

    afterEach(() => {
        requests = [];
    });

    after(() => {
        global.XMLHttpRequest = originalXHR;
    });

    it("should make GET request", () => {
        instance.get("user");
        const [request] = requests;

        expect(request.method)
            .to
            .eq("Get");
    });

    it("should make POST request", () => {
        instance.post("user");
        const [request] = requests;

        expect(request.method)
            .to
            .eq("Post");
    });

    it("should make DELETE request", () => {
        instance.delete("/chat");
        const [request] = requests;

        expect(request.method)
            .to
            .eq("Delete");
    });

    it("should make PUT request", () => {
        instance.put("/user", {});
        const [request] = requests;

        expect(request.method)
            .to
            .eq("Put");
    });

    it("should make PATCH request", () => {
        instance.patch("/user", {});
        const [request] = requests;

        expect(request.method)
            .to
            .eq("Patch");
    });
});
