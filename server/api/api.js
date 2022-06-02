"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-06-02 12:05:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-02 12:26:39
 */
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/test", (req, res, next) => {
    return res.json({ "massage": "hello world" });
});
exports.default = router;
