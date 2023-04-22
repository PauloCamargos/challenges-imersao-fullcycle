package dto

import "github.com/PauloCamargos/challenges-imersao-fullcycle/go-hexagonal/application"

type DTOProduct struct {
	ID     string  `json:"id"`
	Name   string  `json:"name"`
	Price  float64 `json:"price"`
	Status string  `json:"status"`
}

func NewAnemicProduct() *DTOProduct {
	return &DTOProduct{}
}

func (dtoProduct *DTOProduct) Bind(product *application.Product) (*application.Product, error) {
	if dtoProduct.ID != "" {
		product.ID = dtoProduct.ID
	}
	product.Name = dtoProduct.Name
	product.Price = dtoProduct.Price
	product.Status = dtoProduct.Status

	_, err := product.IsValid()
	if err != nil {
		return &application.Product{}, err
	}

	return product, nil

}
