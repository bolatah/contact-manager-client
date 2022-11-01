export interface IUser {
  username: string;
  email?: string;
  phone?: number;
  password: string;
}

export const defaultUser: IUser = {
  username: "",
  email: "",
  phone: 0,
  password: "",
};

export const defaultAccessToken = "";
