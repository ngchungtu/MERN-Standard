import CartModel from "../models/CartModel.js"

export const postProduct = async (req, res) => {
    try {
        const cartBody = req.body
        if (cartBody) {
            const setDataCart = await CartModel(cartBody);
            setDataCart.save();
            res.status(200).json(setDataCart);
        } else {
            res.status(404).json({ message: 'Cart not Product' })
        }
    } catch (error) {
        res.status(500).json({ message: "Cannot set Cart to DB" });
    }
}

export const getProducts = async (req, res) => {
    try {
        const lisCart = await CartModel.find()
        if (lisCart) {
            res.status(200).json(lisCart);
        } else {
            res.status(404).json({ message: 'Cart not found list Product' })
        }
    } catch (error) {
        res.status(500).json({ message: "Error to get List Product" })
    }
}

export const getProductById = async (req, res) => {
    const productId = req.params.id
    try {
        if (!productId || productId === null) {
            res.status(404).json({ message: "Cannot find Product" })
        }
        const product = await CartModel.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: `Cannot get Product Id: ${productId}` })
    }
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        if (!productId || productId === null) {
            res.status(404).json({ message: "Cannot find Product" })
        }
        const productToDelete = await CartModel.findByIdAndDelete(productId)
        res.status(200).json({ message: `Product Deleted: ${productToDelete}` })
    } catch (error) {
        res.status(500).json({ message: "Error to Delete Product" })
    }
}

export const updateProduct = async (req, res) => {
    const productIdToUpdate = req.params.id
    const {productId, productName, productPrice, brand, type} = req.body
    const product = {productIdToUpdate, productId, productName, productPrice, brand, type}
    try {
        const productToUpdate = await CartModel.findByIdAndUpdate(productIdToUpdate, product, {new: true})
        res.status(200).json(productToUpdate)
    } catch (error) {
        res.status(500).json({ message: "Error to Update Product" })
    }
}