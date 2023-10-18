const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.json([
    {
      id: "1",
      name: "Ibrahim Mohamed: Software",
    },
    {
      id: "2",
      name: "Mohamed Ismail: Software",
    },
    {
      id: "3",
      name: "Mahmoud Yaser: Artificial Intelligence",
    },
    {
      id: "4",
      name: "Ahmed Hassan: Artificial Intelligence",
    },
    {
      id: "5",
      name: "Maha Medhat: Artificial Intelligence",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(
    `Graduation Project node app on container is listening for requests on port ${PORT}`
  );
});
