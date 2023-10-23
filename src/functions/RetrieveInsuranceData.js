const { app } = require('@azure/functions');
const { response } = require('express');

app.http('HelloWorld', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});

app.http('RetrieveInsuranceData', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        try {
        const { age } = await request.json();
        
        var object = 
        {one: "uno", dos: "two"};

        return {
            // body: `Hello, ${msg}!`
            body: JSON.stringify(age)
        };
        }
        catch (error)
        {
            console.log(error);
        }
    }
});