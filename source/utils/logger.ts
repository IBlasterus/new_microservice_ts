/**
 * Логгер
 */

import settings from '../config.json';

// Инициализируем логгер
const logger = require('rufus');

// Устанавливаем файл лога
logger.addHandler(new logger.handlers.File(settings.log));

// Устанавливаем уровень логгирования
if (settings.debug)
    logger.setLevel(logger.DEBUG);
else
    logger.setLevel(logger.INFO);

// Экспортируем настроенный логгер
export default logger;