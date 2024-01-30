import { Router } from "express";
import purify from "../utils/sanitize";
const router = Router();

let users = [
  { name: "dan", id: 1 },
  { name: "ben", id: 2 },
  { name: "jim", id: 3 },
];
router.get("/getAllUsers", (req, res) => {
  res.status(200).send(users);
});
router.post("/addUser", (req, res) => {
  const { name } = req?.body;
  const id = users.length + 1;
  users.push({ name, id });
  res.status(201).send({ message: "user added successfully" });
});
router.put("/updateUser/:id", (req, res) => {
  req.query.id = purify.sanitize(req.query.id);
  const { id } = req?.params;
  const { name } = req?.body;

  const userToUpdate = users.find((user) => user.id === parseInt(id));
  if (!userToUpdate) {
    res.status(404).send({ message: "user not found" });
  }
  userToUpdate.name = name;
  res.status(200).send({ message: "user updated successfully" });
});

router.delete("/delUser", (req, res) => {
  const id = req.params;
  users = users.filter(user => user.id != parseInt(id));

  res.status(200).send({ message: "user deleted successfully" });
 
});

export default router;
