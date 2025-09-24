🏆 Резюме проекта: Турнирная система

📋 Описание проекта

Система для создания и управления турнирными сетками с использованием современных технологий.

🏗️ Технологический стек

NestJS - фреймворк для построения серверных приложений
Prisma - ORM для работы с базой данных
Docker - контейнеризация и оркестрация сервисов
Swagger - документация API
RabbitMQ - межсервисная коммуникация
PostgreSQL - реляционная база данных
⚡ Архитектурные решения

Микросервисная архитектура - обеспечивает независимость сервисов и возможность горизонтального масштабирования (добавление реплик при высокой нагрузке)
API Gateway - единая точка входа для всех запросов
Message Broker - асинхронная коммуникация между сервисами
🚀 Быстрый старт

Клонировать проект и настроить окружение
bash
git clone <repository>
cd duels2
cp .env.example .env
# отредактировать .env файл по примеру
Запуск всех сервисов
bash
docker-compose up -d
Проверить логи и перезапустить при необходимости
bash
docker-compose logs
# Если есть ошибки (сервисы стартовали раньше БД)
docker-compose restart tournament-service user-service
Инициализация баз данных
bash
# Для tournament-service
docker exec -it duels2-tournament-service-1 npx prisma generate
docker exec -it duels2-tournament-service-1 npx prisma db push

# Для user-service
docker exec -it duels2-user-service-1 npx prisma generate  
docker exec -it duels2-user-service-1 npx prisma db push
Проверка работы
API Gateway: http://localhost:3000
Swagger документация: http://localhost:3000/api/docs
RabbitMQ Management: http://localhost:15676 (guest/guest)
📚 Дополнительные материалы

Bruno коллекция - файл Duels2BrunoApi можно открыть в программе Bruno (аналог Postman) для тестирования API
Примечание: Запросы из папки "ping" могут не работать в текущей версии
✅ Особенности реализации

Оставлены только ключевые методы, необходимые для выполнения основных задач
Упрощенная структура для удобства восприятия и тестирования
Готовая среда для быстрого развертывания и демонстрации функциональности
Проект готов к тестированию и дальнейшему развитию! 🎯
