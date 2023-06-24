import { httpServiceLocation, httpServiceWeather } from "./httpService";

export const weatherServices = {
  postWeather: async (payload) => {
    console.log(payload, "joss");
    const res = await httpServiceWeather.post("/predict", payload);
    return res.data;
  },
  // getWeather: ({ lat, lon, part = "hourly,daily" }) => httpServiceWeather.get(`/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${process.env.REACT_APP_WEATHER_KEY}`).then((res) => res.data),
  getLocation: () => httpServiceLocation.get("/ip/check").then((res) => res.data)
}


