const config = {
  env: process.env.NODE_ENV || "development",
  frontendPort: process.env.FRONTEND_PORT || 3000,
  backendPort: process.env.BACKEND_PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin@comp229groupproject.banqdm4.mongodb.net/" ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};
export default config;
