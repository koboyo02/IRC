const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://koboyo:BN4MYy2o4ekf17J3@cluster0.2xmra.mongodb.net/Cluster0?retryWrites=true&w=majority', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    },
    (err) => {
        if (!err) console.log('Mongoose Is Connected');
        else console.log('Connection error : ' + err);
    }
);
