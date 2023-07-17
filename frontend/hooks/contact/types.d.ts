import { AxiosRequestConfig } from 'axios';

export interface UseSaveContactProps {
  requestConfig?: AxiosRequestConfig;
}

export interface SaveContactProps {
  data: {
    email: string;
    message: string;
  };
}
