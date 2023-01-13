const { agregarPosts, obtenerPosts, eliminarPosts, modificarPostsTitulo, agregarLikePosts   } = require('./registros')
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


// modificar post

app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.query;
    try {
      await modificarPostsTitulo(id, nombre);
      res.send("nombre modificado con éxito");
    } catch (error) {
      res.status(500).send("favor corregir el error");
    }
  });



// eliminar post

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    await eliminarPosts(id);
    res.send("Post eliminado con éxito");
  });



// añadir likes


  app.put("/posts/like/:id", async (req, res) => {
    
    try {
      const { id } = req.params;
      await agregarLikePosts(id);
      res.send("like agregado con éxito");
    } catch (error) {
      res.status(500).send("favor corregir el error");
    }
  });