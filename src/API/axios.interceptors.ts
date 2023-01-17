

import Axios from 'axios';


const token = localStorage.getItem('token');

export const axios = Axios.create({
	baseURL: 'http://localhost:8000/',
});


// axios.interceptors.request.use(
// 	res => {
// 		return res.data
// 	},
// 	error => {
// 		// return readable error messages
// 		return Promise.reject(error)
// 	}
// )


// axios.interceptors.response.use(
// 	(response) => response.data,
// 	async (error) => {

// 		const originalRequest = error.config;

// 		if (error.response.status === 401 && !originalRequest._retry) {

// 			originalRequest._retry = true;

// 			const res = await axios.post('/auth/refresh', {
// 				refresh_token: localStorage.getItem('refresh_token'),
// 			});

// 			if (res.status === 201) {

// 				localStorage.setItem('token', res.data.access_token);
// 				localStorage.setItem('refresh_token', res.data.refresh_token);

// 				axios.defaults.headers['access_token'] = res.data.access_token;
// 				originalRequest.headers['access_token'] = res.data.access_token;

// 				return axios(originalRequest);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );
