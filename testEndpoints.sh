BASE_URL="http://localhost:3000"

# View all mangas
echo "All mangas:" 
curl -X GET "${BASE_URL}/mangas" 
echo -e "\n"

# View manga with id of 2
echo "Manga with id of 2:"
curl -X GET "${BASE_URL}/mangas/2"
echo -e "\n"

# Create new manga
echo "Create new manga:"
curl -X POST "${BASE_URL}/mangas" -H "Content-Type: application/json" -d '{
        "name": "Baka and Test", 
        "author": "Kenji Inoue",
				"date_published": "2007-01-29",
				"description": "The students of Fumizuki Academy are rigidly divided by their test scores, and battle between classes using Summoned Beasts to win better facilities and benefits."}'
echo -e "\n"

# Update newly created manga
echo "Update existing manga"
curl -X PATCH "${BASE_URL}/mangas/11" -H "Content-Type: application/json" -d '{
        "name": "Baka and Test",
				"description": "Updated description"}'
echo -e "\n"

# Delete newly created manga
echo "Delete existing manga:"
curl -X DELETE "${BASE_URL}/mangas/11"
echo -e "\n"

echo "re-setting database"
cd server
npm run seed-db