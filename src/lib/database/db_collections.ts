import { Collection, Db } from "mongodb";
import clientPromise from "./db_connection";
import { User } from "../interfaces/interfaces";

// Define the User type (you can extend it as needed)


export const getUserCollection = async (): Promise<Collection<User>> => {
  const client = await clientPromise;
  const db: Db = client.db("devDiary");
  return db.collection<User>("users");
};
