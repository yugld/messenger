import { Link } from "./link";
import { expect } from "chai";
import Router from "../../utils/Router";
import * as sinon from "sinon";

describe("Link", () => {
    it("should render", () => {
        new Link({ to: "/" });
    });

    it("element should return acnhor tag", () => {
        const link = new Link({ to: "/" });
        const element = link.element;
        expect(element).to.be.instanceof(window.HTMLAnchorElement);
    });

    it("should go to passed route on click", () => {
        const link = new Link({ to: "/" });
        const spy = sinon.spy(Router, "go");
        const element = link.element as HTMLSpanElement;

        element.click();

        expect(spy.calledOnce).to.eq(true);
    });
});
