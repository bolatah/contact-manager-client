export interface IUser {
  id?: string;
  username: string;
  email?: string;
  phone?: number;
  password: string;
}

export const defaultUser: IUser = {
  // id: "",
  username: "",
  password: "",
};

export const defaultAccessToken = "";
