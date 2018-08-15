const express = require('express');
const app = express();
const path = require('path');

// app.set(express.static('build/index.html'))
app.use(express.static(path.resolve(__dirname, 'build')));

// app.get('/', (req, res) => {
//     res.sendfile('./build/index.html')

// })
app.listen(process.env.PORT || 3000, () => {
    console.log('Connection ')
})