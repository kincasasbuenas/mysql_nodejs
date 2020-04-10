"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
//Patron singleton
class MySQL {
    constructor() {
        this.status = false; //indicar estado de conexion.
        this.conection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'qpalwosk10',
            database: 'node_db',
            port: 3306
        });
        this.conectarDB();
    }
    static get instace() {
        return this._instace || (this._instace = new this());
    }
    conectarDB() {
        this.conection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.status = true;
            console.log('Conexion a database is success!!!');
        });
    }
    static ejecutarQuery(query, callback) {
        this.instace.conection.query(query, (error, result, fields) => {
            if (error) {
                console.log('Error en la query');
                console.log(error);
                return callback(error, result, fields);
            }
            if (result.length === 0) {
                callback('El registro solicitado no existe', result, fields);
            }
            else {
                callback(error, result, fields);
            }
        });
    }
}
exports.default = MySQL;
