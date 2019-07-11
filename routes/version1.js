var express = require("express");
var router = express.Router();

const PostModel = require("../models/posts");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.send("Welcome to my API").status(200);
});

router.get("/all", async (req, res, next) => {
    const allPosts = await PostModel.getAll();
    res.json(allPosts).status(200);
});

router.get("/post/:post_id?", async (req, res, next) => {
    const postId = req.params.post_id;
    const thePost = await PostModel.getById(postId);
    res.json(thePost).status(200);
});

router.get("/post/delete/:post_id?", async (req, res, next) => {
    const postId = req.params.post_id;
    const response = await PostModel.removeEntry(postId);
    if (response.command === "DELETE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not delete Post ID ${postId}`).status(409);
    }
});

router.post("/post/add", async (req, res) => {
    const { title, author_id, content } = req.body;
    const response = await PostModel.addEntry(title, author_id, content);
    if (response.command === "INSERT" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not add new blog post ${title}`).status(409);
    }
});

router.put("/post/update/:post_id?", async (req, res) => {
    const postId = req.params.post_id;
    const { content } = req.body;
    const response = await PostModel.updateEntry(postId, "content", content);
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update Post Id ${postId}`).status(409);
    }
});

module.exports = router;
