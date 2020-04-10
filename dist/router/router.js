"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, resp) => {
    const query = "SELECT * FROM heroes";
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            resp.status(400).json({
                ok: false,
                err: err
            });
        }
        else {
            resp.status(200).json({
                ok: true,
                heroes
            });
        }
    });
    /*resp.json({
      ok:true,
      message:'Get Heroes'
    });*/
});
router.get('/heroes/:id', (req, resp) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instace.conection.escape(id);
    const query = `SELECT * FROM heroes WHERE id=${escapeId}`;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            resp.status(400).json({
                ok: false,
                err: err
            });
        }
        else {
            resp.status(200).json({
                ok: true,
                heroes
            });
        }
    });
});
exports.default = router;
