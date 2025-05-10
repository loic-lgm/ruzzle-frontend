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
