import { Router } from "express";
import purify from "../utils/sanitize.js";
const router = Router();

let users = [];
router.get("/getAllUsers", (req, res) => {
  res.status(200).send(users);
});
router.post("/addUser", (req, res) => {
  const { name } = req?.body;
  const id = users.length + 1;
  users.push({ name, id });
  res.status(201).send({ message: "user added successfully" });
});
router.put("/updateUser/", (req, res) => {
  console.log(req.query);
  req.query = purify.sanitize(req.query);
  const { id, name } = req?.query;
 

  const userToUpdate = users.find((user) => user.id === parseInt(id));
  if (!userToUpdate) {
    res.status(404).send({ message: "user not found" });
  }
  userToUpdate.name = name;
  res.status(200).send({ message: "user updated successfully" });
});

router.delete("/delUser", (req, res) => {
  const { id } = req.query;

  // Validate if 'id' is provided
  if (!id) {
    return res.status(400).send({ message: "Missing 'id' parameter" });
  }
  const userId = parseInt(id);

  const deletedUserIndex = users.findIndex((user) => user.id === userId);
  if (deletedUserIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }
  users.splice(deletedUserIndex, 1);

  res.status(200).send({ message: "User deleted successfully" });
});


export default router;
