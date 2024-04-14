import { Svg } from "./Svg.js";
import { SvgElement } from "./Element.js";
import Pattern from "./Pattern.js";

describe("Svg", () => {
  let svg;

  beforeEach(() => {
    svg = new Svg("500px", "500px");
  });

  test("creates a new Svg instance with default values", () => {
    expect(svg.width).toBe("500px");
    expect(svg.height).toBe("500px");
    expect(svg.content).toEqual([]);
    expect(svg.drawControls).toBe(false);
  });

  test("creates the DOM structure for the Svg component", () => {
    const dom = svg.createDom();

    expect(dom.tagName).toBe("svg");
    expect(dom.getAttribute("width")).toBe("500px");
    expect(dom.getAttribute("height")).toBe("500px");
    expect(dom.getAttribute("viewBox")).toBe("0 0 500 500");

    const defs = dom.querySelector("defs");
    expect(defs).toBeTruthy();

    const background = dom.querySelector("rect");
    expect(background).toBeTruthy();
    expect(background.getAttribute("fill")).toContain("url(#");

    const content = dom.querySelector(".content");
    expect(content).toBeTruthy();

    const controls = dom.querySelector(".controls");
    expect(controls).toBeTruthy();
  });

  test("adds content to the Svg component", () => {
    const child1 = new SvgElement("circle");
    const child2 = new SvgElement("rect");

    svg.addContent(child1, child2);

    expect(svg.content).toEqual([child1, child2]);
  });
});