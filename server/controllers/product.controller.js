import Product from "../models/product.model.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const existing = await Product.findById(id);
  try {
    if (!existing) {
      res.send("product not exist");
    }
    const newData = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    res.status(400).json({
      success: false,
      message: "please enter all the field",
    });
  }

  const newProduct = Product(product);
  try {
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product Created Successfully!",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error : ${error.message}`,
    });
  }
};

