// @ts-check
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message:
      status >= 500 && process.env.NODE_ENV !== "development"
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
