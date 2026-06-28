import mongoose from 'mongoose';

const equipeSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  logo: { type: String }, // URL vers le logo
   city: { type: String ,required:true},
  pays: { type: String,default:'RDC' },
  championnat: { type: String ,default:'linafoot'},
  status:{
    type:String,
    enum:['active','suspend','canceled','pending']
  }
}, { timestamps: true });

equipeSchema.index({ pays: 1, championnat: 1 });

// Optionnel : index textuel pour recherches full-text
equipeSchema.index({ nom: 'text', championnat: 'text' })

export const Equipe = mongoose.model('Equipe', equipeSchema);