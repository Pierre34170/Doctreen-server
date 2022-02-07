# Doctreen-server
Test technique

Technologies utilisées : NodeJs / Typescript, PostgreSQL, Sequelize.

Etapes de lancement : 

- clone le projet.
- se placer à l'interieur du projet.
- lancer la commande "docker-compose up" : celle ci va lancer la bd, la remplir, puis lancer le server sur le port 80.
- Pour arrêter le container : docker-compose down.

.env : 

DEV_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/db

PORT=80

NODE_ENV=development

JWT_SECRET=1DrG8fHcmNvPaP8iY6RMppYzhTlhj7TKUXbWTgZ1J5lpezbv1nz0yKYvRxCTKYhNzGB4hKEPQPdjs2LB11aiY11B9sF6kkyaqp0npuYVo8lY4YC2zMonKzuWip6PgaXZ

APP_URL=http://localhost:3000
