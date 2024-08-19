import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  projectName: process.env.PROJECT_NAME || 'Template',
  projectSlug: process.env.PROJECT_SLUG || 'template'
};
