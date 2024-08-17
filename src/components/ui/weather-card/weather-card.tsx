import { Card, Typography } from "antd";

import styles from "./weather-card.module.css";

type WeatherCardProps = {
  description: string;
  temp: number;
};

export const WeatherCard = ({ temp, description }: WeatherCardProps) => {
  return (
    <Card className={styles.weatherCard}>
      <div>
        <Typography.Text strong>Погода: </Typography.Text>
        <span>{description}</span>
      </div>
      <div>
        <Typography.Text strong>Температура:</Typography.Text> <span>{temp.toFixed(0)}°C</span>
      </div>
    </Card>
  );
};
