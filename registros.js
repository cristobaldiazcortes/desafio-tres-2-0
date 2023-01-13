const { Pool } = require("pg");
const pool = new Pool({
  host: "postgresql-cristobald.alwaysdata.net",
  user: "cristobald",
  password: "postgres",
  database: "cristobald_likeme",
  port: 5432,
  allowExitOnIdle: true,
});
const obtenerFecha = async () => {
  const resultado = await pool.query("SELECT NOW()");
  console.log(resultado);
};
obtenerFecha();

const agregarPosts = async (titulo, url, descripcion, likes) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, url, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
  return result;
};

//agregarPosts("la foto", "1.jpg", "buena foto bro", 1)

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};
// obtenerPosts()

// modificar posts titulo

const modificarPostsTitulo = async (id, titulo) => {
  const consulta = "UPDATE posts SET titulo = $2 WHERE id = $1";
  const values = [id, titulo];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún viaje con este id" };
  }
};



// eliminar posts

const eliminarPosts = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result;
};


//likes 

const agregarLikePosts = async (id) => {
  const consulta =
    "UPDATE posts SET likes= COALESCE(likes,0) + 1 WHERE id=$1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result;
};

module.exports = { agregarPosts, obtenerPosts, eliminarPosts, modificarPostsTitulo, agregarLikePosts };
