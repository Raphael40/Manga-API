TRUNCATE mangas RESTART IDENTITY;

INSERT INTO mangas (name, date_published, description)
VALUES
  ( 'Test Manga', '2024-01-01', 'Test data'),
	( 'Test Manga 2', '2024-02-02', 'Test data 2' ),
	( 'Test Manga 3', '2024-03-03', 'Test data 3');