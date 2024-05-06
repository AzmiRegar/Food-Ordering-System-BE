const orderModel = require('../models/index').order_list;
const detailModel = require('../models/index').order_detail;
const foodModel = require('../models/index').food;



exports.order = async (request, response) => {
    try {
        const { customer_name, table_number, order_date, order_Detail } = request.body;

        // Buat pesanan baru
        const orderList = await orderModel.create({
            customer_name,
            table_number,
            order_date
        });

        // Tambahkan detail pesanan untuk setiap item dalam order_detail
        const orderDetails = [];
        for (const item of order_Detail) {
            const { foodID, price, quantity } = item;

            const detail = await detailModel.create({
                orderID: orderList.orderID, // Gunakan ID pesanan yang baru saja dibuat
                foodID: foodID,
                price: price,
                quantity: quantity
            });
            orderDetails.push(detail);
        }

        // Kirim respons berhasil
        return response.status(201).json({
            success: true,
            Data: {
                orderID: orderList.orderID, // Gunakan ID pesanan yang baru saja dibuat
                orderList,
                order_details: orderDetails
            },
            message: "Order list has been created"
        });
    } catch (error) {
        // Tangani kesalahan
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getAllHistory = async (request, response) => {

    try {
        let history = await orderModel.findAll({
            include: [{
                model: detailModel,
                as : 'order_detail',
                include: [foodModel]
            }]
        })
        return response.json({
            success: true,
            data: history,
            messaage: `All history have been loaded`
        })
    } catch(error) {
        response.status(500).json({error: "Website mu eror cok"})
    }
} 