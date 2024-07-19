import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBlogs();
    }, [currentPage]);

    const fetchBlogs = async () => {
        const response = await axios.get(`/api/blogs?page=${currentPage}`);
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
    };

    const handleLike = async (id) => {
        await axios.patch(`/api/blogs/${id}/like`);
        fetchBlogs();
    };

    const handleUnlike = async (id) => {
        await axios.patch(`/api/blogs/${id}/unlike`);
        fetchBlogs();
    };

    return (
        <div>
            {blogs.map(blog => (
                <Blog
                    key={blog._id}
                    blog={blog}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                />
            ))}
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
