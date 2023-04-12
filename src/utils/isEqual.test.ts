import { expect } from "chai";
import { isEqual } from "./isEqual";

describe("functon isEqual", () => {
  const obj1 = { a: 5 };
  it("должен вернуть true - обекты равны", () => {
    const obj2 = { a: 1 };
    const result = isEqual(obj1, obj2);
    expect(result).to.be.true;
  });

  it("должен вернуть false - обекты не равны", () => {
    const obj2 = {a: 9, c: 6,};
    const result = isEqual(obj1, obj2);
    expect(result).to.be.false;
  });
});
