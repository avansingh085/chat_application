import React from 'react';

const Message = ({ from, message, isPrivate, to }) => (
  <div
    className={`p-3 rounded-lg shadow-sm  ${
      isPrivate ? 'bg-yellow-100' : 'bg-blue-100'
    }`}
  >
    <p className="font-semibold">
      {isPrivate ? `${from})` : null}:
    </p>
    <p className="text-sm text-gray-800">{message}</p>
  </div>
);

export default Message;
