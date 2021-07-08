const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// LA BASE DE DATOS TIENE FORMATO JSON, SE "PARSEA" PARA PODER LEERLA. {encoding: 'utf-8'}
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// RENDERIZA LA VISTA 'products' Y ENVÍA EL OBJETO 'products'
		// ES DECIR, TODOS LOS PRODUCTOS
        res.render('products', { products });	
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// OBTIENE EL PARÁMETRO DE LA RUTA (:id)
		const productId = parseInt(req.params.id);

		// BUSCA UN PRODUCTO EL CUAL SU ID COINCIDA CON EL PARÁMETRO ':id'
		// EL RESULTADO ES UN OBJETO
		const productSelected = products.find((producto) => {
			return producto.id == (productId)
		});

		// RENDERIZA LA VISTA 'detail' Y ENVÍA EL OBJETO 'productSelected'
		res.render('detail', { productSelected })
	},

	// Create - Form to create
	create: (req, res) => {
		// RENDERIZA LA VISTA 'product-create-form' (FORMULARIO DE EDICIÓN DE PRODUCTO)
		res.render('product-create-form');
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// OBTIENE LOS DATOS DEL FORMULARIO (A LA HORA DE ENVIARSE)
		const productInfo = req.body;

		// AGREGA UN NUEVO OBJETO (NUEVO PRODUCTO) EN LA LISTA PRODUCTS
		// EL NUEVO OBJETO INCLUYE LOS VALORES QUE SE ENVIARON EN EL FORMULARIO
		// TAMBIÉN SE AGREGA EL 'id' E 'image'
		// EL ID DEL NUEVO PRODUCTO ES LA SUMA DE LA LONGITUD DEL ARRAY DE PRODUCTOS + 1
		// LA IMÁGEN PUEDE SER CUALQUIERA
		const newProduct = products.push({...productInfo, id: products.length + 1, image: "img-home-theater-sony.jpg"});

		// REESCRIBE LA BASE DE DATOS CON LOS NUEVOS VALORES
		// JSON.stringify CONVIERTE UN OBJETO A UN JSON.
		// JSON.stringify(valor, replacer, space) --> JSON.stringify(products, null, 2);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		// REDIRIGE HACIA LA LISTA DE TODOS LOS PRODUCTOS
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// OBTIENE EL PARÁMETRO DE LA RUTA (:id)
		const productId = parseInt(req.params.id);

		// BUSCA UN PRODUCTO EL CUAL SU ID COINCIDA CON EL PARÁMETRO ':id'
		// EL RESULTADO ES UN OBJETO
		const productToEdit = products.find((producto) => {
			return producto.id === productId;
		})

		// RENDERIZA LA VISTA 'product-edit-form' Y ENVÍA EL OBJETO 'productToEdit'
		res.render('product-edit-form', { productToEdit });
	},

	// Update - Method to update
	update: (req, res) => {
		// OBTIENE LOS DATOS DEL FORMULARIO (A LA HORA DE ENVIARSE)
		const productInfo = req.body;

		// DENTRO DEL ARRAY DE PRODUCTOS SE BUSCA ÉL ÍNDICE DEL PRODUCTO QUE SE DESEA MODIFICAR
		// PARA ELLO, LA CONDICIÓN ES QUE EL ID DEL PRODUCTO A MODIFICAR DEBE SER IGUAL AL
		// PARÁMETRO ':id' (EL PRODUCTO QUE EL USUARIO DESEA CAMBIAR)
		// EL RESULTADO ARROJA UN ÍNDICE (POSICIÓN DENTRO DEL ARRAY)
		const productIndex = products.findIndex ((producto) => {
			return producto.id === parseInt(req.params.id);
		});

		// SELECCIONA OBJETO (PRODUCTO) CON SU ÍNDICE Y SE LE ASIGNA UN NUEVO OBJETO EL CUAL
		// VA A CONTENER Y REEMPLAZAR LOS VALORES DEL PRODUCTO SELECCIONADO
		// ES DECIR:
		// ...products[productIndex] (VALORES ANTERIORES)
		// ...productInfo (VALORES NUEVOS)
		products[productIndex] = {...products[productIndex], ...productInfo};

		// REESCRIBE LA BASE DE DATOS CON LOS NUEVOS VALORES
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); // REESCRIBIMOS LA BD

		// REDIRIGE HACIA LA LISTA DE TODOS LOS PRODUCTOS
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// OBTIENE LOS DATOS DEL PRODUCTO (A LA HORA DE ENVIARSE)
		const productInfo = req.body;

		// SE BUSCA ÉL ÍNDICE DEL PRODUCTO QUE SE DESEA ELIMINAR
		// LA CONDICIÓN ES QUE EL ID DEL PRODUCTO A ELIMINAR DEBE SER IGUAL AL
		// PARÁMETRO ':id' (EL PRODUCTO QUE EL USUARIO DESEA ELIMINAR)
		// EL RESULTADO ARROJA UN ÍNDICE (POSICIÓN DENTRO DEL ARRAY)
		const productIndex = products.findIndex ((producto) => {
			return producto.id === parseInt(req.params.id);
		});

		// ELIMINA UN ELEMENTO DE UN ARRAY
		// array.splice(índice inicial, núm de elementos a eliminar)
		products.splice(productIndex, 1);

		// REESCRIBE LA BASE DE DATOS CON LOS NUEVOS VALORES (CON EL PRODUCTO ELIMINADO)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		// REDIRIGE HACIA LA LISTA DE TODOS LOS PRODUCTOS
		res.redirect('/products')
	}
};

module.exports = controller;