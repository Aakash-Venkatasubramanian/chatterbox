const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))
app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})