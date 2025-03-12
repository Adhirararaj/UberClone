const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type:String,
            required:true,
            minlength:[3,'First Name must be atleast 3 letters'],
        },
        lastname: {
            type:String,
            minlength:[3,'First Name must be atleast 3 letters'],
        }
    },
    email :{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        matches: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password :{
        type:String,
        required:true,
        select:false,
    },
    SocketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 letters'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be atleast 3 letters'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be atleast 1'],
        },
        vehicleType:{
            type:String,
            enum:['car','motorcycle', 'auto'],
            required:true
        }        
    },
    location:{
        lat:{
            type:Number,
        },
        long:{
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id},process.env.JWT_SECRET, {expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.methods.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;