import express from 'express';
import { createProject, getProject, updateProject, deleteProject } from '../controllers/controller.js';
import {checkRole} from '../middleware/checkrole.js'

const router = express.Router();

router.route('/projects')
  .post(checkRole(['admin', 'superAdmin']), createProject)
  .get(checkRole(['client', 'admin', 'superAdmin']), getProject);

router.route('/projects/:id')
  .put(checkRole(['admin', 'superAdmin']), updateProject)
  .delete(checkRole(['superAdmin']), deleteProject);

export default router;
