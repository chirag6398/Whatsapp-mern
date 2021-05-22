const express = require("express");
const app = express();
const dotenv = requir("dotenv");
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/route"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});
