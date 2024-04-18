import types from "./types.js";
import { Menu, MenuItem } from "./Menu/index.js";
import { Shape, Hub } from "./Tesselations/index.js";
import { Svg } from "./Svg/index.js";
import { Point, Segment } from "./Tesselations/index.js";
import { ControlPoint } from "./Tesselations/Point.js";

/**
 * Represents the main application class.
 */
export default class App {
    /**
     * Loads the application.
     * @returns {Promise} A promise that resolves when the application is loaded.
     */
    static load() {
        return new Promise(resolve => {
            this.addMenu();
            const svg = new Svg();
            svg.drawControls = true;
            const shape = new Shape(10, 10);
            // svg.addContent(shape);
            let point = new Point(100, 10);
            let matrix = new DOMMatrix().translate(50, 50);
            let pt2 = point.matrixTransform(matrix);
            debugger;
            let hub = new Hub(100, 0);
            shape.addHub(hub);
            let segment = hub.segments[0].grow_rel(new Point(-30, 30), new ControlPoint(-40, 0), new ControlPoint(-40, 25));
            segment = segment.grow_rel(new Point(-40, -40), new ControlPoint(-25, 0), null);
            segment = segment.grow(new Point(0, 0), null, new ControlPoint(25, 25));
            
            document.querySelector("#app").appendChild(svg.dom);
            svg._dom_content.appendChild(hub.dom);
            svg._dom_content.appendChild(segment.dom);
            svg._dom_content.setAttribute('transform', 'translate(50,50)');
            // svg._dom_controls.appendChild(segment.svg_controls());
            // svg._dom_controls.setAttribute('transform', 'translate(50,50)');
            resolve();
        });
    }

    /**
     * Adds the menu to the application.
     * @returns {App} The current instance of the App class.
     */
    static addMenu() {
        const menu = new Menu();
        let menuItem = new MenuItem("home", ["Home", "home"], "/index.html");
        menu.addItem(menuItem);
        menuItem = new MenuItem("new", ["New Project", "note_add"], new Menu(types));
        menu.addItem(menuItem);
        document.querySelector(".interface>nav").appendChild(menu.dom);
        return this;
    }
}