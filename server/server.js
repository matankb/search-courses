const path = require("path");
bodyParser = require('body-parser');
const  express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get("/courseslist", (req, res) => {
    const dummyCourses = ["Learn react", "Python for begginners", "Angular.js"];
    res.send(dummyCourses);
});

//Always send index.html regardless of the route.
app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});