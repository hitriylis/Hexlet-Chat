import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import MessageForm from './MessageForm';
import { useFilter } from '../hooks';

const Messages = () => {
  const { t } = useTranslation();
  const filterProfanity = useFilter();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';
  const messages = useSelector((state) => state.messages)
    .messages
    .filter(({ channelId }) => channelId === currentChannelId);

  const lastRef = useRef();
  useEffect(() => {
    lastRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${filterProfanity(currentChannelName)}`}</b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: messages.length })}
          </span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
          ref={lastRef}
        >
          {messages.map(({ message, user, id }) => (
            <div className="text-break mb-2" key={id}>
              <b>{user}</b>
              {`: ${filterProfanity(message)}`}
            </div>
          ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
