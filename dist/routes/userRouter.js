"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let users = [];
router.get("/getAllUsers", (req, res) => {
    res.status(200).send(users);
});
router.post("/addUser", (req, res) => {
    const { name } = req === null || req === void 0 ? void 0 : req.body;
    const id = users.length + 1;
    users.push({ name, id });
    res.status(201).send({ message: "user added successfully" });
});
router.put("/updateUser/", (req, res) => {
    const { id, name } = req === null || req === void 0 ? void 0 : req.query;
    if (!id || !name) {
        return res.status(404).send({ message: "user not found" });
    }
    const userID = parseInt(id);
    const userToUpdate = users.find((user) => user.id === userID);
    if (!userToUpdate) {
        return res.status(404).send({ message: "user not found" });
    }
    userToUpdate.name = name;
    res.status(200).send({ message: "user updated successfully" });
});
router.delete("/delUser", (req, res) => {
    const { id } = req.query;
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
exports.default = router;
