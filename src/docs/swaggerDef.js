const {version} = require('../../package.json');
const config = require('../config/config');
const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: "API Documentation for 'HCMUT-SSPS'",
        version,
        description:
            'This is the API documentation for the HCMUT-SSPS project',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
 
module.exports = swaggerDef;