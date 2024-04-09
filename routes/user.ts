import { Router , Request , Response } from "express";
const router = Router();
import purify from "../utils/sanitize.js";
import {updateUserValidator } from "../validation/userValidator.js";
import axios from "axios";
import https from "https"
import { isAdmin, verifyToken } from "../utils/auth.js";
import DB from "../DB/db.js";


const db = new DB();

const axiosInstance = axios.create({
  baseURL: `https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}`,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
  withCredentials: true 
})

router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    // Object.keys(req.body).forEach(key => {
    //   req.body[key] = purify.sanitize(req.body[key]);
    // })
    const mainServerUrl = `https://${process.env.ADDRESS}:${process.env.PORT}/api/users`;
    req.body.mainServerUrl = mainServerUrl;
    const response = await axiosInstance.post("/forgot-password", req.body);
    res.status(200).send(response.data);
  } catch (err: any) {
    console.error(err);
    if (err.response) {
      res.status(err.response.status).send(err.response.data);
    } else {
      res.status(500).send({ errorMessage: "Failed to request password reset" });
    }
  }
});

router.post("/register", async(req:Request, res:Response) => {
  try {
     // Object.keys(req.body).forEach(key => {
    //   req.body[key] = purify.sanitize(req.body[key]);
    // })
    const response = await axiosInstance.post('/register', req.body);
    const cookieHeader = response.headers['set-cookie'];
      if (cookieHeader) {
      res.set('Set-Cookie', cookieHeader);
    }
    res.status(201).send(response.data);  
  } catch (error:any) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send({ errorMessage: "Failed to register user on authentication server" });
    }
  }
});
router.post("/login", async (req: Request, res: Response) => {
  try {
    const response = await axiosInstance.post('/login', req.body);
      const cookieHeader = response.headers['set-cookie'];
      if (cookieHeader) {
      res.set('Set-Cookie', cookieHeader);
    }
  res.status(200).send(response.data);
}
  catch(error: any){
    console.error(error)
    res.status(500).send({ message:error.response.data.message });
    }
})
router.get("/getAllUsers",verifyToken,isAdmin, async (req: Request, res: Response) => {
  try {
    const users = await db.getAllUsers();
    res.status(200).send(users)
  } catch (error) {
    console.error(error)
    res.status(500).send({message: "something error when trying to get users"})
  }
});
router.post("/specificUser",verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db.findByEmail(email);
    res.status(200).send(user);
  }
  catch (error) {
    console.error(error)
    res.status(500).send({message: "error when trying to get user"})
  }
})

router.put("/updateUser/:email",verifyToken, async(req: Request, res: Response) => {
  try {
    let email = req.params.email;
    if (typeof email === 'string') {
      email = purify.sanitize(email) 
    }
    const { error } = updateUserValidator.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
     
    const updatedUser = await db.findAndUpdateByEmail(email, req.body);
  
    if (!updatedUser) return res.status(404).send("something went wrong with the updating");
    // if (typeof isAdmin === 'boolean') {
    //   return res.status(403).send({message: "you are not allowed to change the isAdmin field"})
    // }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error)
    res.status(500).send({ errorMessage: "update fail" })
  }
});


router.delete("/:email", verifyToken,async (req: Request, res: Response) => {
  try {
    const email = purify.sanitize(req.params.email)
    const user = await db.deleteUser(email)
    if (!user) return res.status(400).send("the user with the given email was not found");
    res.status(200).send("deleting user successfully")
  } catch (error) {
      console.error(error)
    res.status(500).send("something went wrong when deleting")
  }
});


export default router;
