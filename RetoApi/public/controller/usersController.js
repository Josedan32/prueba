const UserModel = require('../models/UsersModel');

const allUsers = async (req,res)=>{
    const User  = await UserModel.find()
    res.json({
        User
    })
}
const getOneUser = async (req,res)=>{
    const id = req.params.id
    const User  = await UserModel.findById(id)
    res.json({
        User
    })
}

const createUser = async (req,res)=>{
    const {nombre,edad,ciudadResidencia,nombreUsuario,password,rol} = req.body
    const UserCreate = await new UserModel({nombre,edad,ciudadResidencia,nombreUsuario,password,rol});
    let band = true;
    await UserCreate.save()
    res.json({
        band
    })
}

const EditUser = async (req,res)=>{
    const id = req.params.id;
    const {nombre,edad,ciudadResidencia,nombreUsuario,password,rol} = req.body
    const userEdit = await UserModel.findByIdAndUpdate(id,{nombre,edad,ciudadResidencia,nombreUsuario,password,rol});

    res.json({
        userEdit
    })
}

const DeleteUser = async (req,res)=>{
    const id = req.params.id
    const userDelete = await  UserModel.findByIdAndDelete(id);  
      
  
    res.json({
        userDelete
    })
}

module.exports = {
    allUsers,
    createUser,
    EditUser,
    DeleteUser,
    getOneUser
}