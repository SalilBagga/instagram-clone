import React from 'react';
import Button from '@mui/material/Button';

//firebase
import { auth } from '../firebase/firebase';

//svg
import { ReactComponent as Plus } from '../assets/1534378836 (1).svg';

export default function Header({
  handleOpen,
  user,
  handleLoginOpen,
  displayName,
  uploadopen,
  handleUploadimgOpen,
}) {
  return (
    <div className="bg-white p-5 object-contain border-b-1 border-grey-500 flex items-center justify-around">
      <img
        className=""
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />
      {user ? (
        <div className="flex items-center">
          <span>
            <strong>{displayName}</strong>
          </span>
          <Plus className="mx-4 cursor-pointer" onClick={handleUploadimgOpen} />
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        </div>
      ) : (
        <div>
          <Button onClick={handleLoginOpen}>Log In</Button>
          <Button onClick={handleOpen}>Sign UP</Button>
        </div>
      )}
    </div>
  );
}
