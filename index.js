const express = require('express');
const mysql = require('mysql');

const app = express();

//Connect to Database
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'casperstack_test'
})

connection.connect((err)=>{
    if(err){
        console.log("Error: ", err)
        return
    }
    console.log("Connected to database!")
})

//GET data
app.get('/api/getData', async (req,res)=>{
    try{
        connection.query(
        `SELECT SUM(fee) sum_fee, 
        market, side, COUNT(fee) total_row, 
        MAX(time) last_group_time
        FROM casperstack_test.deal_history
        GROUP BY market, side;`,
        (err, result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            res.status(200).json(result)
        })
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})

 const PORT = process.env.PORT || 3000

 app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))


