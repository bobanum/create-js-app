import types from "./types.js";
import {Menu, MenuItem} from "./Menu.js";
import Svg from "./Svg/Svg.js";
import Shape from "./Svg/Shape.js";
import Segment from "./Svg/Segment.js";
import Point from "./Svg/Point.js";

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
            const shape = new Shape();
            svg.addContent(shape);
            let seg = new Segment(new Point(10, 10), new Point(200, 300));
            seg = new Segment(seg, new Point(400, 40), new Point(200, 100));
            seg = new Segment(seg, new Point(120, 60), new Point(160, 200));
            seg = new Segment(seg, new Point(450, 460), new Point(280, 60), new Point(450, 210));
            shape.addSegment(seg);
            document.querySelector("#app").appendChild(svg.dom);
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