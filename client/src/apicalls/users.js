import { axiosInstance } from '.';

export const LoginUser = async ( user ) => {
  try {
    const response = await axiosInstance.post( '/users/login', user );
    return response.data;
  } catch ( error ) {
    return error.response.data;
  }
};


export const RegisterUser = async ( user ) => {
  try {
    const response = await axiosInstance.post( '/users/register', user );
    return response.data;
  } catch ( error ) {
    return error.response.data;
  }
};
