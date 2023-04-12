import { BaseLink as Link } from "./link";
import { expect } from "chai";
import Router from "../../utils/Router";
import * as sinon from "sinon";

describe("Link", () => {

    const label = 'home';
    const callback = sinon.stub();
    const to = '/';

    beforeEach(() => {
        callback.reset();
    });

    it("should render", () => {
        new Link({ to: "/", label: 'label', router: {} as typeof Router });
    });

    it("should call Router.go with passed route on click", () => {
        //@ts-ignore
        const link = new Link({ to, label, router: { go: callback } as typeof Router });

        link.element?.click();
        
        expect(callback.calledWith(to)).to.eq(true);

    });
});
