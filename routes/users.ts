import { Router , Request , Response } from "express";
const router = Router();
import User from '../models/user.js'
import purify from "../utils/sanitize.js";
import { createUserValidator, updateUserValidator } from "../validation/userValidator";


router.post("/createUser", async(req, res) => {
  try {
    Object.keys(req.body).forEach(key => {
    req.body[key] = purify.sanitize(req.body[key])
    })
    const { error } = createUserValidator.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    const newUser = await User.create(req.body)
    res.status(200).send(newUser)
  } catch (error) {
    console.error(error);
    res.status(500).send({errorMessage: "create fail"})
  }
});
router.get("/getAllUsers", async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send({message: "something error when trying to get users"})
  }
});

router.put("/updateUser:/id", async(req: Request, res: Response) => {
  
  try {
    if (typeof req.params.id === 'string') {
      req.params.id = purify.sanitize(req.params.id)
    }
    const { error } = updateUserValidator.validate(req.params.id)
    if(error) return res.status(400).send(error.details[0].message) 
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    )
    if (!updatedUser) return res.status(404).send("something went wrong with the updating");
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error)
    res.status(500).send({ errorMessage: "update fail" })
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
      if (!user) return res.status(400).send("the user with the given id was not found");

    res.status(200).send("deleting user successfully")
  } catch (error) {
      console.error(error)
    res.status(500).send("something went wrong when deleting")
  }
});


export default router;
