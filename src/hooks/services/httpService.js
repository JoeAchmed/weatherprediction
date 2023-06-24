import axios from "axios";

// create axios instance wrapper
export const httpServiceWeather = axios.create({
  baseURL: process.env.REACT_APP_API_WEATHER,
  headers: {
    'Content-Type': 'multipart/form-data',
    "Access-Control-Allow-Origin": "*",
  }
});

export const httpServiceLocation = axios.create({
  baseURL: process.env.REACT_APP_API_LOCATION,
  params: {format: 'json'},
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_API_HOST_LOCATION,
    "Access-Control-Allow-Origin": "*",
  }
});

// add interceptor to handle errors
// httpServiceWeather.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error?.response?.status === 401) {
//       alert("Not Authorized");
//     }

//     return Promise.reject(error);
//   }
// );
