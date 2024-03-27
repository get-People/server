import { Router , Request , Response } from "express";
const router = Router();
import User from '../models/user.js'
import purify from "../utils/sanitize.js";
import {updateUserValidator } from "../validation/userValidator.js";
import axios from "axios";
import https from "https"



router.get("/check", async (req, res) => {
  try {
    const response = await axios.get(`https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}/check`, {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
    res.status(200).send(response.data);
  }
  catch (error) { 
    console.error(error);
    res.status(500).send({ errorMessage: "Failed to check authentication server" });
  }
})
router.post("/register", async(req:Request, res:Response) => {
  try {
   const response = await axios.post(
  `https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}/register`,
  req.body,
  {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }
);
    res.status(200).send(response.data);  
  } catch (error:any) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send({ errorMessage: "Failed to register user on authentication server" });
    }
  }
});
router.post("/login", async (req: Request, res: Response) => {
  try{
  const response = await axios.post(`https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}/login`, req.body, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })
  res.status(200).send(response.data);
}
  catch(error){
    console.error(error)
    res.status(500).send({ message: "login fail" })
    }
})

router.get("/getAllUsers", async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send({message: "something error when trying to get users"})
  }
});
router.post("/specificUser", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findOne({
      "firstName": firstName,
      "lastName": lastName
    }).populate('address.country_id')
      .populate('address.city_id')
      .populate('address.street_id')
    res.status(200).send(user);
  }
  catch (error) {
    console.error(error)
    res.status(500).send({message: "error when trying to get user"})
  }
})

router.put("/updateUser/:id", async(req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (typeof id === 'string') {
      id = purify.sanitize(id)
    }
    const { error } = updateUserValidator.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message) 
    const updatedUser = await User.findByIdAndUpdate(
      id,
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
