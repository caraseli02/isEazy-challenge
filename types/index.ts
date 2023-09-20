export interface User {
  id: string;
  avatar: string;
  name: string;
}

export interface FileInfo {
  version: string;
  size: string;
  name: string;
}
export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  text?: string;
  type: "text" | "file"
  info?: FileInfo;
}
export type AsyncState = null | "loading" | "error" | "complete";
