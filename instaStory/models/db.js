const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/insta', {useNewUrlParser: true ,  useUnifiedTopology: true })
.then((result) => console.log('connected to MongoDb'),
(err) => console.log(err)
)


require('./stories')
require('./user')