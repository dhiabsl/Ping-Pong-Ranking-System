const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv');

const Elos = {
    0 : 'Unranked',
    500 : 'Bronze',
    600 : 'Silver',
    700 : 'Gold',
    800 : 'Platinium',
    900 : 'Diamons',
    1000 : 'Challenger'
}

const CheckRank = (ID, Points)=>{
    //Get previous points
    mysqlConnection.query("SELECT D_points,EloPoints FROM players where id = "+ ID, (err, rows, fields) => {
        if (!err){
            if(rows[0].D_points + Points >= 100 && rows[0].Elo !== "Challenger"){
                let newEloP = rows[0].EloPoints + 100;
                mysqlConnection.query("UPDATE players SET `Elo`="+Elos[newEloP]+", EloPoint ="+newEloP+", D_ponits ="+0+" WHERE id_client="+ID)
            }else{
                mysqlConnection.query("UPDATE players SET D_ponits ="+rows[0].D_points + Points+" WHERE id_client="+ID)
            }

        }else{
            res.send(Error);
        }
    })
}

dotenv.config({ path: './SecureInfo.env' });



router.get('/',(req,res)=>{
    res.send("Hello from The CRUD File");
})

var mysqlConnection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
});

//Connect to ajax_node_crud DB
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

//Get all Challengers
router.get('/Challengers', (req, res) => {
    mysqlConnection.query("SELECT * FROM players where Elo = 'Challenger' order by Rank,D_points", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

//Get all Diamonds
router.get('/Diamonds', (req, res) => {
    mysqlConnection.query("SELECT * FROM players where Elo = 'Diamond' order by Rank,D_points", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

//Get all Platinium
router.get('/Platiniums', (req, res) => {
    mysqlConnection.query("SELECT * FROM players where Elo = 'Platinium' order by Rank,D_points", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

//Get all Gold
router.get('/Golds', (req, res) => {
    mysqlConnection.query("SELECT * FROM players where Elo = 'Gold' order by Rank,D_points", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

//Get all Players
router.get('/RankingSystem', (req, res) => {
    mysqlConnection.query("SELECT * FROM players order by Rank,D_points", (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

router.post('/NewPlayer',(req,res)=>{
    let postData = req.body;

    let postDataArray =[postData.avatar,postData.Player_name,postData.D_points,postData.Pseudo,postData.Rank,postData.Elo,postData.EloPoints];
    console.log("Adding New Player");
        var sql = "INSERT INTO players(`Id_player`, `Avatar`, `Player_name`, `D_points`, `Pseudo`, `Rank`, `Elo`, `EloPoints`) VALUES (?)";
        mysqlConnection.query(sql,[postDataArray],function (err, result) {
          if (err) throw err;
          console.log("The new player is REGISTERED : "+postDataArray);
        });
})

router.post('/Rank',(req,res)=>{
    let postData = req.body;
    CheckRank(postData.ID, postData.Points)
})




// //Get all products
// router.get('/products', (req, res) => {
//     mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });



// //Get all orders
// router.get('/orders', (req, res) => {
//     mysqlConnection.query('SELECT * FROM cart', (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// //Get Login if possible
// router.post('/users', (req, res) => {
//         let LoginData = req.body
//         console.log(LoginData)

//         mysqlConnection.query('SELECT id_user FROM users where username=? AND password=?',[LoginData.username,LoginData.password],(err, rows, fields) => {
//             if (rows.length){
//                 res.send(rows);
//             }
//             else{
//                 res.send("Nothing")
//             }
//         })
// });

// //Add New User If does not exist
// router.post('/AddUsers', (req, res) => {
//     let UserSignData = req.body
//     //console.log(UserSignData)

//     mysqlConnection.query("INSERT INTO users(username, password) VALUES (?,?)",[UserSignData.username,UserSignData.password],(err, rows, fields) => {
//         if (!err){
//             console.log("Welcome New User : "+UserSignData.username)
//         }
//         else{
//             console.log(err);
//         }
//     })
// });

// //AddClient
// router.post('/addclient',(req,res)=>{
//     let postData = req.body;
//     let postDataArray =[postData.fullname,postData.phone];
//     //console.log(postDataArray);
//     // console.log(typeof postData.fullname +" "+ typeof postData.phone)
//     console.log("Adding a new Client");
//         var sql = "INSERT INTO clients(fullname, phone) VALUES (?)";
//         mysqlConnection.query(sql,[postDataArray],function (err, result) {
//           if (err) throw err;
//           console.log("1 records inserted : "+postDataArray);
//         });
// })

// //AddProduct
// router.post('/addproduct',(req,res)=>{
//     let postData = req.body;
//     // let Productdata = {
//     //     "Product":document.getElementById("product").value,
//     //     "ImageSource":document.getElementById("Image-Source").value,
//     //     "Price":document.getElementById("Price").value
//     // }
//     let postDataArray =[postData.Product,postData.ImageSource,postData.Price];
//     //console.log(postDataArray);
//     // console.log(typeof postData.fullname +" "+ typeof postData.phone)
//     console.log("Adding a new Product");
//         var sql = "INSERT INTO products(name_prod,source_prod, price_prod) VALUES (?)";
//         mysqlConnection.query(sql,[postDataArray],function (err, result) {
//           if (err) throw err;
//           console.log("1 records inserted : "+postDataArray);
//         });
// })

// //Delete a client
// router.delete('/deleteclient/:id', (req, res) => {
//     mysqlConnection.query('DELETE FROM clients WHERE id_client = ?;', [req.params.id], (err, rows, fields) => {
//         if (!err){
//             console.log('A client Account Deleted successfully.');
//         }
//         else
//             console.log(err);
//     })
// });

// //Delete a product
// router.delete('/deleteproduct/:id', (req, res) => {
//     mysqlConnection.query('DELETE FROM products WHERE id_prod = ?', [req.params.id], (err, rows, fields) => {
//         if (!err){
//             console.log('A Product Deleted successfully.')
//         }
//         else
//             console.log(err);
//     })
// });

// //Update a Client
// router.put('/Updateclient/:id', (req, res) => {
//     let emp = req.body;
//     var sql = "UPDATE `clients` SET `fullname`=?,`phone`=? WHERE id_client=?";
//     mysqlConnection.query(sql, [emp.fullname, emp.phone, req.params.id], (err, rows, fields) => {
//         if (!err){
//             console.log("a Client Account Record is Updated ...")
//             res.send('Updated successfully');
//         }
//         else
//             console.log(err);
//     })
// });

// //Update a Product
// router.put('/Updateproduct/:id', (req, res) => {
//     let emp = req.body;
//     var sql = "UPDATE `products` SET `name_prod`=?,`source_prod`=?,`price_prod`=? WHERE id_prod=?";
//     mysqlConnection.query(sql, [emp.name_prod, emp.source_prod, emp.price_prod, req.params.id], (err, rows, fields) => {
//         if (!err){
//             console.log("a Product is Updated ...")
//             res.send('Updated successfully');
//         }
//         else
//             console.log(err);
//     })
// });
module.exports = router;

//`INSERT INTO clients(fullname, phone) VALUES ([value-2],[value-3])`
//INSERT INTO `clients`(`id_client``fullname`, `phone`) VALUES ([value-1],[value-2],[value-3])
//UPDATE clients SET "id_client"=${clt.id},"fullname"=${clt.fullname},"phone"=${clt.phone} WHERE "id_client"=${clt.id}