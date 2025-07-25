import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";


const MintAddressSchema = new mongoose.Schema({
    mintAddress:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }
})

export default mongoose.model("MintAddressSchema",MintAddressSchema)