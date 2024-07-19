import React from 'react';

const Blog = ({ blog, handleLike, handleUnlike }) => {
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <img src={blog.image} alt={blog.title} />
            <div>
                <button onClick={() => handleLike(blog._id)}>Like ({blog.likes})</button>
                <button onClick={() => handleUnlike(blog._id)}>Unlike</button>
            </div>
        </div>
    );
};

export default Blog;
