const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs  = require('hbs')
//dirname : src
//filename : app.js
//console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//to store our express applcation
const app = express()

// ====>define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')

// connection to the templates folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
//====>setup handlerbars engine and views location
//set a value for a given express 
app.set('view engine', 'hbs')

//seting the path
app.set('views', viewsPath)

//setting up the partials directory 
hbs.registerPartials(partialPath)

// ======>setup static directory to serve
//app.use : customize ur server
app.use(express.static(publicDirectoryPath))

//index page in the express
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pavana sri'
    })
})
// route to the about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pavana sri'
    })
})


// route to the help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: "This is the help message",
        name: 'Pavana sri'
    })
})

//getting  app.get to set up a handler for an HTTP GET request.
//  app.get('', (req, res) => {
//      //send some response to the requester
//      res.send('<h1>Weather</h1>')

//  })

//  app.get('/help', (req, res) => {
//      res.send([
//          {
//              name: 'pavana'
//          },
//          {
//              name: 'sri'
//          }
//      ])
//  })

//  app.get('/about', (req, res) => {
//      res.send('<h1>About</h1>')
//  })

 app.get('/weather', (req, res) => {
     if(!req.query.address) {
         return res.send({
             error: 'You must provide a address!!'
         })
     }

     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
         if (error) {
             return res.send({ error})
         }

         forecast(latitude, longitude, (error, forecastData) => {
             if(error) {
                 return res.send({ error })
             }

             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })

         })

     })


    //  // console.log(req.query.address)
    //  res.send({
    //      forecast: 'It is snowing',
    //      location: 'Turangi',
    //     address: req.query.address
    //  })
 })

 //json Query string
 app.get('/products', (req, res) => {
     if (!req.query.search) {
         return res.send({
             error: 'You must provide a search term'
         })
     }
     // console.log(req.query.search)
     res.send({
         products: []
     })
 })



// app.com
//app/com/help
//app/com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'Pavana sri'
    })
})

app.get('*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Pavana sri',
       errorMessage: 'Page Not found'
   })
})

// this starts up the server and listen on a specific port
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})