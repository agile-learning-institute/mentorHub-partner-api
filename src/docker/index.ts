import HTTP from "http";

const myServer = HTTP.createServer((req, res) => {
    res.write("Hello World");
    res.end();
    });

myServer.listen(3000, () => {
    console.log("Server is running on port 3000");
    });

myServer.close()