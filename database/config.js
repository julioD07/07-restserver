const mongoose = require('mongoose');
require('colors');

const dbConnection = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology :true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log("Base de datos Online".green)

    } catch (error) {
        console.log(error.message.red)
        throw new Error("Error a la hora de iniciar la base de datos".red)
    }
}


module.exports = {
    dbConnection
}