import { Router, Request, Response } from "express";
import purify from "../utils/sanitize.js";
import {checkPostValidation, updatePostValidation, createPostValidation} from "../validation/postValidator.js";
import Post from "../models/post.js";
const router = Router();


router.post("/createPost", async (req: Request, res: Response) => {
  Object.keys(req.body).forEach(key => {
    req.body[key] = purify.sanitize(req.body[key]);
  })
  const { error } = createPostValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const newPost = await Post.create(req.body);
    res.status(200).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).send({message: "error when creating post"})
  }
});
router.get("/allPosts", async(req: Request, res: Response) => {
  try {
    const posts = await Post.find({})
    res.status(200).send(posts);  
  }
  catch (error) {
    console.log(error);
    res.status(404).send("didn't succeed getting all posts")
  }
});
router.get("/title", async (req: Request, res: Response) => {
  if(typeof req.query.title === "string"){
      req.query.title = purify.sanitize(req.query.title);
  }

  const {error} = checkPostValidation.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    const post = await Post.findOne({ title: req.query.title })
    if (!post) return res.status(400).send("the post was not found");
    res.status(200).send(post)
  } catch (error) {
    console.error(error)
      res.status(500).send("something went wrong in get post by title")
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(400).send("the post was not found");
    res.status(200).send(post)
    
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong in get post by ID")
  }
})

router.put("/updatePost/:id", async (req: Request, res: Response) => {
  try {
    Object.keys(req.body).forEach(key => {
      req.body[key] = purify.sanitize(req.body[key])
    })
    const { error } = updatePostValidation.validate(req.body)
    if (error) {
      res.status(400).send(error.details[0].message);
    }
    const postUpdated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    )
    if (!postUpdated) return res.status(400).send("the post with the given id was not found");
    
    return res.status(200).send(postUpdated);
  }
  catch (error) {
    console.error(error);
    res.status(500).send("something went wrong when updating post");
  }
});
router.delete("/:id",async (req: Request, res: Response) => { 
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(400).send("the post with the given id was not found");

    res.status(200).send("deleting post successfully")
    
  } catch (error) {
    console.error(error)
    res.status(500).send("something went wrong when deleting")
  }
});
router.delete("/allPosts", (req, res) => {
  try {
    Post.deleteMany({ title: true })
  }
  catch (error) {
    
}
})

export default router;
