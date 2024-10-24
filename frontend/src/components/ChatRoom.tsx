import { useEffect, useState } from 'react';
import io, {Socket} from 'socket.io-client';

const socket:Socket = io('https://chatroom-backend-weld.vercel.app',{
  transports: ['websocket'],
});


interface Message {
  msg: string;
  sender: string;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [socketId, setSocketId] = useState<string | null>(null);

  let length_of_string = messages.length;
  document.title = `msg(${length_of_string})`;

  useEffect(() => {
    // Store the client's socket ID
    
    socket.on('connect', () => {
      if(socket.id){
        setSocketId(socket.id);
        console.log(socket.id)
      }
    });
    

    socket.on('message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
      socket.off('connect');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
    // socket.emit('socketId', socket.id)
    // console.log(socket.id)
    // setSocketId('')
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Chat Room</h1>
      <div className="border border-gray-300 rounded p-4 h-80 overflow-y-scroll">
        {messages.map((data, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              data.sender === socketId
                ? 'bg-blue-100 text-right'   // Message sent by you
                : 'bg-gray-100 text-left'    // Message from others
            }`}
          >
            {data.msg}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center align-center mt-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button onClick={sendMessage} className="w-505 p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;




// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('https://chatroom-backend-weld.vercel.app');

// const ChatRoom: React.FC = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState('');

//   let length_of_string = messages.length
//   document.title = `msg(${length_of_string})`

//   useEffect(() => {
//     socket.on('message', (msg: string) => {
//       setMessages(prevMessages => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit('message', message);
    
//     setMessage('');
//   };


//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-xl font-bold mb-4">Chat Room</h1>
//       <div className="border border-gray-300 rounded p-4 h-80 overflow-y-scroll">
//         {messages.map((msg, index) => <div key={index} className="mb-2">{msg}</div>)}
//       </div>
//       <div className='flex flex-row justify-center align-center mt-2'>
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         type="text"
//         className="w-full p-2 border border-gray-300 rounded"
//       />
//       <button onClick={sendMessage} className="w-505 p-2 bg-blue-500 text-white rounded">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
