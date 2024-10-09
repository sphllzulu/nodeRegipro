import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const FirebaseImage = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const storage = getStorage();
      try {
        const url = await getDownloadURL(ref(storage, imagePath));
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL: ", error);
      }
    };

    if (imagePath) {
      fetchImage();
    }
  }, [imagePath]);

  return imageUrl ? <img src={imageUrl} alt="Employee" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /> : null;
};

export default FirebaseImage;