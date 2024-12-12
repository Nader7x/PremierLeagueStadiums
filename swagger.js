import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your project',
        },
        tags: [
            {name: 'Teams', description: 'Endpoints related to teams'},
            {name: 'Stadiums', description: 'Endpoints related to stadiums'},
            {name: 'Coaches', description: 'Endpoints related to coaches'},
            {name: 'Matches', description: 'Endpoints related to matches'},
            {name: 'Players', description: 'Endpoints related to players'},
            {name: 'Admin Users', description: 'Endpoints related to admin users'},
            {name: 'Commentators', description: 'Endpoints related to commentators'},
        ],
    },
    apis: ['./routers/*.js'], // Path to the API docs
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});