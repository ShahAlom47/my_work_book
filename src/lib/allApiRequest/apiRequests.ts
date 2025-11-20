
// src/utils/api.ts
import { IFormInput } from "@/app/(auth)/register/page";
import axios from "axios";
import { Entry, EntryData } from "../interfaces/interfaces";

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  
}



const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: Record<string, unknown> | FormData,
  isForm?: "formData",
  customHeaders?: Record<string, string>
): Promise<IApiResponse<T>> => {
  try {
    const headers = {
      "Content-Type": isForm === "formData" ? "multipart/form-data" : "application/json",
      ...customHeaders,
    };

    const response = await api({
      method,
      url,
      data,
      headers,
    });

    return response.data as IApiResponse<T>;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as IApiResponse<T>;
    }
    throw { success: false, message: (error as Error).message } as IApiResponse<T>;
  }
};



// Auth API requests
export const registerUser = async (data: IFormInput) => {
  return request("POST", "/auth/register", { ...data }, );
}

export const fetchEntriesName = async () => {
  return request("GET", "/my-books/entries-name");
}
export const addEntry = async (entryName: string) => {
  return request("POST", "/my-books/add", { entryName });
}
export const updateEntry = async (id: string, entryName: string) => {
  return request("PATCH", `/my-books/update/${id}`, { entryName });
}

export const deleteEntry = async (id: string) => {
  return request("DELETE", `/my-books/delete/${id}`);
}
