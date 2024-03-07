<h1 align="center">
    Manga API
</h1>

<p align="center">
    A Node.js application for managing manga data with create, read, update and delete functionality. 
</p>

### Technical Stack

- **Node.js**: Runtime for JavaScript outside the browser, ideal for restful API's.
- **Express**: Minimalist Node.js web framework used to run server.
- **Jest/supertest**: Jest for JavaScript testing and Supertest for HTTP server testing.
- **Docker-compose**: Used to containerise a postgres image on any device.
- **PostgreSQL**: Open-source relational database known for reliability and advanced features. Used for test database.
- **elephant-sql**: Cloud-based PostgreSQL database for production database.

### endpoints:

'GET / 200'
'GET /mangas 200'
'GET /mangas/:id 200'
'POST /mangas 201'
'PATCH /mangas/:id 200'
'DELETE /mangas/:id 204'

### Requirements

Node version 20.5.1
Docker
Elephant SQL database URL

### Installation:

Clone the repo and install dependencies:

```
git clone https://github.com/Raphael40/Manga-API.git
cd Manga-API/server
npm install
```

Create a .env file with the following variables:

```
PORT=<your port>
DB_URL=<your elephant sql database url>
TEST_DB=<your portgres url>
```

As postgres is run through docker the url is:
postgres://<db name>:<db password>@<db location>/<container name>
e.g.: postgres://testing:asdasd@localhost:5432/testing

**Enjoy!**
