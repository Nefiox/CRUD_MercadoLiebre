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
		res.render('index', { visitados, inSale });
	},
	search: (req, res) => {
		// RECIBE LAS PALABRAS DE LA BÚSQUEDA
		const { keywords } = req.query;

		// FILTRA LOS PRODUCTOS DE ACUERDO A LA BÚSQUEDA
		const resultados = products.filter(({description, name}) => {
			return description.includes(keywords) || name.includes(keywords);
		});

		// RENDERIZA LA VISTA 'RESULTS' Y ENVÍA LOS OBJETOS (results, keywords)
		res.render('results', { resultados, keywords });
	},
};

module.exports = controller;