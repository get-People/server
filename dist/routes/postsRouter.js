"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_js_1 = __importDefault(require("../validation/validator.js"));
const router = (0, express_1.Router)();
let posts = [
    { name: "john", title: "sport", id: 1 },
    { name: "carl", title: "economy", id: 2 },
];
router.get("/getAllPosts", (req, res) => {
    res.status(200).send(posts);
});
router.get("/getPostByID/:id", (req, res) => {
    const { id } = req.params;
    const postID = parseInt(id);
    const post = posts.find((post) => post.id == postID);
    res.status(200).send(post);
});
router.post("/updatePostByID/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const postID = parseInt(id);
    const postIndex = posts.findIndex((post) => post.id == postID);
    if (postIndex !== -1) {
        posts[postIndex].title = title;
        res.status(200).send(posts[postIndex]);
    }
    else {
        res.status(404).send("Post not found");
    }
});
router.post("/filteredPosts", (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).send("Title is required.");
    }
    const { error } = validator_js_1.default.validate({ title });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const filteredPosts = posts.filter((post) => post.title === title);
    res.status(200).json(filteredPosts);
});
router.put("/addPost", (req, res) => {
    const { name, title } = req.body;
    const post = { name, title, id: posts.length + 1 };
    if (post) {
        console.log(post);
        posts.push(post);
        res.status(201).send(post);
    }
    else {
        res.status(400).send("Invalid post data");
    }
});
router.delete("/deletePostByID/:id", (req, res) => {
    const { id } = req.params;
    const postID = parseInt(id);
    posts = posts.filter((post) => post.id != postID);
    res.sendStatus(200);
});
exports.default = router;
