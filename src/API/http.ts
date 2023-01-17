import {axios} from './axios.interceptors';
import { ISignup, ILogin } from './interfaces';



export const signup = (data: ISignup) => {
	return axios.post('/auth/signup', data);
}

export const login = (data: any) => {
	return axios.post('/auth/login', data);
}