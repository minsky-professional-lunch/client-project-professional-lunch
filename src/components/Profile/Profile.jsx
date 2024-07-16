import { useDispatch, useSelector } from 'react-redux';
import { useScript } from '../../hooks/useScript';
import React, { useState } from 'react';

export default function Profile() {

    const [editProfile, setEditProfile] = useState({avatar: ''});

    const openWidget = () => {
        !!window.cloudinary && window.cloudinary.createUploadWidget(
           {
              sources: ['local', 'url', 'camera'],
              cloudName: 'dz2bil44j',
              uploadPreset: 'hl5wdxak'
           },
           (error, result) => {
              if (!error && result && result.event === "success") {
                 setEditProfile({
                    ...editProfile,
                    avatar: result.info.secure_url
                 })
              }
           },
        ).open();
     }

    return (
        <div className="container">
            <h1>My Profile</h1>
            <button onClick={(openWidget)}>Upload</button>
            {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
        </div>
    )
}