SELECT * FROM Users
SELECT Name, Surname, Age FROM Users

-- A��klama sat�r� yapma : CTRL + K + C
-- A��klama sat�r� silme : CTRL + K + U

-- �sim soyad, email ve aileden olma bilgisini veren sorgu.
SELECT 
	Name + ' ' + Surname AS NameSurname
	,Email
	,FromFamily AS AiledenMi
FROM Users