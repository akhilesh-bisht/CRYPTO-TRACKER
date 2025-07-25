import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
  message: {
    statusCode: 429,
    success: false,
    message: "Too many requests, please try again later.",
  },
});
