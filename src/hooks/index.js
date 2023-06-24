import {
  useMutation,
  useQuery,
} from "react-query";
import { weatherServices } from "./services";

export const useWeather = (
  options
) => useMutation({
    mutationFn: (data) => weatherServices.postWeather(data),
    ...options,
  });

export const useLocationList = (options) => {
  return useQuery({
    queryKey: ["location"],
    queryFn: () => weatherServices.getLocation(),
    ...options,
  });
};