// src/utils/api.ts
import { IFormInput } from "@/app/(auth)/register/page";
import axios from "axios";
import {  EntryData } from "../interfaces/interfaces";
import { FilterOption } from "@/types/types";

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

export const fetchEntriesName = async (userId: string) => {
  return request("GET", `/my-books/entries-name/${userId}`);  
}


export const fetchEntriesDataByQuery = async (
  userId: string,
  query: {
    entryId?: string;
    search?: string;
    filter?: FilterOption;
    fromDate?: string;
    toDate?: string;
  }
) => {
  console.log(query,"query")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryString = new URLSearchParams(query as any).toString();
  return request("GET", `/my-books/entries/${userId}?${queryString}`);
};



export const addEntryDataById = async (
  userId: string,
  entryId: string,
  entryData: EntryData
) => {
  return request(
    "POST",
    `/my-books/entries/add-entryData/${userId}?entryId=${entryId}`, // query param style
    { ...entryData }
  );
};


export const deleteEntryData = async (entryDataId: string,  entryId: string, userId: string) => {

  return request("DELETE", `/my-books/entries/delete-entryData/${userId}?entryId=${entryId}&entryDataId=${entryDataId}`);
};
export const updateEntryData = async (entryDataId: string,  entryId: string, userId: string ,data:EntryData) => {

  return request("PATCH", `/my-books/entries/update-entryData/${userId}?entryId=${entryId}&entryDataId=${entryDataId}`,{...data});
};



export const addEntry = async (entryName: string, userId: string) => {
  return request("POST", "/my-books/add", { entryName, userId });   
}
export const updateEntry = async (id: string, entryName: string) => {
  return request("PATCH", `/my-books/entries-name/update/${id}`, { entryName });
}

export const deleteEntry = async (id: string) => {
  return request("DELETE", `/my-books/entries-name/delete/${id}`);
}

export const updatePerDaySalary = async (userId: string, entryId: string,  perDaySalary: number) => {
  return request("PATCH", `/my-books/entries/update-per-day-salary/${userId}?entryId=${entryId}`, { perDaySalary });
};


// user related api requests
export const updateUserName = async (userId: string, name: string) => {
  return request("PATCH", `/user/update-name/${userId}`, { userNewName: name });
}
export const passwordChange = async (userId: string, oldPassword: string, newPassword: string) => {
  return request("PATCH", `/user/update-password/${userId}`, { oldPassword, newPassword });
}
export const deleteUserAccount = async (userId: string, password: string) => {
  return request("DELETE", `/user/delete-account/${userId}`, { password });
}