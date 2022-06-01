/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-05-31 22:17:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-06-01 16:45:02
 */

import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
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
    <div
      className="flex flex-col items-center w-100 b-1 m-auto"
      onKeyUp={(event) => {
        if (event.key == 'Enter') {
          handleSendClick();
        }
      }}
    >
      <div className="b-1 w-100%">
        <span>聊天室：{room}</span>
      </div>
      <div className="h-100 b-1 w-100% overflow-y-scroll">
        {message.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item.username == username
                  ? 'flex flex-col items-end mr-3 mt-3 '
                  : 'flex flex-col items-start ml-3 mt-3'
              }
            >
              <div className="bg-sky-500 c-white text-3 p-2 max-w-80 box-border text-left b-rd-1.5">
                {item.content}
              </div>
              <div>
                <span className="text-4">{item.username}</span>
                <span className="ml-2 text-2">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-100% flex h-10">
        <input
          className="flex-1"
          type="text"
          value={sendMessage}
          onChange={(event) => setSendMessage(event.target.value)}
        />
        <button className="flex-2" onClick={handleSendClick}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
