const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// define path for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup hbs engine and views
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

 app.get('',(req , res) => {
   res.render('index',{
       title: ' Weather App',
       name: ' Aesha Shah '
   })
 })

app.get('/about',(req , res) => {
   res.render('about',{
       title: 'About us   ',
       name: ' Aesha Shah '
   })
 })

 
app.get('/help',(req , res) => {
    res.render('help',{
        helptext: ' This is some Helpful text',
        title:' Help',
        name :'Aesha Shah'


    })
  })

app.get('/weather',(req ,res)=> {
    if(!req.query.address){
        return res.send({
            error:'you much provide a address!'
        })
    }

geocode(req.query.address,(error,{latitude,longitute,place} = {}) => {
    if(error){
        return res.send({error})
    }
forecast(latitude,longitute,(error, forecastData)=> {
    if(error){
        return res.send({error})
    }

    res.send({
        forecast: forecastData,
        place,
        address: req.query.address
    })

})

})
   
})

app.get('/products',(req, res)=>{
    if(!req.query.search) {
    return res.send({
            error:'you much provide a search team '
        })
    }
    console.log(req.query)
    res.send({
        products:[]
 })
})
app.get('/help/*',(req, res)=> {
    res.render('404',{
        title:'404',
        name:'Aesha Shah',
        errorMessage: 'help article not found'
      })
  
})

app.get('*',(req, res)=> {
    res.render('404',{
      title:'404',
      name:'Aesha Shah',
      errorMessage: 'page not found'
    })

    
    })

app.listen(3000, () => {
    console.log('server is up on port 3000')
})