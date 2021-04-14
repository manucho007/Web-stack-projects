import { StrengthPipe } from "./strength.pipe";

describe("Strength Pipe", () => {
  it("Should display weak if the strength is 5", () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual("5 (weak)");
  });
  it("Should display strong if the strength is 10", () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(10)).toEqual("10 (strong)");
  });
});
