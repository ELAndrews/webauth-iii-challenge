const server = require("./server");

const PORT = process.env.PORT || 5001;

server.listen(PORT, (req, res) => {
  console.log(`Server is listening on port: ${PORT}`);
});
