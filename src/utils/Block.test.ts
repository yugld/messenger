import * as proxyquire from "proxyquire";
import { expect } from "chai";
import * as sinon from "sinon";
import type BlockType from './Block'

const eventBusMock = {
    on: sinon.stub(),
    emit: sinon.stub(),
};

const { Block: Block } = proxyquire("./Block", {
    "./EventBus": {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        },
    },
}) as { Block: typeof BlockType };

describe("Block", () => {
    beforeEach(() => {
        eventBusMock.on.reset();
        eventBusMock.emit.reset();
    });

    class ComponentMock extends Block {
    }
    // @ts-ignore
    const block = new ComponentMock();

    it("should fire init event on initialization", () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith("init"))
            .to
            .eq(true);
    });

    it("should set props correctly", () => {
        block.setProps({ name: "name" });
        // @ts-ignore
        expect(block.props)
            .to
            .have
            .property("name");
    });

    it("should return HTMLElement", () => {
        expect(block.getContent())
            .to
            .eq(block.element);
    });

});
