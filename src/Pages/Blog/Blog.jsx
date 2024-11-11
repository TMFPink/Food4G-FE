import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import plusIcon from "../../Asset/blog/plus.png";
import userIcon from "../../Asset/blog/user.png";
import editIcon from "../../Asset/blog/editIcon.png";
import trashIcon from "../../Asset/blog/trashIcon.png";
import { IoMdClose } from "react-icons/io";
function Blog({ user, isLoggedIn }) {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    postText: "",
    username: "",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editPostId, setEditPostId] = useState(null); // Track the post being edited

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data.reverse());
    });
  }, []);

  const handlePostSubmit = async () => {
    if (editPostId) {
      // If editPostId is set, it means we are updating an existing post
      await axios.put(`http://localhost:3001/posts/${editPostId}`, newPost);
    } else {
      // Otherwise, we are creating a new post
      const postWithUsername = {
        ...newPost,
        username: user ? user.Name : "",
      };
      await axios.post("http://localhost:3001/posts", postWithUsername);
    }

    // Refresh posts after update or creation
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data.reverse());
    });

    setNewPost({ title: "", postText: "", username: user ? user.Name : "" });
    setShowCreateForm(false);
    setShowEditForm(false);
    setEditPostId(null); // Reset editPostId
  };

  const toggleForm = () => {
    setShowCreateForm(!showCreateForm);
    setShowEditForm(false); // Ensure edit form is closed when creating new post
    setEditPostId(null); // Reset editPostId when creating new post
  };

  const editPost = (postId) => {
    const postToEdit = listOfPosts.find((post) => post.id === postId);
    setNewPost(postToEdit);
    setEditPostId(postId);
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const deletePost = async (postId) => {
    await axios.delete(`http://localhost:3001/posts/${postId}`);
    setListOfPosts(listOfPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="w-full h-auto flex items-center pt-10 flex-col bg-[#1D1D1D]">
      {isLoggedIn && (
        <React.Fragment>
          <div className="fixed bottom-5 left-5 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl text-white cursor-pointer">
            <img
              src={plusIcon}
              alt="Add Post"
              className="w-5 h-5"
              onClick={toggleForm}
            />
          </div>
          {showCreateForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-1/2 bg-white p-5 rounded-lg text-center">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-center text-gray-800 mx-auto">
                    Do you have anything to share with us?
                  </span>
                  <button
                    className="text-xl text-black"
                    onClick={() => {
                      toggleForm(); // Close the form when clicked
                      setNewPost({ title: "", postText: "", username: user ? user.Name : "" }); // Reset the newPost state
                    }}
                  >
                    <IoMdClose />
                  </button>
                </div>
                <input
                  type="text"
                  className="w-11/12 mt-5 p-2 border-2 border-gray-300 rounded"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <textarea
                  className="w-11/12 mt-5 p-2 border-2 border-gray-300 rounded"
                  placeholder="Write your post here..."
                  value={newPost.postText}
                  onChange={(e) =>
                    setNewPost({ ...newPost, postText: e.target.value })
                  }
                ></textarea>
                <button
                  className="w-24 p-2 bg-black text-white rounded"
                  onClick={handlePostSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          )}
          {showEditForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-1/2 bg-white p-5 rounded-lg text-center">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800 mx-auto">
                    Do you have anything to share with us?
                  </span>
                  <button
                    className="text-xl text-black"
                    onClick={() => {
                      setShowEditForm(false); // Close the edit form
                      setNewPost({ title: "", postText: "", username: user ? user.Name : "" }); // Reset the newPost state
                    }}
                  >
                    <IoMdClose />
                  </button>
                </div>
                <input
                  type="text"
                  className="w-11/12 mt-5 p-2 border-2 border-gray-300 rounded"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <textarea
                  className="w-11/12 mt-5 p-2 border-2 border-gray-300 rounded"
                  placeholder="Write your post here..."
                  value={newPost.postText}
                  onChange={(e) =>
                    setNewPost({ ...newPost, postText: e.target.value })
                  }
                ></textarea>
                <button
                  className="w-24 p-2 bg-black text-white rounded"
                  onClick={handlePostSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      )}

      <div className="grid grid-cols-2 gap-12">
        {listOfPosts.map((value, key) => (
          <div
            className="w-[550px] h-auto rounded-lg flex flex-col border border-black shadow-md text-white "
            key={key}
          >
            <div className="flex justify-between items-center p-2 bg-[#D3A121] rounded-t-lg">
              <div className="flex items-center">
                <img src={userIcon} alt="User" className="w-7 h-7 mr-1" />
                {value.username}
              </div>
              {user && user.Name === value.username && (
                <div className="flex items-center">
                  <img
                    src={editIcon}
                    className="w-5 h-5 mr-2 cursor-pointer"
                    onClick={() => editPost(value.id)}
                  />
                  <img
                    src={trashIcon}
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => deletePost(value.id)}
                  />
                </div>
              )}
            </div>
            <div className="bg-black text-white text-center p-2">
              {value.title}
            </div>
            <div className="text-left leading-8 p-2">{value.postText}</div>
          </div>
        ))}
      </div>
      <footer className="bg-[#272728] py-10 w-full text-center">
        <div className="max-w-5xl mx-auto">
          <ul className="list-none p-0">
            <li className="inline-block mr-5">
              <Link to="/posts" className="text-white">
                Blog
              </Link>
            </li>
            <li className="inline-block mr-5 text-white">Terms of Service</li>
            <li className="inline-block mr-5 text-white">Privacy Policy</li>
            <li className="inline-block">
              <a href="mailto:food4g@gmail.com" className="text-white">
                Contact Us
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-white">
            &copy; 2024 Fitness Journey. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Blog;
