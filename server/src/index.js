const express = require("express");
const api = require('./API');

const PORT = process.env.PORT || 3001;
const app = express();

api.mainAPI(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});