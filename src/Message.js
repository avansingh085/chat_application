import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ from, message, timestamp }) => {
  const clientMobile = useSelector((state) => state.Chat.Mobile);

  const isClientMessage = from === clientMobile;

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`flex ${isClientMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-sm p-4 rounded-lg shadow-lg ${
          isClientMessage
            ? 'bg-green-100 text-green-900 border border-green-300'
            : 'bg-gray-100 text-gray-900 border border-gray-300'
        }`}
        style={{
          wordBreak: 'break-word',
          maxWidth: '80%', // Keeps messages compact
        }}
      >
        {/* Sender Info */}
        {!isClientMessage && (
          <p className="text-xs font-bold text-gray-500 mb-1">{from}</p>
        )}

        {/* Message Text */}
        <p className="text-sm leading-normal">{message}</p>

        {/* Timestamp */}
        <p
          className={`mt-2 text-xs ${
            isClientMessage ? 'text-green-600' : 'text-gray-600'
          } text-right`}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default Message;
