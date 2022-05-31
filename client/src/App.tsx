/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-31 21:28:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-01 00:13:41
 */
import { useEffect, useState } from 'react';
import './App.css';

import { io } from 'socket.io-client';
import Login from './components/login';
import Chat from './components/chat';

const socket = io('http://localhost:3001');

function App() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    room: '',
  });

  const handleLoginChange = (data: { username: string; room: string }) => {
    setUserInfo(() => data);
  };

  return (
    <div className="App">
      {!userInfo.username && (
        <Login socket={socket} onChange={handleLoginChange}></Login>
      )}
      {userInfo.username && (
        <Chat
          socket={socket}
          room={userInfo.room}
          username={userInfo.username}
        ></Chat>
      )}
    </div>
  );
}

export default App;
