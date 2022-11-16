import express from "express";
import bodyParser from "body-parser";


const app = express();

const port = process.env.PORT || 4500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use('/api', usersRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "lets get started with TestAPIs",
        status: 200
    })
})

app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found",
        status: 404
    })
})

app.listen(port, console.log(`The server is running on this http://localhost:${port}`));
// mongoConnect();