import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
console.log('PORT API', PORT);
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const NEXT_BASE_URL = process.env.NEXT_BASE_URL;
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
export const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
export const MIDTRANS_PUBLIC_CLIENT = process.env.MIDTRANS_PUBLIC_CLIENT
export const MIDTRANS_SECRET = process.env.MIDTRANS_SECRET
