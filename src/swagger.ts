import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Feedback Service API',
      version: '1.0.0',
      description: 'API documentation for the Feedback Service',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
      {
        url: 'https://feedback-service-fnhf.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
