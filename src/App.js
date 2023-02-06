export default class App {
    static load() {
        return new Promise(resolve => {
            resolve();
        });
    }
    static init() {
        console.log("Loaded");
    }
}
App.init();