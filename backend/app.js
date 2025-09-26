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

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174", 'http://localhost:4000', 'http://localhost:3000', 'https://e-commerce-admin-b-16.netlify.app', 'https://e-commerce-client-b-16.netlify.app'], // frontend origins
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4000",
  "http://localhost:3000",
  "https://e-commerce-admin-b-16.netlify.app",
  "https://e-commerce-client-b-16.netlify.app"
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.endsWith(".netlify.app")) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set("io", io);

const port = process.env.PORT || 5000

connectDB().catch((e)=>console.log("Error in Connection", e));

// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:5174", 'http://localhost:4000', 'http://localhost:3000', 'https://e-commerce-admin-b-16.netlify.app', 'https://e-commerce-client-b-16.netlify.app'], // https://e-commerce-client-b-16.netlify.app
//   credentials: true                // allow cookies
// }));




app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    // allow any Netlify deploy preview
    if (origin.endsWith(".netlify.app")) {
      return callback(null, true);
    }

    // allow exact matches
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // block everything else
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
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

