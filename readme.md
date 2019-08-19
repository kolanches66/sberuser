## REST API для работы с сущностями UserEntity

В качестве базы данных — MongoDB. Для деплоя приложения используется Docker Compose

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
