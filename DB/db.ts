import { AnyBulkWriteOperation } from "mongoose";
import User from "../models/user";
import connectToDatabase from "./databaseConnection";
class DB{
    static instance: DB;
    constructor() {
        if (DB.instance) {
            return DB.instance;
        }
        try {
            connectToDatabase();
            DB.instance = this;
        } catch (error) {
            
        }
    }

    async getAllUsers () {
        return await User.find({})
    }

    async findByEmail(email: string) {
        return User.find({ email: email})
    }
    async findAndUpdateByEmail(email: string, data: any) {
        return User.findOneAndUpdate(
      { email },
      data,
     { new: true })
    }

    async deleteUser(email: string) {
        return User.findOneAndDelete({ email });
    }
}

export default DB;