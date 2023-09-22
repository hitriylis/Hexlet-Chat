import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';

const Messages = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const currentChannelName = channels.length > 0
    ? channels.find(({ id }) => id === currentChannelId).name
    : '';
  const messages = useSelector((state) => state.messages)
    .messages
    .filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map(({ message, user, id }) => (
            <div className="text-break mb-2" key={id}>
              <b>{user}</b>
              {`: ${message}`}
            </div>
          ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
