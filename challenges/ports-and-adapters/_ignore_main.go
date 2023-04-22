package _ignore_main

import (
	"database/sql"

	dbAdapters "github.com/PauloCamargos/challenges-imersao-fullcycle/go-hexagonal/adapters/db"
	"github.com/PauloCamargos/challenges-imersao-fullcycle/go-hexagonal/application"
)

func main() {
	db, _ := sql.Open("sqlite3", "db.sqlite3")

	producDbAdapter := dbAdapters.NewProductDb(db)
	productService := application.NewProductService(producDbAdapter)
	// produceService.Create("Product Example", 30)
	product, _ := productService.Create("Product example 2", 25)

	productService.Enable(product)
}
