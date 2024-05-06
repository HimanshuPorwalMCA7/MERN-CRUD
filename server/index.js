const express = require('express')
const cors=require('cors')
const mongoose = require('mongoose');
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name: String ,
    email: String,
    mobile: String
},{
    timestamps:true
})

//model
const userModel = mongoose.model("user",schemaData);

//read
//​http://localhost:8080/
app.get("/",async(req,res)=>{
    const data= await userModel.find({})
    res.json({success:true , data:data})
})

//create
//​http://localhost:8080/create
app.post("/create",async(req,res)=>{
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true,message:"data save successfully"})
})

//update
//​http://localhost:8080/update
app.put("/update/:id", async (req, res) => {
        const id = req.params.id;
        const updateData = req.body;
        await userModel.updateOne({ _id: id }, { $set: updateData });
        res.send({success:true,message:"data Updated successfully"})
        
});

//delete
//​http://localhost:8080/delete/662a904b8cc98cfea1944cb3
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data delete successfully"})

})

mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
    console.log("Connect to DB")
    app.listen(PORT,()=>console.log("server is running"))})
.catch((err)=>console.log(err))


