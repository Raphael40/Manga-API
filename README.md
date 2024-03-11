<h1 align="center">
    Manga API
</h1>

<p align="center">
    A Node.js application for managing manga data with create, read, update and delete functionality. It has 100% test coverage and uses a docker postgres image to run tests in isolation.
</p>

### Technical Stack

- **Node.js**: Runtime for JavaScript outside the browser, ideal for restful API's.
- **Express**: Minimalist Node.js web framework used to run server.
- **Jest/supertest**: Jest for JavaScript testing and Supertest for HTTP server testing.
- **Docker-compose**: Used to containerise a postgres image on any device.
- **PostgreSQL**: Open-source relational database known for reliability and advanced features. Used for test database.
- **Elephant-sql**: Cloud-based PostgreSQL database for production database.

### Endpoints:

GET / <br />
GET /mangas <br />
GET /mangas/:id <br />
POST /mangas <br />
PATCH /mangas/:id <br />
DELETE /mangas/:id

### Requirements

Node version 20.5.1 <br />
Elephant SQL <br />
Docker Desktop (Required for testing only)

### Installation and Setup:

Fork & clone the repo then install dependencies:

```
git clone https://github.com/<github username>/Manga-API.git
cd Manga-API/server
npm install
```

Create a .env file with the following variables:

```
touch server/.env
PORT=<your port>
DB_URL=<your elephant sql database url>
```

To setup your database run:

```
cd server
npm run seed-db
```

To run project type command:

```
cd server
npm run dev
```

You can now visit the endpoints in a browser. To test create, update and delete you can run the testEndpoints.sh script by adding your BASE_URL or by using an api testing platform (postman, thunderclient...).

```
cd MANGA-API
zsh testEndpoints.sh
// or
bash testEndpoints.sh
```

### Run tests:

Update the .env file:

```
server/.env
TEST_DB=<your portgres url>
```

The tests are run with a Docker Postgres image. Use the environment variables in the docker-compose.yaml file to get your TEST_DB url: <br />

```
server/.env
postgres://<db name>:<db password>@<db location>/<container name>

e.g. postgres://testing:asdasd@localhost:5432/testing
```

Ensure you have the Docker Daemon running.

To run tests or view coverage the following commands are available:

```
cd server
npm run test
npm run unitTests
npm run integrationTests
npm run coverage
```

**Enjoy!**
