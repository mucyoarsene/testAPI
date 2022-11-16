import mongoose from "mongoose";

const mongoConnect = () => {
    mongoose.connect('mongodb+srv://lion:Qwerty123@cluster0.tnodj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })

    mongoose.connection
    .once('open', () => console.log('Database connected successfully'))
    .on('error', (error) => {
        console.log('Error', error);
    })
}

export default mongoConnect;