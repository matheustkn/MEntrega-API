declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            MONGODB_URI: string;
            JWT_SECRET: string;
            JWT_EXPIRES_IN: string;
            JWT_COOKIE_EXPIRES_IN: string;
            EMAIL_USERNAME: string;
            EMAIL_PASSWORD: string;
            EMAIL_HOST: string;
            EMAIL_PORT: string;
            EMAIL_FROM: string;
            EMAIL_TO: string;
            EMAIL_SUBJECT: string;
        }
    }
}