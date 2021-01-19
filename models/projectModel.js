import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const projectTemplate = new Schema({

    projectName: {
        type: String,
        required: true
    },

    projectLocation: {
        type: String,
        required: true
    },
    projectDate: {
        type: Date,
        required: true
    },
    projectTime:{
        type: String,
        required: true
    },

    projectDescription:{
        type: String,
        required: true
    },

    created_date: {
        type: Date,
        default:Date.now
    }

});

