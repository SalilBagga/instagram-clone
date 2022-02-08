import React, { useEffect, useState } from 'react';

//firebase auth
import { storage, db } from '../firebase/firebase';

//material ui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
//css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '746px',
  height: 'height: calc(100vmin - 219px);',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '15px',
  boxShadow: 24,
  pt: 3,
};

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
              caption: caption,
              imgURL: url,
              username: username,
            });
            setCaption('');
            setImage(null);
          });
      }
    );
    handleUploadimgClose();
  };

  return (
    <div>
      <Modal
        open={uploadopen}
        onClose={handleUploadimgClose}
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
              <div className="flex flex-col items-center mt-4 h-full w-full">
                <div className="flex mt-4 h-cust  justify-between ">
                  <div className="h-full w-[373px] pl-2 border-r-1 flex flex-col items-center">
                    {imgurl ? (
                      <img src={imgurl} alt="" className="object-contain h-full " />
                    ) : (
                      <input
                        type="file"
                        className="my-auto mx-auto btn"
                        required
                        onChange={handleImgChange}
                      />
                    )}
                  </div>

                  <div className="h-full w-[373px] pr-2">
                    {/* <Input
                      placeholder="Enter caption......"
                      type="text"
                      rows={10}
                      onChange={(e) => setCaption(e.target.value)}
                      value={caption}
                      required
                    /> */}
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
                <div className="my-4">
                  <Button onClick={handleUpload}>Upload</Button>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
