const User = require("../models/User");
const bcrypt = require("bcryptjs");


// GET ALL MEMBERS
const getMembers = async (req, res) => {
  try {

    const members = await User.find()
      .select("-password");

    res.json(members);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};



// GET SINGLE MEMBER

const getMember = async(req,res)=>{

  try{

    const member = await User.findById(req.params.id)
    .select("-password");


    if(!member){

      return res.status(404).json({
        message:"Member not found"
      });

    }


    res.json(member);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};




// CREATE MEMBER

const createMember = async(req,res)=>{

try{


const {
name,
email,
phone,
role,
status,
password
}=req.body;



const existingUser = await User.findOne({
email
});


if(existingUser){

return res.status(400).json({
message:"Email already exists"
});

}



// default password

const hashedPassword = await bcrypt.hash(
password || "123456",
10
);



const member = await User.create({

name,
email,
phone,
role,
status,
password:hashedPassword

});



res.status(201).json({

message:"Member created successfully",

member:{
id:member._id,
name:member.name,
email:member.email,
phone:member.phone,
role:member.role,
status:member.status
}

});



}catch(error){

res.status(500).json({
message:error.message
});

}


};





// UPDATE MEMBER

const updateMember = async(req,res)=>{

try{


const member = await User.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

).select("-password");



if(!member){

return res.status(404).json({
message:"Member not found"
});

}


res.json(member);



}catch(error){

res.status(500).json({
message:error.message
});

}


};





// DELETE MEMBER

const deleteMember = async(req,res)=>{

try{


const member = await User.findByIdAndDelete(
req.params.id
);


if(!member){

return res.status(404).json({
message:"Member not found"
});

}


res.json({
message:"Deleted successfully"
});



}catch(error){

res.status(500).json({
message:error.message
});

}

};



module.exports={

getMembers,
getMember,
createMember,
updateMember,
deleteMember

};