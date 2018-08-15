const express  = require('express');
const app = express();
app.set(express.static('build/index.html'))
app.listen(process.env.PORT || 8080 ,()=>{
    console.log('Connection ')
})