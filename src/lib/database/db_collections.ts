import { Collection, Db } from "mongodb";
import clientPromise from "./db_connection";
import { UserData } from "@/Interfaces/userInterfaces";

// Define the User type (you can extend it as needed)


export const getUserCollection = async (): Promise<Collection<UserData>> => {
  const client = await clientPromise;
  const db: Db = client.db("MyWorkBook"); // Specify your database name here
  return db.collection<UserData>("users");
};
