const path = require ('path');
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require ('colors');
const morgan = require ('morgan');
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const PORT = process.env.PORT || 5500;

dotenv.config();

// by doing this we can use everything as json
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Mongodb connected");
    })
    .catch((err) => console.log(err));



if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
    
// Linking the users & pins route to the app object
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'));

    app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

app.listen(PORT, () => {
    console.log("Backend server is running");
})
