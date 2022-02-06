const express = require("express")
const cors = require('cors')

const app = express();
app.use(cors())

app.get('/', function (req,res) {
    res.send({"Chaim": "Shwartz"})
})

app.listen(5000, function () {
    console.log("app is listening to port 5000")
})