const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Get all blogs with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const blogs = await Blog.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Blog.countDocuments();
        res.json({
            blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new blog
router.post('/', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update blog likes
router.patch('/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        blog.likes += 1;
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Decrease blog likes
router.patch('/:id/unlike', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        blog.likes = Math.max(blog.likes - 1, 0);
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
