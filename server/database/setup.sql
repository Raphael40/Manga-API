DROP TABLE IF EXISTS manga;

CREATE TABLE manga (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    date_published DATE,
    author VARCHAR(255),
    description TEXT
);

INSERT INTO manga (name, date_published, author, description) VALUES
('Naruto', '1999-09-21', 'Masashi Kishimoto', 'Follows the journey of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.'),
('One Piece', '1997-07-22', 'Eiichiro Oda', 'Follows the adventures of Monkey D. Luffy and his pirate crew in search of the One Piece treasure, in a world filled with powerful pirates and mythical creatures.'),
('Attack on Titan', '2009-09-09', 'Hajime Isayama', 'Set in a world where humanity resides within enormous walled cities to protect themselves from the Titans, gigantic humanoid creatures. Follows the story of Eren Yeager and his friends who join the military to fight the Titans after their hometown is invaded.'),
('Death Note', '2003-12-01', 'Tsugumi Ohba', 'Follows the story of Light Yagami, a high school student who discovers a supernatural notebook that allows him to kill anyone whose name he writes in it. He begins to use it to rid the world of criminals, but his actions attract the attention of law enforcement and a mysterious detective known only as L.'),
('Dragon Ball', '1984-11-20', 'Akira Toriyama', 'Follows the adventures of Goku from his childhood through adulthood as he trains in martial arts and explores the world in search of the seven orbs known as the Dragon Balls, which summon a wish-granting dragon when gathered.'),
('My Hero Academia', '2014-07-07', 'Kohei Horikoshi', 'Set in a world where people with superpowers known as "Quirks" are the norm, follows the story of Izuku Midoriya, a Quirkless boy who dreams of becoming a hero like his idol, All Might.'),
('Tokyo Ghoul', '2011-09-08', 'Sui Ishida', 'Follows Ken Kaneki, a college student who survives an encounter with a ghoul, only to discover that he has become a half-ghoul himself. He must navigate the dangerous world of ghouls while struggling to retain his humanity.'),
('Fullmetal Alchemist', '2001-07-12', 'Hiromu Arakawa', 'Follows the story of two brothers, Edward and Alphonse Elric, who use alchemy in search of the Philosopher''s Stone to restore their bodies after a failed alchemical ritual.'),
('Demon Slayer: Kimetsu no Yaiba', '2016-02-15', 'Koyoharu Gotouge', 'Follows Tanjiro Kamado, a young boy who becomes a demon slayer after his family is slaughtered by demons and his younger sister Nezuko is turned into a demon.'),
('Bleach', '2001-08-07', 'Tite Kubo', 'Follows the adventures of Ichigo Kurosaki, a teenager with the ability to see ghosts, who becomes a Soul Reaper and defends humans from evil spirits known as Hollows.');
