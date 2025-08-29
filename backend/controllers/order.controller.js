import Order from "../models/order.model.js"

export const getAllOrders = async (req, res, next)=>{
    console.log("Hello from All orders");
    
    try {
        const orders = await Order.find({});
        res.status(200).json({
            orders
        });
    } catch (error) {
        console.log(error);
        res.json({
            message:error?.message || "Could not fetch Orders"
        })
    }
}

export const getOrderById = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const order = await Order.findById(id); 
        res.status(200).json({
            order
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            message:error?.message || "Could not fetch Orders"
        })
        
    }
}

export const updateOrderById = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        const order = await Order.findByIdAndUpdate(id, body); 
        res.status(200).json({
            order
        });
    } catch (error) {
        console.log(error);
        res.json({
            message:error?.message || "Could not fetch Orders"
        })
        
    }
}

export const deleteOrderById = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const order = await Order.findByIdAndDelete(id); 
        res.status(200).json({
            order
        });
    } catch (error) {
        console.log(error);
        res.json({
            message:error?.message || "Could not fetch Orders"
        })
        
    }
}