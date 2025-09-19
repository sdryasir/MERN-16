import express from 'express'
const app = express();
import 'dotenv/config'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import userRoutes from './routes/user.routes.js'
import paymentRoute from './routes/payment.routes.js'
import OrderRoutes from './routes/order.routes.js'
import CartRoutes from './routes/cart.routes.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import cors from 'cors'
import http from 'node:http'
import { Server } from "socket.io";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", 'http://localhost:4000', 'http://localhost:3000'], // frontend origins
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set("io", io);

const port = process.env.PORT || 5000

connectDB().catch((e)=>console.log("Error in Connection", e));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", 'http://localhost:4000', 'http://localhost:3000'], // your frontend
  credentials: true                // allow cookies
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(productRoutes);
app.use(categoryRoutes);
app.use(userRoutes);
app.use(paymentRoute);
app.use(OrderRoutes);
app.use(CartRoutes);



io.on("connection", (socket)=>{
  console.log("Hello", socket.id);
  
  // socket.emit('abc', {message:'Hello I am updated string'})
  // socket.emit('abcf', {message:'Hanzala'})

  // socket.on('chat', (data)=>{
  //   console.log(socket.id, "sent a message", data.chat);
  // })

})


app.set("socket", io);


server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

