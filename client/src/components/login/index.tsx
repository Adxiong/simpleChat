/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-31 22:14:51
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-01 00:12:07
 */
import { BaseSyntheticEvent, useState } from 'react';
import { Socket } from 'socket.io-client';

interface LoginProps {
  socket: Socket;
  onChange: (data: any) => void;
}

const Login = (props: LoginProps) => {
  const { socket } = props;
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const handleLoginClick = () => {
    if (!useState || !room) {
      alert('Please enter a username and room');
      return;
    }
    socket.emit('join_room', JSON.stringify({ username, room }));
    props.onChange({ username, room });
  };

  return (
    <div className="login flex flex-col items-center">
      <label>
        <span>用户名</span>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        <span>房间号</span>
        <input type="text" onChange={(event) => setRoom(event.target.value)} />
      </label>
      <button className="w-100" onClick={handleLoginClick}>
        登录
      </button>
    </div>
  );
};

export default Login;
