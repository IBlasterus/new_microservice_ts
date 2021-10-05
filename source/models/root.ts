/**
 * Корневая модель
 */

// Импорт интерфейсов
import {GetSomethingParams} from '../interfaces/something';

/**
 * Получить информацию о чём-то
 *
 * @param {GetSomethingParams} params параметры запроса
 * @returns {string} Результат
 */
const getSomething = async (params: GetSomethingParams): Promise<string> => {
    return 'Some data: ' + JSON.stringify(params);
};

export default {getSomething};