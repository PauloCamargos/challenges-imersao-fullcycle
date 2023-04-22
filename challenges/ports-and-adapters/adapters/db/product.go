package db

import (
	"database/sql"

	"github.com/PauloCamargos/challenges-imersao-fullcycle/go-hexagonal/application"
	_ "github.com/mattn/go-sqlite3"
)

// ProductDb implements ProductPersistenceInterface, meaning it must have .Get() and .Save() method
type ProductDb struct {
	db *sql.DB
}

func NewProductDb(db *sql.DB) *ProductDb {
	return &ProductDb{db: db}
}

func (self *ProductDb) Get(id string) (application.ProductInterface, error) {
	var product application.Product
	stmt, err := self.db.Prepare("select id, name, price, status from products where id=?")
	if err != nil {
		return nil, err
	}
	err = stmt.QueryRow(id).Scan(&product.ID, &product.Name, &product.Price, &product.Status)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func (self *ProductDb) create(product application.ProductInterface) (application.ProductInterface, error) {
	stmt, err := self.db.Prepare(`insert into products(id, name, price, status) values (?,?,?,?)`)
	if err != nil {
		return nil, err
	}
	_, err = stmt.Exec(
		product.GetID(),
		product.GetName(),
		product.GetPrice(),
		product.GetStatus(),
	)
	if err != nil {
		return nil, err
	}
	err = stmt.Close()
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (self *ProductDb) update(product application.ProductInterface) (application.ProductInterface, error) {
	_, err := self.db.Exec(
		`update products set name = ?, price = ?, status = ? where id = ?`,
		product.GetName(),
		product.GetPrice(),
		product.GetStatus(),
		product.GetID(),
	)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (self *ProductDb) Save(product application.ProductInterface) (application.ProductInterface, error) {
	var dump int
	queryError := self.db.QueryRow(`select id from products where id = ?`, product.GetID()).Scan(dump)
	if queryError == sql.ErrNoRows {
		_, err := self.create(product)

		if err != nil {
			return nil, err
		}
	} else {
		_, err := self.update(product)
		if err != nil {
			return nil, err
		}
	}
	return product, nil
}
