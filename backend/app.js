import express from 'express'
const app = express();
import 'dotenv/config'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import cors from 'cors'

const port = process.env.PORT || 5000

connectDB().catch((e)=>console.log("Error in Connection", e));



app.use(cors());
app.use(bodyParser.json());
app.use(productRoutes);
app.use(categoryRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

