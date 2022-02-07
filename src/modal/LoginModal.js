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

export default function LoginModal({ handleLoginClose, loginopen }) {
  const [lemail, setLemail] = useState('');
  const [lpassword, setLpassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(lemail, lpassword).catch((err) => alert(err.message));
    handleLoginClose();
  };

  return (
    <div>
      <Modal
        open={loginopen}
        onClose={handleLoginClose}
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
                placeholder="email"
                value={lemail}
                type="email"
                onChange={(e) => setLemail(e.target.value)}
              />
              <Input
                className="mt-4"
                placeholder="password"
                value={lpassword}
                type="password"
                onChange={(e) => setLpassword(e.target.value)}
              />
              <Button stype="submit" onClick={handleLogin} className="mt-4">
                Log IN
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
