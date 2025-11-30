export const API_BASE_URL = {
    development: 'http://10.0.2.2:8082/api',
    prod: 'https://your-production.com/api',
}[process.env.NODE_ENV || 'dev'];