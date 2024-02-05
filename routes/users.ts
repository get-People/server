import { Router , Request , Response } from "express";
const router = Router();

type User = {
  name: string;
  id: number;
}
let users: User[] = [];

router.get("/getAllUsers", (req: Request, res: Response) => {
  res.status(200).send(users);
});
router.post("/addUser", (req, res) => {
  const { name } = req?.body;
  const id = users.length + 1;
  users.push({ name, id });
  res.status(201).send({ message: "user added successfully" });
});
router.put("/updateUser/", (req: Request, res: Response) => {
  const { id, name } = req?.query as { id: string, name: string };
 

  if (!id || !name) {
    return res.status(404).send({ message: "user not found" });
  }
  const userID: number = parseInt(id)
  const userToUpdate = users.find((user) => user.id === userID);
  if (!userToUpdate) {
    return res.status(404).send({ message: "user not found" });
  }
  
  userToUpdate.name = name;
  res.status(200).send({ message: "user updated successfully" });
});

router.delete("/delUser", (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send({ message: "Missing 'id' parameter" });
  }
  const userId = parseInt(id as string);
  const deletedUserIndex = users.findIndex((user) => user.id === userId);
  if (deletedUserIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }
  users.splice(deletedUserIndex, 1);

  res.status(200).send({ message: "User deleted successfully" });
});


export default router;
