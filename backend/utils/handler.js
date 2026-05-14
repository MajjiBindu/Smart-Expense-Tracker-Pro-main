export const success = (code, body) => {
  return {
    statusCode: code,
    message: body,
  };
};

export const error = (code, body) => {
  return {
    statusCode: code,
    message: body,
  };
};
