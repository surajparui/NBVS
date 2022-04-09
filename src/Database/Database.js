const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log(`Connected Successfully`);
})
.catch((error)=>{
    console.log(error);
})
