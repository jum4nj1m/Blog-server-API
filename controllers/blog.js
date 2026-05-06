const Blog = require("../models/Blog");
const { errorHandler } = require("../auth");


module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, authorInformation, coverImage } = req.body;

        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(409).send({ message: "Blog title already exists" });
        }

        const newBlog = new Blog({ title, content, authorInformation, coverImage });
        const result = await newBlog.save();
        
        return res.status(201).send({
            success: true,
            message: "Blog added successfully",
            result
        });
    } catch (err) {
        errorHandler(err, req, res);
    }
};


module.exports.getAllBlogs = async (req, res) => {
    try {
        const result = await Blog.find({});
        if (result.length > 0) {
            return res.status(200).send(result);
        }
        return res.status(404).send({ message: "No blogs found" });
    } catch (err) {
        errorHandler(err, req, res);
    }
};


module.exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            return res.status(200).send(blog);
        }
        return res.status(404).send({ message: "Blog not found" });
    } catch (err) {
        errorHandler(err, req, res);
    }
};

module.exports.updateBlog = async (req, res) => {
    try {
        const { title, content, authorInformation, coverImage } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            { title, content, authorInformation, coverImage }, 
            { new: true }
        );

        if (updatedBlog) {
            return res.status(200).send({ message: "Blog updated successfully", result: updatedBlog });
        }
        return res.status(404).send({ message: "Blog not found" });
    } catch (error) {
        errorHandler(error, req, res);
    }
};


module.exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        
        if (!deletedBlog) {
            return res.status(404).send({ message: "Blog not found" });
        }

        return res.status(200).send({ 
            message: "Blog deleted successfully", 
            result: deletedBlog 
        });
    } catch (error) {
        errorHandler(error, req, res);
    }
};