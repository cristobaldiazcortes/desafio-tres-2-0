const { agregarPosts, obtenerPosts } = require('./registros')
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.listen(3000, console.log("SERVIDOR ENCENDIDO"))

app.use(express.static('public'))
app.get('/', (res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/posts", async (req, res) => {
const posts = await obtenerPosts()
res.json(posts)
})



app.post("/posts", async (req, res) => {
    const { titulo, url, descripcion, likes } = req.body
    //posts.push(post)
    await agregarPosts(titulo, url, descripcion, likes)
    res.send("Post agregado con éxito")
    })


