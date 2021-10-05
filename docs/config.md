## Описание файла конфигурации

```json
{
  "log": "/var/log/<...>.log", // Файл лога Сервиса
  "port": 32000, // Порт REST API
  "auth": { // Настройки простой авторизации в Сервисе
    "login": "somelogin", // Логин
    "password": "s0meStr0ngPa$$w0rd" // Пароль
  },
  "debug": true // Режим отладки (включает уровень debug логгера)
}
```