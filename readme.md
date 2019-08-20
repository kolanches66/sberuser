## REST API для работы с сущностями UserEntity

Быстро запустить приложение можно через `docker-compose up`

Стек: `MongoDB + Express.js + Node.js`

#### Пример структуры данных  

```
UserEntity {
"id": 1
"name": "Ivanov"
"login": "Ivanov-ii"
}
```

#### HTTP Методы

Метод|URL|Описание
-|-|-
GET| /api/user | возвращает массив сущностей пользователей. `[<UserEntity>]`
GET| /api/user/:id | возвращает сущность пользователя `<UserEntity>`
POST| /api/user/ | создает нового пользователя и возвращает его `_id`
PUT| /api/user/:id | модифицирует пользователя.
