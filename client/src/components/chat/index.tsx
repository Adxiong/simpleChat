/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-31 22:17:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-01 00:14:02
 */

import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatProps {
  socket: Socket;
  username: string;
  room: string;
}
const Chat = (props: ChatProps) => {
  const { socket, username, room } = props;
  const [message, setMessage] = useState<any[]>([]);
  const [sendMessage, setSendMessage] = useState('');
  const handleSendClick = () => {
    if (!sendMessage) {
      alert('Please enter a message');
      return;
    }
    const data = JSON.stringify({
      content: sendMessage,
      username,
      room,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    });
    socket.emit('send_message', data);
    setSendMessage('');
    setMessage((list) => [...list, JSON.parse(data)]);
  };
  useEffect(() => {
    socket.on('receive_message', (data: string) => {
      setMessage((list) => {
        return [...list, JSON.parse(data)];
      });
    });
  }, []);

  return (
    <div>
      <div>
        <span>online</span>
      </div>
      <div>
        {message.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.content}</div>
              <div>
                <span>{item.username}</span>
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          value={sendMessage}
          onChange={(event) => setSendMessage(event.target.value)}
        />
        <button onClick={handleSendClick}>send</button>
      </div>
    </div>
  );
};

export default Chat;
