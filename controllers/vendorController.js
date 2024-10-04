const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv=require('dotenv');
dotEnv.config();
const secretkey = process.env.WhatIsYourName;

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already Exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(200).json({ message: "Registered successfully" });
        console.log('Registered');
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error)
    }
};

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ message: "Invalid login" });
        }
        const token=jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"})
        res.status(200).json({ success: "Login Successful...", token });

        console.log(email,"This is Token",token);
    } catch (error) {
        res.status(500).json("Internal Server Error...",error);
    }
};


const getAllVendors= async(req,res)=>{
    try {

        const Vendors= await Vendor.find().populate('firm');
        res.json({Vendors});
        
    } catch (error) {
        res.status(500).json("Internal Server Error...",error);
        
    }

}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            res.status(404).json({error:"Vendor Not Found..."});
        
        }
        res.status(200).json({vendor});
    } catch (error) {
        res.status(500).json("Internal Server Error...",error);
        console.log(error);
        
    }
}

module.exports = { vendorRegister, vendorLogin,getAllVendors,getVendorById };
