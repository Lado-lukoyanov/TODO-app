import { WEATHER_ROUTES } from "./routes";
import { weatherClient } from "./weather-client";

import type { Weather } from "@/types/types";

export const getWeatherForMoscow = async (): Promise<Weather> => {
  const { data } = await weatherClient.get<Weather>(WEATHER_ROUTES.data, {
    params: { q: "Moscow", APPID: import.meta.env.VITE_API_KEY, units: "metric", lang: "ru" },
  });

  return data;
};
