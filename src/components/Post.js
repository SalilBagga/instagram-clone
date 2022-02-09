import React, { useEffect, useState } from 'react';
import { Avatar, Input } from '@mui/material';

//firebase
import { db } from '../firebase/firebase';
import firebase from 'firebase/compat/app';

export default function Post({ post, postid, username }) {
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postid) {
      unsubscribe = db
        .collection('posts')
        .doc(postid)
        .collection('comments')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postid]);

  const postCommentFunction = (e) => {
    e.preventDefault();
    db.collection('posts').doc(postid).collection('comments').add({
      text: postComment,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setPostComment('');
  };

  return (
    <div className="p-4">
      <div className="max-w-screen-sm mx-auto my-2 bg-white border rounded">
        <div className="flex items-center p-4">
          <Avatar alt={post.username} src="/static/images/avatar/1.jpg" className="mr-2.5" />
          <h1>{post.username}</h1>
        </div>
        <img className="w-full object-contain border-t-1 border-b-1" src={post.imgURL} alt="" />
        <div className="p-4">
          <>
            <h4>
              <strong>{post.username}</strong> : {post.caption}
            </h4>
          </>
        </div>
        <div className="px-4 pb-4">
          <h4>Comments</h4>
          {comments &&
            comments.map((com, index) => (
              <h4 key={index}>
                <strong>{com.username}</strong> {com.text}
              </h4>
            ))}
        </div>
        <div className="px-4 pb-4">
          <form className="flex">
            <Input
              type="text"
              placeholder="Enter Comment......"
              className="w-full "
              value={postComment}
              onChange={(e) => {
                setPostComment(e.target.value);
              }}
            />
            <button type="submit" disabled={!postComment} onClick={postCommentFunction}>
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
