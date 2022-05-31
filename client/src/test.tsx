/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-31 23:51:47
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-31 23:52:17
 */
import { useEffect } from 'react';

const Test = () => {
  useEffect(() => {
    console.log(111);
  }, []);
  return <div>Test</div>;
};
export default Test;
