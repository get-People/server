import { Router } from "express";
import titleValidation from "../validation/validator.js";
const router = Router();

let posts = [
  { name: "john", title: "sport", id: 1 },
  { name: "carl", title: "economy", id: 2 },
];

router.get("/getAllPosts", (req, res) => {
  res.status(200).send(posts);
});

router.get("/getPostByID/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id == id);
  res.status(200).send(post);
});

router.post("/updatePostByID/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const postIndex = posts.findIndex((post) => post.id == id);
  if (postIndex !== -1) {
    posts[postIndex].title = title;
    res.status(200).send(posts[postIndex]);
  } else {
    res.status(404).send("Post not found");
  }
});

router.post("/filteredPosts", (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).send("Title is required.");
  }

  const { error } = titleValidation.validate({ title });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const filteredPosts = posts.filter((post) => post.title === title);
  res.status(200).json(filteredPosts);
});

router.put("/addPost", (req, res) => {
  const { name, title } = req.body;
  const post = { name, title };
  if (post) {
    post.id = posts.length + 1;
    console.log(post);
    posts.push(post);
    res.status(201).send(post);
  } else {
    res.status(400).send("Invalid post data");
  }
});

router.delete("/deletePostByID/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id != id);
  res.sendStatus(200);
});

export default router;
