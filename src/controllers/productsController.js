const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
        res.render('products', { products });
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productId = parseInt(req.params.id);
		const productSelected = products.find((producto) => {
			return producto.id == (productId)
		});

		res.render('detail', { productSelected })
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const productInfo = req.body;

		const newProduct = products.push({...productInfo, id: products.length + 1, image: "img-home-theater-sony.jpg"});

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect('/products');
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productId = parseInt(req.params.id);
		const productToEdit = products.find((producto) => {
			return producto.id === productId;
		})
		res.render('product-edit-form', { productToEdit });
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		const productInfo = req.body; // RECIBIR LA INFO DEL FORMULARIO 
		const productIndex = products.findIndex ((producto) => { // ENCONTRAR EL ÍNDICE DEL PRODUCTO QUE SE DESEA MODIFICAR, Y QUE ESE ÍNDICE DEBE SER IGUAL AL PRODUCTO DESEADO (req.params.id)
			return producto.id === parseInt(req.params.id);
		});
		products[productIndex] = {...products[productIndex], ...productInfo}; // EL PRODUCTO (OBJETO) CON EL INDEX DEL PRODUCTO ENCONTRADO VA A REEMPLAZAR SUS VALORES ANTERIORES CON LOS NUEVOS, ES DECIR, ...products[productIndex] (VALORES ANTERIORES) --> ...productInfo (VALORES NUEVOS DEL OBJETO).

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); // REESCRIBIMOS LA BD

		res.redirect('/products'); // REDIRECCIONAMOS A LISTA DE PRODUCTOS
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productInfo = req.body; // RECIBIR LA INFO DEL FORMULARIO 
		const productIndex = products.findIndex ((producto) => { // ENCONTRAR EL ÍNDICE DEL PRODUCTO QUE SE DESEA ELIMINAR Y ESE ÍNDICE DEBE SER IGUAL AL PRODUCTO DESEADO (req.params.id)
			return producto.id === parseInt(req.params.id);
		});
		products.splice(productIndex, 1); // ELIMINA ELEMENTO DE UN ARRAY PASANDOLE EL INDEX DEL PRODUCTO A ELIMINAR
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); // REESCRIBIMOS LA BD

		res.redirect('/products')

		// Do the magic
	}
};

module.exports = controller;