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

GET / 200 <br />
GET /mangas 200 <br />
GET /mangas/:id 200 <br />
POST /mangas 201 <br />
PATCH /mangas/:id 200 <br />
DELETE /mangas/:id 204

### Requirements

Node version 20.5.1 <br />
Elephant SQL
Docker Desktop with Docker-Compose Postgres image <br />

### Installation and Setup:

Fork & clone the repo then install dependencies:

```
git clone https://github.com/<github username>/Manga-API.git
cd Manga-API/server
npm install
```

Create a .env file with the following variables:

```
PORT=<your port>
DB_URL=<your elephant sql database url>
```

To setup your database run:

```
npm run seed-db
```

To run project type command:

```
npm run dev
```

You can now visit the endpoints in a browser. To test create, update and delete you can run the testEndpoints.sh script by adding your BASE_URL or by using an api testing platform (postman, thunderclient...).

```
zsh testEndpoints.sh
// or
bash testEndpoints.sh
```

### Run tests:

Update the .env file:

```
TEST_DB=<your portgres url>
```

As Postgres is run through Docker-Compose the url is: <br />

```
postgres://<db name>:<db password>@<db location>/<container name> <br />

e.g. postgres://testing:asdasd@localhost:5432/testing
```

Ensure you have the Docker Daemon running.

To run tests or view coverage the following commands are available:

```
npm run test
npm run unitTests
npm run integrationTests
npm run coverage
```

**Enjoy!**
