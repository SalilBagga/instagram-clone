import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//firebase
import { auth } from '../firebase/firebase';

//svg
import PlusBox from '../assets/001-plus.png';

export default function Header({
  handleOpen,
  user,
  handleLoginOpen,
  displayName,
  handleUploadimgOpen,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sticky z-10 top-0">
      <div className="bg-white py-4 object-contain border-b-1 border-grey-500 flex items-center justify-around w-full ">
        <img
          className=""
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <div className="flex items-center ">
            <span></span>
            <img
              src={PlusBox}
              alt=""
              className="mx-4 cursor-pointer"
              onClick={handleUploadimgOpen}
            />
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Profile
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>
                <strong>{displayName}</strong>
              </MenuItem>
              <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button onClick={handleLoginOpen}>Log In</Button>
            <Button onClick={handleOpen}>Sign UP</Button>
          </div>
        )}
      </div>
    </div>
  );
}
