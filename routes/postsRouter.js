import { Router } from "express";
const router = Router();

const posts = [
  { name: "john", title: "sport", id: 1 },
  { name: "carl", data: "economy", id: 2 },
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
  const title = req.body.title;

  const postIndex = posts.findIndex((post) => post.id == id);
  posts[postIndex].title = title;

  res.status(200);
});
router.post("/filteredPosts:title", (req, res) => {
  const title = req.params;
  const filteredPosts = posts.filter((post) => post.title == title);
  res.status(200).send(filteredPosts);
});
router.put("/addPost", (req, res) => {
  const post = req.body;
  post.id = posts.length + 1;
  posts.push(post);
});

router.delete("/deletePostByID/:id", (req, res) => {
  posts = posts.filter((post) => post.id != req.params);
  res.sendStatus(200);
});

export default router;
