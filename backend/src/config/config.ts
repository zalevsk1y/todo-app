  import dotenv from 'dotenv';
  dotenv.config(); 

  const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    mongoDbUriDevelopment: process.env.MONGODB_URI_DEVELOPMENT, 
    mongoDbHostProduction: process.env.MONGODB_HOST_PRODUCTION,   
    mongoDbName: process.env.MONGO_DB_NAME,
    mongoDbUsername: process.env.MONGO_USERNAME, 
    mongoDbPassword: process.env.MONGO_PASSWORD, 
    jwtSecret: getJwtSecret(), 
    get mongoUri(): string {
      let connectionUri;
      let host;
      if (process.env.NODE_ENV === "production") {
        host = this.mongoDbHostProduction;
        if (!host) {
          console.error("Missing MONGODB_HOSR_PRODUCTION environment variable for production!");
          throw new Error("Missing MONGODB_HOST_PRODUCTION environment variable. Check your environment settings.");
        }
        const username = this.mongoDbUsername;
        const password = this.mongoDbPassword;
        if (!username || !password) {
          console.error("Missing MONGO_USERNAME or MONGO_PASSWORD environment variables for production!");
          throw new Error("Missing MONGO_USERNAME or MONGO_PASSWORD environment variables. Check your .env file.");
        }
        connectionUri=`mongodb://${username}:${password}@${host}?authSource=admin`;
        console.log('Connection uri'+connectionUri)
      } else { 
        connectionUri = this.mongoDbUriDevelopment;
        if (!connectionUri) {
          console.error("Missing MONGODB_URI_DEVELOPMENT environment variable for development!");
          throw new Error("Missing MONGODB_URI_DEVELOPMENT environment variable. Check your .env file.");
        }
      }

      
      if (!connectionUri.startsWith('mongodb://')) {
          console.error("Invalid MongoDB URI format. Must start with 'mongodb://'");
          throw new Error("Invalid MongoDB URI format. Must start with 'mongodb://'");
      }

      return connectionUri;
    },
  };

  function getJwtSecret(): string {
    const jwtSecretEnv = process.env.JWT_SECRET;

    if (!jwtSecretEnv) {
      if (process.env.NODE_ENV === 'production') {
        console.error("CRITICAL: JWT_SECRET environment variable is NOT SET in production!");
        throw new Error("JWT_SECRET environment variable must be set in production for security!");
      } else {
        console.warn("JWT_SECRET environment variable is not set. Using a default development secret. DO NOT USE IN PRODUCTION!");
        return '32lktpJOPIU4BSFssfaG4SFfa44gssKufsJG6JGHF9Lcf'; 
      }
    }
    return jwtSecretEnv;
  }


  export default config;
