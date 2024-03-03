TRUNCATE mangas RESTART IDENTITY;

INSERT INTO mangas (name, author, date_published, description)
VALUES
  ( 'Test Manga', 'Test', '2024-01-01', 'Test data'),
	( 'Test Manga 2', 'Test 2', '2024-02-02', 'Test data 2' ),
	( 'Test Manga 3', 'Test 3', '2024-03-03', 'Test data 3');