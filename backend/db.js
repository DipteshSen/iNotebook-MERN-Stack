const mongoose = require('mongoose');

const mongoURI='mongodb://localhost:27017/diptesh';
const connectToMongo=()=>{
    try{
     mongoose.connect(mongoURI);
    }catch(e){
        console.log(e);
    };
     
}

module.exports=connectToMongo;