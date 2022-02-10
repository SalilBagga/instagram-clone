import React, { useState } from 'react';

//firebase auth
import { auth } from '../firebase/firebase';

//material ui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Input, Button } from '@mui/material';

//css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};
export default function SignupModal({ handleClose, open }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authuser) => {
        authuser.user.updateProfile({
          displayName: username,
        });

        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            window.location.reload();
            setEmail('');
            setPassword('');
            setUsername('');
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="flex flex-col">
              <img
                className="max-w-[35%] mx-auto"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <Input
                className="mt-4"
                placeholder="username"
                value={username}
                type="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                className="mt-4"
                placeholder="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="mt-4"
                placeholder="password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button stype="submit" onClick={handleSignup} className="mt-4">
                Sign up
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
