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

//const eliminarPosts = async () => {

//}
module.exports = { agregarPosts, obtenerPosts };
