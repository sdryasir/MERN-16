import Product from '../models/product.model.js'

export const createNewProduct = async (req, res)=>{
    const data = req.body;

    const images = req.files;
  

    const mainImage = {
        public_id: images.mainImage[0].filename,
        secure_url: images.mainImage[0].path,
    };


    const galleryImages = images.galleryImages.map((imgObj)=>{
        return {
            public_id: imgObj.filename,
            secure_url: imgObj.path,
        }
    })


    

    data.mainImage = mainImage;
    data.galleryImages = galleryImages;

    data.size = JSON.parse(data.size);
    data.color = JSON.parse(data.color);

    await Product.create(data)
    
    res.json({
        message:'Create Products endpoint called',
        data:data
    });
}
export const getAllProducts = async (req, res) => {
  try {
    // page & limit from query params (defaults: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // fetch products with pagination
    const products = await Product.find({})
      .skip(skip)
      .limit(limit);

    // get total products count
    const total = await Product.countDocuments();

    res.json({
      products,
      hasMore: page * limit < total, // true if more pages available
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getProductsByCategoryId = async (req, res) => {
  try {

    const {c_id} = req.params;
   
    const products = await Product.find({category: c_id})

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getProductBySlug = async(req, res)=>{
    const {slug} = req.params;
    
    const product = await Product.find({slug});
    
    res.json({
        message:'Single product endpoint called',
        product
    });
}
export const getProductById = async(req, res)=>{
    const {id} = req.params;
    
    const product = await Product.findById(id)
    
    res.json({
        message:'Single product endpoint called',
        product
    });
}
export const updateProduct = async(req, res)=>{
    const {id} = req.params;
    const data = req.body;

    await Product.findByIdAndUpdate(id, data);

    res.json({message:'Update product endpoint called'});
}
export const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.json({message:'delete product endpoint called'});
}



