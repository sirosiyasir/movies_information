/* bu projenin çalışması için node_modules'i yükleyin; express , body-parser ve ejs npm'lerini indirin
daha sonra nodemon app.js komutuyla (hyper vb) nodemon'u çalıştırın. Sonra tarayıcınızda local host 3000'de açın.
nodemon app.js komutu çalışmıyorsa npx nodemon app 'i deneyin. localhost:3000/compose 'a giderek yeni günlük ekleyebilirsiniz */

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const https = require("https")
// for random movies name from https://www.npmjs.com/package/random-movies
const { randomTitle } = require("random-movies")

const app = express()

let searchMovieName = ""
let searchMovieNameSecond = ""
let searchMovieId = ""

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
// public klasörümüzü dahil ediyoruz
app.use(express.static("public"))

app.get("/", function (req, res) {
  // Promise.all ve .map sayesinde tek bir apı url'sinden , birden fazla apı alabildik
  Promise.all(
    [randomTitle(), randomTitle(), randomTitle()].map((id) =>
      fetch(`https://www.omdbapi.com/?apikey=86f9dde7&t=${id}`).then((resp) =>
        resp.json()
      )
    )
  ).then((moviesAPI) => {
    moviesAPI.forEach((item, index, arr) => {
      firstMovieTitle = arr[0].Title
      firstMoviePlot = arr[0].Plot
      firstMoviePoster = arr[0].Poster
      secondMovieTitle = arr[1].Title
      secondMoviePlot = arr[1].Plot
      secondMoviePoster = arr[1].Poster
      thirdMovieTitle = arr[2].Title
      thirdMoviePlot = arr[2].Plot
      thirdMoviePoster = arr[2].Poster
    })

    res.render("home", {
      movieTitle: firstMovieTitle,
      moviePlot: firstMoviePlot,
      moviePoster: firstMoviePoster,
      secondMovieTitle: secondMovieTitle,
      secondMoviePlot: secondMoviePlot,
      secondMoviePoster: secondMoviePoster,
      thirdMovieTitle: thirdMovieTitle,
      thirdMoviePlot: thirdMoviePlot,
      thirdMoviePoster: thirdMoviePoster,
    })
  })
})

app.post("/", function (req, res) {
  const movieName = req.body.movieName
  // API url'sinde kullanmak için ve API url'sinden aldığımız video'yu eklediğim sayfada kullanmak için iki farklı değişkene kaydediyorum
  // daha sonra ikisini de sıfırlıyorum app.js/117 app.js/141
  searchMovieName += movieName
  searchMovieNameSecond += movieName
  const url = "https://www.omdbapi.com/?apikey=86f9dde7&t=" + movieName
  https.get(url, function (response) {
    /* eğer app.post'ta değilde app.get'te yapsaydık normal bir apı alma işlemi çalışırdı ama
        post'ta aldığımız için boş bir dizi oluşturup gelen dataları önce onun içine atmalıyız daha sonra
        hepsi yüklenince "end" yöntemiyle de yansıtmalıyız (yoksa console'da "unexpected end of JSON input" hatası alınıyor)*/
    let stockData = ""
    response.on("data", function (data) {
      stockData += data
    })
    response.on("end", function () {
      // JSON.parser() metoduyla data'yı açıyoruz
      const moviesData = JSON.parse(stockData)
      const movieTitle = moviesData.Title
      const moviePlot = moviesData.Plot
      const moviePoster = moviesData.Poster
      const movieImbd = moviesData.imdbRating
      const movieActors = moviesData.Actors
      const movieYear = moviesData.Year
      const movieGenre = moviesData.Genre
      const movieLanguage = moviesData.Language
      const movieAwards = moviesData.Awards
      const movieDirector = moviesData.Director
      // buradaki moviesData.Response , apı'deki "Response"dir ve True'ya eşittir. console.log(moviesData)'yaparak görüntüleyebiliriz
      if (moviesData.Response === "True") {
        res.render("movies", {
          movieTitle: movieTitle,
          moviePlot: moviePlot,
          moviePoster: moviePoster,
          movieImbd: movieImbd,
          movieActors: movieActors,
          movieYear: movieYear,
          movieGenre: movieGenre,
          movieLanguage: movieLanguage,
          movieAwards: movieAwards,
          movieDirector: movieDirector,
        })
      } else {
        res.render("failure", { movieName: movieName })
      }
    })
  })
  // film video ve film bilgileri içeren api url'leri farklı
  // önce film bilgileri içeren url'den key'i alıyoruz bu key'i video linki içeren öbür api linkine ekliyoruz
  const movieNameUrl = `https://api.themoviedb.org/3/search/movie?api_key=d145ee8a225abd97ee4c03e0579fa11f&language=en-US&query=${searchMovieName}&page=1&include_adult=false`
  https.get(movieNameUrl, function (response) {
    let stockData = ""
    response.on("data", function (data) {
      stockData += data
    })
    response.on("end", function () {
      const moviesData = JSON.parse(stockData)
      const movieId = moviesData.results[0].id
      searchMovieId += movieId
      console.log(movieId)
    })
    // birden fazla movie name olmaması için API url'sinde kullandığımız değişkeninin değerini film aratıldıktan sonra sıfırlıyoruz
    searchMovieName = ""
  })
})

app.get("/tmdb", function (req, res) {
  const apıKey = "d145ee8a225abd97ee4c03e0579fa11f"
  const url = `https://api.themoviedb.org/3/movie/${searchMovieId}/videos?api_key=${apıKey}&language=en-US`
  https.get(url, function (response) {
    let stockData = ""
    response.on("data", function (data) {
      stockData += data
    })
    response.on("end", function () {
      const moviesData = JSON.parse(stockData)
      const movieKey = moviesData.results[0].key
      res.render("tmdb", {
        movieKey: movieKey,
        searchMovieNameSecond: searchMovieNameSecond.toUpperCase(),
      })
      // birden fazla movie id olmaması için tekrar film aratılmadan önce değeri sıfırlıyoruz
      searchMovieId = ""
      // farklı bir film video istediği yapılmadan önce variable'ı sıfırlamış oluyoruz
      searchMovieNameSecond = ""
    })
  })
})

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("server is running on localhost:3000")
})
