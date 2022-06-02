/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-06-02 12:05:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-02 12:07:14
 */
import { NextFunction, Router, Request, Response } from "express";

const router = Router();


router.get("/test", (req: Request, res: Response, next: NextFunction) => {
  return res.json({"massage": "hello world"});
} )

export default router