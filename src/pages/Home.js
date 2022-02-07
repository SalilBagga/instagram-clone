import React, { useState, useEffect } from 'react';

//data
import { db, auth } from '../firebase/firebase';
//componenets
import Header from '../components/Header';
import Post from '../components/Post';

//modal
import SignupModal from '../modal/SignupModal';
import LoginModal from '../modal/LoginModal';

export default function Home() {
  const [data, setData] = useState(null);
  const [postdetails, setPostdetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginopen, setLoginopen] = useState(false);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoginOpen = () => setLoginopen(true);
  const handleLoginClose = () => setLoginopen(false);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPostdetails(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
    console.log(data);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        console.log(authuser.multiFactor.user.displayName);
        setDisplayName(authuser.multiFactor.user.displayName);
        setUser(authuser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return (
    <div>
      <Header
        handleOpen={handleOpen}
        user={user}
        loginopen={loginopen}
        handleLoginOpen={handleLoginOpen}
        displayName={displayName}
      />
      <LoginModal handleLoginClose={handleLoginClose} loginopen={loginopen} />
      <SignupModal handleClose={handleClose} open={open} />
      {postdetails.map(({ id, post }) => (
        <Post key={id} username={post.username} caption={post.caption} imgURL={post.imgURL} />
      ))}
    </div>
  );
}
