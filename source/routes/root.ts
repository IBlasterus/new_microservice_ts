/**
 * Роутер для корневого маршрута
 */

import express from 'express';
import controller from '../controllers/rootController';

// Инициализируем роутер
const router = express.Router();

// Маршруты
// Получить информацию о чём-то
router.post('/getSomething', controller.getSomething);

// Экспорт роутера
export default router;