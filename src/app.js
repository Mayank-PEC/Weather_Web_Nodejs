const path = require("path")
const express = require("express")
const { resolveSoa } = require("dns")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,"../public"));


const app = express()
const port = process.env.PORT || 3000
// defining paths for express config
const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")


// setup handlebars engine and views location
app.set("view engine" , "hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name :"Mayank"
    })
})


app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name : "Mayank"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"help page",
        name :"Mayank"
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404page",{
        title:"404",
        errorMessage:"Help Article not found",
        name:"Mayank"
    })
})

app.get("/products",(req,res)=>{

    if(!req.query.search)
    {
       return  res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        products : []
    })
})


app.get("/weather",(req,res)=>{

    if(!req.query.address){
        return res.send({
            err:"You must provide an address"
        })
    }
      
     const location = req.query.address
     geocode(location,(err,{latitude,longitude,location} = {})=>{

      if(err){
          res.send({err});
      }
      else{
          forecast(latitude,longitude,(err,data)=>{
              if(err){
                   res.send({err});
              }
              else{
                  res.send({
                     address : location,
                     forecast:  data
                  })
                  
              }
          })
      }

     });
    // res.send({
    //    address:req.query.address
       
    // })
    
})

app.get("*",(req,res)=>{
    res.render("404page",{
        title:"404",
        errorMessage :"Page not found",
        name :"Mayank"
    })
})
 


app.listen(port,()=>{
    console.log("Server is up at port "+port);
})






















// app.get('', (req,res)=>{
//     res.send("Hello express")
// })


// app.get('/help',(req,res)=>{
//     res.send("help page")
// })

// app.get('/about',(req,res)=>{
//     res.send("about")
// })







// app.com
// app.com/about
// app.com/help