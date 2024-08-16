type FileData = {
  name: string;
  size: number;
  type: string;
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: string | null;
  files: FileData[];
  weather: Weather | null;
  completedAt?: string;
};

export type Weather = {
  main: {
    temp: number;
  };
  weather: [
    {
      main: string;
      description: string;
    }
  ];
};
