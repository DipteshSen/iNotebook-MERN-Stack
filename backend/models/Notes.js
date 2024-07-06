const mongoose=require('mongoose');
const { Schema } = mongoose;
const NotesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'  //This field refers to the 'user' collection.  When a document in the 'Notes' collection is created, it will automatically populate this field with the corresponding user document.  This field is used to associate each note with a specific user.  The 'ref' property specifies the name of the model that this field is referencing.  'User' is the name of the model defined in the 'User.js' file.  This ensures that the 'user
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,     
    },
    tag:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('notes',NotesSchema); //Exporting the User model to be used in other files.  This model will be used to interact with the database.  The name 'User' is used as the collection name in the MongoDB database.  The schema defined in the UserSchema will be used to define the structure of the documents in the 'User' collection.  'timestamp' will automatically be added by Mongoose as a timestamp when a new document is
