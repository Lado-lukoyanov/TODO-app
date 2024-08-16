import { Card, Typography } from "antd";

import styles from "./weather-card.module.css";

type WeatherCardProps = {
  main: string;
  description: string;
  temp: number;
};

export const WeatherCard = ({ temp, main, description }: WeatherCardProps) => {
  return (
    <Card className={styles.weatherCard}>
      <div>
        <Typography.Text strong>Погода: </Typography.Text>
        <span>
          {main} ({description})
        </span>
      </div>
      <div>
        <Typography.Text strong>Температура:</Typography.Text> <span>{temp.toFixed(2)}°C</span>
      </div>
    </Card>
  );
};
