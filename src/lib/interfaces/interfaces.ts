import { ObjectId } from "mongodb";

export interface UserData {
  _id?: string | ObjectId;
  id?: string | ObjectId;
  email: string;
  name: string;
  password: string;
  role?: string;
  image?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Entry {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  entryName: string;
  entryData?:EntryData []
  createdAt?: string;  // optional
  updatedAt?: string;  // optional
}

export interface EntryData {
entryDataId: string;
date: string;
placeName: string;
addAmount: number;
description: string;
createdAt?: string;  // optional
updatedAt?: string;  // optional


}


export interface EntryTableProps {
  entries: Entry[];
  onTitleClick: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}