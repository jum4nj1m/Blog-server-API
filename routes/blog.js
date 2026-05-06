const express = require("express");
const blogController = require("../controllers/blog");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/create", verify, blogController.createBlog);

router.get("/all", verify, blogController.getAllBlogs);

router.get("/specific/:id", verify, blogController.getBlog);

router.patch("/update/:id", verify, blogController.updateBlog); 

router.delete("/delete/:id", verify, verifyAdmin, blogController.deleteBlog);

module.exports = router;
