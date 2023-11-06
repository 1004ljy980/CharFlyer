type TypeResponse<T> = {
  data: T & { message: string };
  status: number;
};

export default TypeResponse;
