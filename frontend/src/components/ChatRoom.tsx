import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (msg: string) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Chat Room</h1>
      <div className="border border-gray-300 rounded p-4 h-80 overflow-y-scroll">
        {messages.map((msg, index) => <div key={index} className="mb-2">{msg}</div>)}
      </div>
      <div className='flex flex-row justify-center align-center mt-2'>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button onClick={sendMessage} className="w-505 p-2 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
