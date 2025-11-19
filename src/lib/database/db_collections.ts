import { Collection, Db } from "mongodb";
import clientPromise from "./db_connection";
import {  Entry, UserData } from "../interfaces/interfaces";

// Define the User type (you can extend it as needed)


export const getUserCollection = async (): Promise<Collection<UserData>> => {
  const client = await clientPromise;
  const db: Db = client.db("my-work-book"); // Specify your database name here
  return db.collection<UserData>("users");
};
export const getEntriesCollection = async (): Promise<Collection<Entry>> => {
  const client = await clientPromise;
  const db: Db = client.db("my-work-book"); // Specify your database name here
  return db.collection<Entry>("entries");
};
