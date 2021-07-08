const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// const visitados = products.filter(producto => producto.category === "visited");

		// FILTRA LOS PRODUCTOS CON LA CATEGORÍA "VISITED" (ARRAY DE OBJETOS)
		const visitados = products.filter((producto) => {
			return producto.category === "visited";
		});

		// FILTRA LOS PRODUCTOS CON LA CATEGORÍA "IN SALE" (ARRAY DE OBJETOS)
		const inSale = products.filter((producto) => {
			return producto.category === "in-sale";
		})

		// RENDERIZA LA VISTA 'INDEX' Y ENVÍA LOS OBJETOS (visitados, inSale)
		res.render('index', {visitados, inSale});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
