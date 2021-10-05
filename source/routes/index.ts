/**
 * В этом модуле монтируем все маршруты приложения
 */

import {Express} from 'express';
import root from './root';

const mountRoutes = (app: Express) => {
    app.use('/', root);

    // Не существующий маршрут (ошибка 404)
    app.all('*', (req, res) => {
        res.status(404);
        res.json();
    });
}

export default mountRoutes;