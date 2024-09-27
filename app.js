const express = require('express')
const tasks = require('./routes/tasks.js')
const {connectDB} = require('./db/connect.js')
require('dotenv').config()

const app = express();
const port = 4000;
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))


app.get('/',(request,response)=>{
    response.render('home')
})

app.get('/task/:id',(request,response) => {
    response.render("task")
})

app.use('/api/v1/tasks',tasks)


//Connect to the database and start the server
const ConnectAndStart = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connection to DB success")
        app.listen(port,()=>
            {
                console.log("Application listening on port "+ port);
            })
    }
    catch(err)
    {
        console.log(err)
    }
}

ConnectAndStart()