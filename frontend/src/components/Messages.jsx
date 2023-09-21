import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <div className="col p-0 h-100">
      <pre>
        {JSON.stringify(messages)}
      </pre>
    </div>
  );
};

export default Messages;
