/**
 * Корневой контроллер
 */

import {Request, Response} from 'express';
import logger from '../utils/logger';
import root from '../models/root';
import Ajv from 'ajv';

// Инициализируем json-валидатор
const ajv = new Ajv();

const getSomething = async (req: Request, res: Response) => {
    try {
        // Валидация запроса
        const validate = ajv.compile(require('../json_schemas/getSomething.json'));
        const valid = validate(req.body);
        if (!valid) {
            logger.error(validate.errors);
            res.status(500);
            res.json({err_code: 1});
            return;
        }

        // Получаем параметры запроса
        const params = req.body;

        // Получаем информацию из модели
        const some_data = await root.getSomething(params);

        // Отправляем результат
        let result = {
            some_data: some_data,
            err_code: 0
        };
        res.json(result);
        return;
    } catch (error) {
        logger.error(error);
    }

    res.status(500);
    res.json({err_code: 3});
};

export default {getSomething};