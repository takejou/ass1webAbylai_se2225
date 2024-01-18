package postgres

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"week4/cmd/web/models"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "Gantzl17"
	dbname   = "aitunews"
)

var db *sql.DB

func ConnectDB() *sql.DB {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}
func SelectData() []models.News {
	if db == nil {
		db = ConnectDB()
	}

	query := "SELECT * FROM news"

	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	aituNews := []models.News{}

	for rows.Next() {
		p := models.News{}
		err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.Estimation, &p.Category)
		if err != nil {
			log.Println(err)
			continue
		}
		aituNews = append(aituNews, p)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
	}

	return aituNews
}
func InsertData(news models.News) {
	if db == nil {
		db = ConnectDB()
	}
	query := "INSERT INTO news(title, content, estimation, category) VALUES ($1, $2, $3, $4)"

	stmt, err := db.Prepare(query)
	if err != nil {
		log.Fatal()
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(news.Title, news.Content, news.Estimation, news.Category)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Println("News inserted successfully.")
}
func UpdateData(news models.News, id int) {
	if db == nil {
		db = ConnectDB()
	}

	query := "UPDATE news " +
		"SET title = $2, " +
		"content = $3, " +
		"estimation = $4, " +
		"category = $5 " +
		"WHERE id = $1"

	stmt, err := db.Prepare(query)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(id, news.Title, news.Content, news.Estimation, news.Category)
	if err != nil {
		log.Fatal(err)
		return
	}
	log.Println("News updated successfully.")
}

func DeleteData(id int) {
	if db == nil {
		db = ConnectDB()
	}

	query := "DELETE FROM news WHERE id = $1"

	stmt, err := db.Prepare(query)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		log.Fatal(err)
		return
	}
	log.Println("News deleted successfully.")
}
