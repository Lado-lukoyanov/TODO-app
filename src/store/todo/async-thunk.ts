import { createAsyncThunk } from "@reduxjs/toolkit";

import { getWeatherForMoscow } from "@/api";
import { isAxiosError } from "axios";

import type { WeatherWithId } from "./types";

export const fetchWeatherForMoscow = createAsyncThunk<WeatherWithId, number, { rejectValue: string }>(
  "todo/fetchWeather",
  async (id, { rejectWithValue }) => {
    try {
      const weather = await getWeatherForMoscow();

      return { id, weather };
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);
