import React from 'react';

export interface FormProps {
  setActiveTab: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
  activeTab: 'login' | 'signup';
}

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
  username: string,
  password: string;
  city_id: string
};

export type SignupResponse = {
    id: number;
    username: string;
    first_name: string,
    last_name: string,
    image: string,
    city: string
};

// TODO Creer un type user pour SignupResponse