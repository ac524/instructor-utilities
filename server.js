const express = require("express");

const path = require("path");

const app = express();
const htmlRoutes = require('/routes/htmlRoutes');

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( express.static( 'public' ));
app.use( htmlRoutes );


// Dummy route
app.get("/", (req, res) => {
  res.end("Successful connection!");
});




app.listen(PORT, () => {
  console.log("App listening on Port" + PORT);
});

