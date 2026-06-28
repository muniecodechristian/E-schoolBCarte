import mongoose from "mongoose";

const stadiumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      country: { type: String, default: "RDC" },
    },
    capacity: { 
         numberPlaces:{type: Number, required: true} ,
         vip:{
            type:Number,
            required:true,
         },
         
         standard:{
            type:Number,
            required:true,
         },
         economique:{
            type:Number,
            required:true,
         },
         premium:{
            type:Number,
            required:true,
         }
    },
    stdiumadmin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // admin du stade

    description: { type: String },
    status:{
        type:String,
        enum:['active','suspend']
    }
  },
  { timestamps: true }
);

export const Stadium = mongoose.model("Stadium", stadiumSchema);