/**
 * Главный модуль микросервиса (точка входа)
 */

import express, {Express} from 'express';
import type {ErrorRequestHandler} from 'express';
import morgan from 'morgan';
import basicAuth from 'express-basic-auth';
import settings from './config.json';
import logger from './utils/logger';
import mountRoutes from './routes';

// Инициализация приложения Express
const app: Express = express();

// Логгер запросов
app.use(morgan('short', {
    stream: {
        write: str => logger.debug(str)
    }
}));

// Парсер запроса
app.use(express.urlencoded({extended: false}));

// Парсер JSON
app.use(express.json());

// CORS
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
        return res.status(200).json({});
    }
    next();
});

// Basic-авторизация
app.use(basicAuth({
    users: {[settings.auth.login]: settings.auth.password}, // Login and password
    unauthorizedResponse: null
}));

// Подключаем маршруты
mountRoutes(app);

// Перехват ошибок, чтобы не отправлять в ответах html с описанием внутренних ошибок. Всё будет в логе.
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(err);
    console.error(err);
    res.status(err.status || 500).json();
};
app.use(errorHandler);

// Запуск сервера
app.listen(settings.port, () => {
    console.log(`Server running on port ${settings.port}`);
    logger.info(`Server running on port ${settings.port}`);
});