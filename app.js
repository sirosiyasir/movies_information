/* bu projenin çalışması için node_modules'i yükleyin; express , body-parser ve ejs npm'lerini indirin
daha sonra nodemon app.js komutuyla (hyper vb) nodemon'u çalıştırın. Sonra tarayıcınızda local host 3000'de açın.
nodemon app.js komutu çalışmıyorsa npx nodemon app 'i deneyin. localhost:3000/compose 'a giderek yeni günlük ekleyebilirsiniz */

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const https = require("https")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req,res) {
    /* const movieName = req.body.movieName
    const url = "https://www.omdbapi.com/?apikey=86f9dde7&t="+movieName;
      https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const movieData = JSON.parse(data)
            console.log(movieData);
        })
      }) 
    res.send("server is running") */
    res.render("home")
})

app.post("/", function(req,res) {
    const movieName = req.body.movieName
    const url = "https://www.omdbapi.com/?apikey=86f9dde7&t="+movieName;
      https.get(url, function(response) {
        console.log(response.statusCode);
        /* eğer app.post'ta değilde app.get'te yapsaydık normal bir apı alma işlemi çalışırdı ama
        post'ta aldığımız için boş bir dizi oluşturup gelen dataları önce onun içine atmalıyız daha sonra
        hepsi yüklenince "end" yöntemiyle de yansıtmalıyız*/
        let stockData = '';
        response.on("data", function(data) {
            stockData += data
        })
        response.on("end", function() {
            const moviesData = JSON.parse(stockData)
        })
      }) 
})


app.listen(process.env.PORT || 3000, function(req,res) {
    console.log("server is running on localhost:3000");
})