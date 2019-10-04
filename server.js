const port = 3000;
var sql = require("mssql");
const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require("body-parser");
var test = require("./js/test.js");



var sqlConfig = {
    user: "Fred",
    password: "123",
    server: "WIN-70OAN17IPPO",
    port: 1234,
    database: "Northwind"

}

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
sql.connect(test.sqlConfig, function (req, res) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/index.html'));
    });
    app.get('/home', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/index.html'));
    });
    app.get('/stocks', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/stockView.html'));
    });
    app.get('/weather', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/weatherView.html'));
    });
    app.get('/data', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/dbView.html'));
    });
    app.get('/about', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/aboutView.html'));
    });
    app.get('/css/style.css', function (req, res) {
        res.sendFile(path.join(__dirname + '/css/style.css'));
    });

    app.get('/js/app.js', function (req, res) {
            res.sendFile(path.join(__dirname + '/js/app.js'));
        })
        .listen(port, () => {
            console.log(`server is running at ${port}`);
        });



    app.get("/customers", (req, res) => {

        var request = new sql.Request();
        request.query("select top 20 * from Customers", function (err, results) {
            //console.log(results);
            res.json(results.recordset);
        })
    })
    app.get("/employees", (req, res) => {
        var request = new sql.Request();
        request.query("select * from Employees", function (err, results) {
            //console.log(results);
            res.json(results.recordset);
        })
    })
    app.get("/products", (req, res) => {
        //let veg = req.params.vegetable;
        //res.send(`this is the page for ${veg}`);
        var request = new sql.Request();
        request.query("select * from Products", function (err, results) {
            res.json(results.recordset);
        })
    })
    app.get("/orderlist", (req, res) => {
        //let veg = req.params.vegetable;
        //res.send(`this is the page for ${veg}`);
        var request = new sql.Request();
        request.query("select * from Test", function (err, results) {
            res.json(results.recordset);
        })
    })


    app.get("/northwind", (req, res) => {
    
        var request = new sql.Request();
        request.query("select * from ProductsUse", function (err, results) {
            var someData = JSON.stringify(results.recordset);
            res.render(__dirname + "/views/dbView.html", {
                northwindData: someData
            });

        }) 
    })


    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.post('/register', function (req, res) {
        var email = req.body.email;    
        var request = new sql.Request();
        var statement = 'INSERT INTO Test(email) VALUES(@email)'
        request.input("email", email);

        request.query(statement, function (err, results) {
        })




        // What Tony taught us.
    });

    app.get("/movies", (req, res) => {
        var someData = [{
            name: 'jaws',
            length: 90
        }, {
            name: 'AD Astro',
            length: 110
        }]; //imagine from DB
        res.render(__dirname + "/views/movieList.html", {
            fullList: someData
        });
    })
    app.get("/things/:minprice", (req, res) => {
        var sqlMinPrice = req.params.minprice

        var request = new sql.Request();
        request.input("whatPrice", sql.Money, sqlMinPrice);
        request.execute("usp_ProductsCheaperThan", function (err, results) {
            var someData = JSON.stringify(results.recordsets[0]);
            res.render(__dirname + "/views/productList.html", {
                fullList: someData
            });

        }) //imagine from DB
    })
    app.get("/things/:minPrice?/:maxPrice?", (req, res) => {
        var sqlMinPrice = req.params.minPrice;
        var sqlMaxPrice = req.params.maxPrice;

        var request = new sql.Request();
        request.input("maxPrice", sql.Money, sqlMaxPrice);
        request.input("minPrice", sql.Money, sqlMinPrice);
        request.execute("usp_ProductsBetween", function (err, results) {
            var someData = JSON.stringify(results.recordset);
            res.render(__dirname + "/views/productList.html", {
                fullList: someData
            });

        }) //imagine from DB
    })
    app.get("/changeprices/:anAmount?", (req, res) => {
        var theAmount = (req.params.anAmount || 0);
        if (theAmount == 0) {
            res.send("Oops!You didn't include an amount");
        } else {
            var request = new sql.Request();
            request.input("amount", sql.Decimal, theAmount);
            request.execute("usp_AlterallPrices", function (err, results) {
                res.send("Thank you!You changed the prices by " + theAmount);

            })
        }


    })

    app.get("/why", (req, res) => {

        res.json([{
                name: 'fred',
                age: 42
            },
            {
                name: 'wilma',
                age: 38
            },
            {
                name: 'barney',
                age: 40
            }
        ]);
    })
});