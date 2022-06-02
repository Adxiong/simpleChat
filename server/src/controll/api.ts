/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-02 12:05:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-02 14:34:30
 */
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
   res.json({"massage": "hello world"});
} )

module.exports=  router