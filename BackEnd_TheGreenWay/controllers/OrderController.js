const debug = console.log.bind(console);
const mysql = require('mysql');
var config = require('../config/configDB');
const connectionDB = mysql.createConnection(config.databaseOptions);

/**
 * controller user
 */

//Get Price,Quatity by ProductID From Cart: Phuc vu chuc nang tinh tien va validate so luong san pham trong cart
let addNewOrderByUser = async (req, res) => {
    // Get Email Of User
    const email = req.jwtDecoded.data.email;
    // Information of Product In Cart
    const arrayCart = req.body.cart;
    // Get More Information Of User
    const PaymentID = req.body.PaymentID;
    const ConversionID = req.body.ConversionID;
    const TotalPrice = req.body.TotalPrice;
    const ShipAddress = req.body.ShipAddress;
    const CreateDate = req.body.CreateDate;
    const QuantityPaper = req.body.QuantityPaper;
    const Cash = req.body.Cash;
    // Insert Into Orders Table
    let sql = `SELECT MAX(Orders.OrderID) AS OrderID FROM Orders`;
    let query = mysql.format(sql);
    connectionDB.query(query , async (err, result) => {
        if (err) {
            return res.status(200).json({success: false,message : err});
        }else{
            //Lay ID day vao Database cho bang Product
            const arr = await Array.apply(null,result);
            const OrderID = Number(arr[0].OrderID)+1; // Vi IDProduct là NVARCHAR
            const empty = {
                OrderID: OrderID,
                UserEmail : email,
                PaymentID: PaymentID,
                ConversionID: ConversionID,
                TotalPrice: TotalPrice,
                ShipAddress: ShipAddress,
                CreateDate: CreateDate,
                QuantityPaper: QuantityPaper,
                Cash: Cash,
            };
            // Luu vao Database
            connectionDB.query('INSERT INTO Orders SET ? ',empty, (err, result) => {
                if (err) {
                    debug(err);
                  return res.status(200).json({success: false,message : "Add New Orders is Unsuccess!"});
                }else{
                  // Insert Into OrderDetail Table
                  arrayCart.forEach(function(item, index, arrays) {
                    const emptyOrderDetail = {
                        OrderID: OrderID,
                        ProductID: item.id,
                        QuantityProduct: item.quatityBuy,
                        Price: Number(item.quatityBuy)*Number(item.price)
                    };
                    // Luu vao Database
                    connectionDB.query('INSERT INTO OrderDetail SET ? ',emptyOrderDetail, (err, result) => {
                        if (err) {
                            debug(err);
                          return res.status(200).json({success: false,message : "Add New Orders is Unsuccess!"});
                        }else{
                          // Insert Into OrderDetail Table
                        };
                    });
                  });
                  return res.status(200).json({success: true,message : "Add New Orders is Success!"});
                };
            });
        };
    });
    // Insert Into OrderDetail Table
    // Insert Into OrderStatusDetail Table với trạng thái "Đang Chờ Xử Lý"
}

module.exports = {
    addNewOrderByUser: addNewOrderByUser,
}