const express = require("express");
//const cors = require("cors");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus : 200
// };
// app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: "./uploads" });
app.post("/upload", multipartMiddleware,(req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files })
});

app.get("/downloadExcel",(req,res) =>{
  res.download("./uploads/relatorio.xls");
})

app.get("/downloadPDF",(req,res) =>{
  res.download("./uploads/relatorio.pdf");
})

app.use((err, req, res, next) => res.json({ error:err.message}))

app.listen(8095, () => {
  console.log("Server iniciado porta 8095");
})
