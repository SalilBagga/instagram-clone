import React, { useState, useEffect } from 'react';

//data
import { db, auth } from '../firebase/firebase';
//componenets
import Header from '../components/Header';
import Post from '../components/Post';

//modal
import SignupModal from '../modal/SignupModal';
import LoginModal from '../modal/LoginModal';
import ImageUploadModal from '../modal/ImageUploadModal';

export default function Home() {
  const [postdetails, setPostdetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginopen, setLoginopen] = useState(false);
  const [uploadopen, setUploadopen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoginOpen = () => setLoginopen(true);
  const handleLoginClose = () => setLoginopen(false);

  const handleUploadimgOpen = () => setUploadopen(true);
  const handleUploadimgClose = () => setUploadopen(false);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPostdetails(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        console.log(authuser.displayName);

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
        uploadopen={uploadopen}
        handleUploadimgOpen={handleUploadimgOpen}
        displayName={user ? user.displayName : null}
      />
      <ImageUploadModal
        uploadopen={uploadopen}
        handleUploadimgClose={handleUploadimgClose}
        username={user ? user.displayName : null}
      />
      <LoginModal handleLoginClose={handleLoginClose} loginopen={loginopen} />
      <SignupModal handleClose={handleClose} open={open} />

      {user ? (
        postdetails.length > 1 ? (
          postdetails.map(({ id, post }) => (
            <Post key={id} postid={id} post={post} username={user ? user.displayName : null} />
          ))
        ) : (
          <div className="mt-4  max-w-screen-sm mx-auto my-2 bg-white border rounded text-center">
            <h1 className="p-4">There are no posts available</h1>
          </div>
        )
      ) : (
        <div className="mt-4  max-w-screen-sm mx-auto my-2 bg-white border rounded text-center">
          <h1 className="p-4">Please SignUp or Login</h1>
        </div>
      )}
    </div>
  );
}
