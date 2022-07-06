import React, { useState, useEffect } from "react";
import "./App.css";
import Chats from "../chats/App";
import AccountManagement from "../account-management/AccountManagement";
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllPosts } from './functions/postFunctions';
import { getUserByID, getUsers } from '../account-management/functions/usersFunctions';


function Feed() {
  const [chatIsShown, setChatIsShown] = useState(false);
  const [accountManagementIsShown, setAccountManagementIsShown] = useState(false);
  const [feedIsShown, setFeedIsShown] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((res) => {
      setIsLoading(true);
      setPosts(res);
      setIsLoading(false);
    }).catch(err => console.log(err))
  }, []);

  const showChat = event => {
    setChatIsShown(true);
    setFeedIsShown(false);
    setAccountManagementIsShown(false);
  };
  const showAccountManagement = event => {
    setAccountManagementIsShown(true);
    setChatIsShown(false);
    setFeedIsShown(false);
  };
  const showFeed = event => {
    setFeedIsShown(true);
    setAccountManagementIsShown(false);
    setChatIsShown(false);
  };

  function Post(post) {
    let userData = {
      _id: post.post.UserID,
      ProfilePicture: "",
      Username: ""
    }
    getUsers().then((users) => {
      users.forEach(user => {
        if (user._id == userData._id) {
          setIsLoading(true);
          userData.ProfilePicture = user.ProfilePicture;
          userData.Username = user.Username;
          console.log(userData.Username);
          setIsLoading(false);
        }
      });
    });
    return (
      <div>
        <header>
          {/* This will come from user once they are made in DB */}
          <div className="Post-user">
            <div className="Post-user-profilepicture">
              <img src={userData.ProfilePicture} alt="NoPicUploaded" />
            </div>
            <div className="Post-user-nickname">
              <span>{userData.Username}</span>
            </div>
            <IconButton onClick={showChat} className="chat-button" aria-label="chat">
              <ChatIcon />
            </IconButton>
          </div>
        </header>
        <div className="">
          <div className="Post-image-bg">
            <img src={post.post.ImageURL} width="400px" alt="doggo" />
          </div>
        </div>
        <div className="Post-caption">
          <strong>{post.post.PostTitle} </strong>
          <p>{post.post.TextBody}</p>
        </div>
      </div>
    );

  }

  return (
    <>
      <header>
        <img src="https://i.ibb.co/tBRgm6j/Bone-Swap-Logo.png" alt="Logo" />
        <br />
        <IconButton onClick={showAccountManagement} className="am-button" aria-label="chat">
          <PersonIcon />
        </IconButton>
        <br />
        <hr />
      </header>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {posts.map((post, index) => (
            <>
              {feedIsShown && (
                <>
                  <Post key={index} post={post} />
                  <Divider />
                </>
              )}
            </>
          ))}
          {chatIsShown && (<IconButton onClick={showFeed} className="am-button" aria-label="feed">
            <ArrowBackIcon />
          </IconButton>)}
          {accountManagementIsShown && (<IconButton onClick={showFeed} className="am-button" aria-label="feed">
            <ArrowBackIcon />
          </IconButton>)}
          {chatIsShown && (<Chats />)}
          {accountManagementIsShown && (<AccountManagement />)}
        </div>
      )}
    </>
  );
}

export default Feed;
