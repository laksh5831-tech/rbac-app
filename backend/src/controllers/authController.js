const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER

const register = async(req,res)=>{

try{

const {
name,
email,
password,
phone,
role
}=req.body;


const existingUser = await User.findOne({email});


if(existingUser){

return res.status(400).json({
message:"Email already exists"
});

}



const hashedPassword = await bcrypt.hash(password,10);



const user = await User.create({

name,
email,
password:hashedPassword,
phone,
role

});



res.status(201).json({

message:"Registration successful",

user:{
id:user._id,
name:user.name,
email:user.email,
phone:user.phone,
role:user.role
}

});


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// LOGIN


const login = async(req,res)=>{

try{


const {
email,
password
}=req.body;



const user = await User.findOne({email});


if(!user){

return res.status(400).json({
message:"Invalid credentials"
});

}



const match = await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({
message:"Invalid credentials"
});

}



const accessToken = jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_ACCESS_SECRET,

{
expiresIn:"15m"
}

);



const refreshToken = jwt.sign(

{
id:user._id
},

process.env.JWT_REFRESH_SECRET,

{
expiresIn:"7d"
}

);



res.json({

accessToken,

refreshToken,


user:{
id:user._id,
name:user.name,
email:user.email,
phone:user.phone,
role:user.role,
status:user.status
}


});



}catch(error){

res.status(500).json({
message:error.message
});

}

};





// PROFILE


const profile = async(req,res)=>{

try{


const user = await User
.findById(req.user.id)
.select("-password");



res.json({

user

});


}catch(error){

res.status(500).json({
message:error.message
});

}

};





// REFRESH

const refresh = async(req,res)=>{

res.json({
message:"Refresh token endpoint"
});

};




// LOGOUT

const logout = async(req,res)=>{

res.json({
message:"Logged out successfully"
});

};





module.exports = {

register,
login,
profile,
refresh,
logout

};