import mongoose from "mongoose";

import {projectTemplate} from '../models/projectModel.js';

const Project = mongoose.model('Project', projectTemplate);

export const addNewProject = (req, res) => {
    let newProject = new Project(req.body);

    newProject.save((err, Project) => {
        if (err) {
            res.send(err);
        }
        res.json(Project);
    })
};

export const getProjects = (req, res) => {

        Project.find({},(err, Project) => {
        if (err) {
            res.send(err);
        }
        res.json(Project);
    })
};


export const getProjetcWithID = (req, res) => {

    Project.findById(req.params.ProjectId,(err, Project) => {
    if (err) {
        res.send(err);
    }
    res.json(Project);
})
};

export const updateProject = (req, res) => {

    Project.findOneAndUpdate({ _id: req.params.ProjectId}, req.body, {new: true}, (err, Project) => {
    if (err) {
        return res.send(err);
    }
    res.json(Project);
})
};

export const deleteProject = (req, res) => {

    Project.remove({ _id: req.params.ProjectId}, req.body, (err, Project) => {
    if (err) {
       return  res.send(err);
    }
    res.json({message: 'successfully deleted project'});
})
};