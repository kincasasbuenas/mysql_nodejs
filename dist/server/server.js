"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(port) {
        this.app = express();
        this.port = port;
    }
    // Llamar siempre la misma instancia.
    static init(port) {
        return new Server(port);
    }
    //para definir un callback en lugar de hacer esto, callback:Function
    //remplazar por esto, callback: () => void
    start(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder(); // para exporner la carpeta public luedo de que ya el server esta escuchando.
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
}
exports.default = Server;
