import express from 'express'
const app = express();
import 'dotenv/config'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import userRoutes from './routes/user.routes.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import cors from 'cors'

const port = process.env.PORT || 5000

connectDB().catch((e)=>console.log("Error in Connection", e));



app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true                // allow cookies
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(productRoutes);
app.use(categoryRoutes);
app.use(userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

