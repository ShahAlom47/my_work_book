export interface UserData {
  email: string;
  name: string;
  password: string;
  role?: string;
  image?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Entry {
  _id: string;
  title: string;
  entryData: []
  createdAt?: string;  // optional
  updatedAt?: string;  // optional
}

export interface EntryData {
entryId: string;
date: string;
amount: number;
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