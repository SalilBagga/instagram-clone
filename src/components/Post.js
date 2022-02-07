import React from 'react';
import { Avatar } from '@mui/material';

export default function Post({ username, caption, imgURL }) {
  return (
    <div className="max-w-screen-sm mx-auto my-6 bg-white border rounded">
      <div className="flex items-center p-4">
        <Avatar alt={username} src="/static/images/avatar/1.jpg" className="mr-2.5" />
        <h1>{username}</h1>
      </div>

      <img className="w-full object-contain border-t-1 border-b-1" src={imgURL} alt="" />
      <div className="p-4">
        <h4>
          <strong>{username}</strong> : {caption}
        </h4>
      </div>
    </div>
  );
}
