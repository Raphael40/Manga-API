echo "TEST_DB=postgres://testing:asdasd@localhost:5432/testing" > server/.env

docker compose -f docker-compose.yaml up --build --abort-on-container-exit testing_db