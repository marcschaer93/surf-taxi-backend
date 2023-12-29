const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Surf Taxi app listening on port ${PORT}`);
});
