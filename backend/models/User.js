const mongoose=require('mongoose');
const { Schema } = mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


const User=mongoose.model('user',UserSchema);

module.exports= User;//Exporting the User model to be used in other files.  This model will be used to interact with the database.  The name 'User' is used as the collection name in the MongoDB database.  The schema defined in the UserSchema will be used to define the structure of the documents in the 'User' collection.  'timestamp' will automatically be added by Mongoose as a timestamp when a new document is
