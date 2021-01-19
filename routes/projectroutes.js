
import {addNewProject, getProjects, getProjetcWithID, updateProject, deleteProject} from '../controllers/projectControllers.js'

const routes = (app) => {
    app.route('/projects')
    // GET endpoint
    
    .get(getProjects)
    //POST endpoint
         .post(addNewProject);

      app.route('/projects/:ProjectId')
      // get a specific project
      .get(getProjetcWithID)

      //update a specefic project
      .put(updateProject)

      //delete a specefic project
      .delete(deleteProject)



}



export default routes;