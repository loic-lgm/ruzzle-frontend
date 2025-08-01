export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    username: string;
  };
};

export type SignupData = {
  email: string;
  username: string;
  password: string;
  city_id: string;
};

export type SignupResponse = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  city: string;
};
