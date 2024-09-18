import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blog.css'; 
import { Link } from 'react-router-dom';
import plusIcon from'../../Asset/blog/plus.png'
import userIcon from '../../Asset/blog/user.png'
import editIcon from '../../Asset/blog/editIcon.png'
import trashIcon from '../../Asset/blog/trashIcon.png'

function Blog({ user, isLoggedIn }) {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', postText: '', username: '' });
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
                username: user ? user.Name : '' 
            };
            await axios.post("http://localhost:3001/posts", postWithUsername);
        }

        // Refresh posts after update or creation
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data.reverse());
        });

        setNewPost({ title: '', postText: '', username: user ? user.Name : '' });
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
        const postToEdit = listOfPosts.find(post => post.id === postId);
        setNewPost(postToEdit);
        setEditPostId(postId);
        setShowEditForm(true);
        setShowCreateForm(false);
    };

    const deletePost = async (postId) => {
        await axios.delete(`http://localhost:3001/posts/${postId}`);
        setListOfPosts(listOfPosts.filter(post => post.id !== postId));
    };

    return (
        <div className="blog-container">
            {isLoggedIn && (
                <React.Fragment> 
                    <div className="circle-plus-icon">
                        <img src={plusIcon} alt="Add Post" style={{width:'20px',height:'20px'}} onClick={toggleForm} />
                    </div>
                    {showCreateForm && (
                        <div className="modal-backdrop">
                            <div className='BlogInput'>
                                
                                <button className="close-btn" onClick={toggleForm}>X</button>
                                <span style={{fontWeight:'bold', fontSize:'18px',color:'#333333'}}>Do you have anything to share with us?</span>
                                <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                                <textarea placeholder="Write your post here..." value={newPost.postText} onChange={(e) => setNewPost({ ...newPost, postText: e.target.value })}></textarea>
                                <button onClick={handlePostSubmit}>Post</button>
                            </div>
                        </div>
                    )}
                    {showEditForm && (
                        <div className="modal-backdrop">
                            <div className='BlogInput'>
                            
                                <span style={{fontWeight:'bold', fontSize:'18px',color:'#333333'}}>Do you have anything to share with us?</span>
                                <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                                <textarea placeholder="Write your post here..." value={newPost.postText} onChange={(e) => setNewPost({ ...newPost, postText: e.target.value })}></textarea>
                                <button onClick={handlePostSubmit}>Save</button>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            )}

            <div className="posts-container">
                {listOfPosts.map((value, key) => (
                    <div className="post" key={key}>
                        <div>
                            <div className="footer">
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <img src={userIcon} alt="User" className="user-icon" style={{width:'35px',height:'35px'}} />{value.username}
                                </div>
                                {user && user.Name === value.username && (
                                    <div>
                                        <img src={editIcon} className='user-icon' onClick={() => editPost(value.id)} />
                                        <img src={trashIcon} className='user-icon' onClick={() => deletePost(value.id)} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="title">{value.title}</div>
                        
                        <div className="body">{value.postText}</div>
                    </div>
                ))}
            </div>
            <footer className="footer-section">
                <div className="footer-content">
                    <ul>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><div style={{color:'#FFFFFF'}}> Terms of Service </div></li>
                        <li><div style={{color:'#FFFFFF'}}> Privacy Policy </div></li>
                        <li><a href="mailto:food4g@gmail.com">Contact Us</a></li>
                    </ul>
                    <p style={{color:'#FFFFFF'}}>&copy; 2024 Fitness Journey. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Blog;
