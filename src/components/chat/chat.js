import React from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import ChatHeader from './chatHeader';
import Message from './message';
import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';
import './chat.css';
import db from '../../firebase';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('channels').doc(channelId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput('');
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message timestamp={message.timestamp} message={message.message} user={message.user} />
        ))}
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message $TestChannel`}
            disabled={!channelId}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
}

export default Chat;
