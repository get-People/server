"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sanitize_js_1 = __importDefault(require("../utils/sanitize.js"));
const postValidator_js_1 = require("../validation/postValidator.js");
const post_js_1 = __importDefault(require("../models/post.js"));
const router = (0, express_1.Router)();
router.post("/createPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Object.keys(req.body).forEach(key => {
        req.body[key] = sanitize_js_1.default.sanitize(req.body[key]);
    });
    const { error } = postValidator_js_1.createPostValidation.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const newPost = yield post_js_1.default.create(req.body);
        res.status(200).send(newPost);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "error when creating post" });
    }
}));
router.get("/allPosts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_js_1.default.find({});
        res.status(200).send(posts);
    }
    catch (error) {
        console.log(error);
        res.status(404).send("didn't succeed getting all posts");
    }
}));
router.get("/title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.query.title === "string") {
        req.query.title = sanitize_js_1.default.sanitize(req.query.title);
    }
    const { error } = postValidator_js_1.checkPostValidation.validate(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const post = yield post_js_1.default.findOne({ title: req.query.title });
        if (!post)
            return res.status(400).send("the post was not found");
        res.status(200).send(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("something went wrong in get post by title");
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_js_1.default.findById(req.params.id);
        if (!post)
            return res.status(400).send("the post was not found");
        res.status(200).send(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("something went wrong in get post by ID");
    }
}));
router.put("/updatePost/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Object.keys(req.body).forEach(key => {
            req.body[key] = sanitize_js_1.default.sanitize(req.body[key]);
        });
        const { error } = postValidator_js_1.updatePostValidation.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        }
        const postUpdated = yield post_js_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!postUpdated)
            return res.status(400).send("the post with the given id was not found");
        return res.status(200).send(postUpdated);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("something went wrong when updating post");
    }
}));
router.delete("/deletePost/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_js_1.default.findByIdAndDelete(req.params.id);
        if (!post)
            return res.status(400).send("the post with the given id was not found");
        res.status(200).send("deleting post successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("something went wrong when deleting");
    }
}));
router.delete("/allPosts", (req, res) => {
    try {
        post_js_1.default.deleteMany({ title: true });
    }
    catch (error) {
    }
});
exports.default = router;
