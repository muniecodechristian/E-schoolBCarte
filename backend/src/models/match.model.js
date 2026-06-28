import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipe",
      required: true,
    },

    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipe",
      required: true,
    },

    stadium: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stadium",
      required: true,
    },

    matchDate: {
      type: Date,
      required: true,
    },

    places: {
      numberPlaces: {
        type: Number,
        required: true,
      },

      vip: {
        type: Number,
        required: true,
      },

      premium: {
        type: Number,
        required: true,
      },

      standard: {
        type: Number,
        required: true,
      },

      economique: {
        type: Number,
        required: true,
      },
    },

    prices: {
      vip: {
        type: Number,
        required: true,
      },

      premium: {
        type: Number,
        required: true,
      },

      standard: {
        type: Number,
        required: true,
        
      },

      economique: {
        type: Number,
        required: true,
      },
    },

    soldTickets: {
      vip: {
        type: Number,
        default: 0,
      },

      premium: {
        type: Number,
        default: 0,
      },

      standard: {
        type: Number,
        default: 0,
    
      },

      economique: {
        type: Number,
        default: 0,
      },
    },

    isSoldout: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "active",
        "finished",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "matche",
  matchSchema
);