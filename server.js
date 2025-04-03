const app = require("./index.js");

const host = "127.0.0.1";
const port = 8080;

app.listen(port,host,()=>{
    console.log(`Server running on ${host}:${port}`);
});