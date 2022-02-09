import React, { useEffect, useState } from 'react';

//firebase auth
import { storage, db } from '../firebase/firebase';
import firebase from 'firebase/compat/app';

//material ui
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function ImageUploadModal({ uploadopen, handleUploadimgClose, username }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imgurl, setImgurl] = useState(null);

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      console.log('here 0');

      setImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    console.log(image);
    if (image) {
      console.log('here 1');
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (err) => {
          console.log(err);
          alert(err.message);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log('here 2');

              console.log(url);
              setImgurl(url);
            });
        }
      );
    }
  }, [image]);

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (err) => {
        alert(err.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgURL: url,
              username: username,
            });
            setCaption('');
            setImage(null);
            setImgurl(null);
          });
      }
    );
    handleUploadimgClose();
  };

  return (
    <Modal open={uploadopen} onClose={handleUploadimgClose}>
      <div className="  flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50">
        <div className="absolute inset-0" onClick={handleUploadimgClose}></div>
        <div className="bg-white  md:w-3/6   border rounded-md text-center z-1">
          <div className="w-full h-full text-center py-3 border rounded-t-md bg-purple-custom">
            <img
              className="max-w-[35%] mx-auto"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </div>
          <div className="px-2 py-1">
            <div className="w-full text-left mb-2  border-b-2 flex justify-around">
              <div className="flex flex-col items-center mt-4 w-full">
                <div className="grid grid-cols-2 mt-4 h-cust w-full  justify-between ">
                  <div className="h-full w-full  border-r-1 flex flex-col items-center">
                    {imgurl ? (
                      <div className="h-full flex flex-col ">
                        <img src={imgurl} alt="" className="object-contain h-9/5" />
                        <button
                          onClick={() => {
                            setImage(null);
                            setImgurl(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        className="my-auto mx-auto btn"
                        required
                        onChange={handleImgChange}
                      />
                    )}
                  </div>
                  <div className="h-full w-full pr-2">
                    <TextareaAutosize
                      minRows={4}
                      aria-label="maximum height"
                      placeholder="Enter caption......"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full "
                    />
                  </div>
                </div>
                <div className="py-4">
                  <Button onClick={handleUpload}>Upload</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
