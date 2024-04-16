import types from "./types.js";
import { Menu, MenuItem } from "./Menu.js";
import Shape from "./Shape.js";
import Hub from "./Hub.js";
import { Svg, Point, Segment } from "./Svg/index.js";

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
            let hub = new Hub(10, 10);
            shape.addHub(hub);
            let segment = hub.segments[0].grow(new Point(200, 300), new Point(100, 10), new Point(200, 600));
            segment = segment.grow(new Point(400, 40),null, new Point(200, 100));
            segment = segment.grow(new Point(0, 0));
            console.log(segment.length, segment.toString(1));
            // let seg = new Hub(new Point(10, 10), new Point(200, 300));
            // seg = new Hub(seg, new Point(400, 40), new Point(200, 100));
            // seg = new Hub(seg, new Point(120, 60), new Point(160, 200));
            // seg = new Hub(seg, new Point(450, 460), new Point(280, 60), new Point(450, 210));
            // path.addSegment(seg);
            document.querySelector("#app").appendChild(svg.dom);
            svg.dom.appendChild(segment.dom);
            svg.dom.appendChild(segment.svg_controls());
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