import Product from '../models/product.model.js'
import mongoose from 'mongoose';

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
    // const { id } = req.params; // category id (optional)
    const { 
      categoryId,
      search,        // search term
      page = 1, 
      limit = 10, 
      sortBy = "createdAt",  // default sort field
      order = "desc",        // default sort order
      ...filters             // any other query filters
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // ---------- Build query ----------
    let query = {};

    // 1 - category filter
    if (categoryId && categoryId !== "null" && categoryId !== "undefined") {      
      query.category = new mongoose.Types.ObjectId(categoryId);
    }

    // 2 - search filter (case-insensitive on title & description)
    if (search && search.trim() !== "" && search !== "null") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // 4 - extra filters (e.g., price, brand, etc.)
    // remove reserved keys (page, limit, search, sortBy, order)
    const reserved = ["page", "limit", "search", "sortBy", "order"];
    Object.keys(filters).forEach(key => {
      if (!reserved.includes(key)) {
        query[key] = filters[key];
      }
    });

    // ---------- Sorting ----------
    const sortOrder = order === "asc" ? 1 : -1;
    const sortOption = { [sortBy]: sortOrder };

    // ---------- Fetch ----------
    const products = await Product.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort(sortOption);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      hasMore: pageNum * limitNum < total
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



