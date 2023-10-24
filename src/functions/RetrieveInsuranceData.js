const { app } = require('@azure/functions');
const { response } = require('express');

// This code gave me an error: 
// "Worker was unable to load entry point "src/functions/RetrieveInsuranceData.js": cors is not a function"

/*
const { cors } = require('cors');

app.use(cors({
    origin: '*'
}));
*/

app.http('HelloWorld', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});

app.http('TestData', {
    methods: ['GET','POST'],
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

app.http('RetrieveInsuranceData', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        try {
            const { 
                age,
            height_ft,
            height_in,
            height_cm,
            weight_lb,
            weight_kg,
            pressure_sys,
            pressure_dia,
            history_f1,
            history_f2,
            history_f3    
            } = await request.json();


            function agePoints(age) {
                var x = 0;
            
                if (age < 30)
                {
                    return (x = 0);
                }
                else if (age < 45)
                {
                    return (x = 10);
                }
                else if (age < 60)
                {
                    return (x = 20);
                }
                else
                {
                    return (x = 30);
                }
            }
            
            function BMIPoints(height_cm, height_ft, height_in, weight_kg, weight_lb) {
                var meters = 0
                var x = 0
            
                if (height_ft > 0)
                {
                    meters = (((height_ft * 12) + height_in) * 2.54) / 100
                } else {
                    meters = height_cm / 100
                }
            
                if (weight_lb > 0)
                {
                    weight_kg = weight_lb * 0.453592;
                }
            
                var bmi = weight_kg / Math.pow(meters, 2);
            
                if (bmi <= 24.9) {
                    return (x = 0);
                } else if (bmi <= 29.9) {
                    return (x = 30);
                } else {
                    return (x = 75);
                }
            }
            
            function BPPoints(pressure_sys, pressure_dia) {
                x = 0
            
                if (pressure_sys < 120 && pressure_dia < 80)
                    {
                        return (x = 0);
                    }
                    else if (pressure_sys < 130 && pressure_dia < 80)
                    {
                        return (x = 15);
                    }
                    else if (pressure_sys < 140 || pressure_dia < 90)
                    {
                        return (x = 30);
                    }
                    else if (pressure_sys < 180 || pressure_dia < 119)
                    {
                        return (x = 75);
                    }
                    else
                    {
                        return (x = 100);
                    }
            }

            var pointCounter = 0;
            var riskCategory = "uncalculated";

            pointCounter = agePoints(age) + 
                            BMIPoints(height_cm, height_ft, height_in, weight_kg, weight_lb) +
                            BPPoints(pressure_sys, pressure_dia) + 0
                            ;






            if (pointCounter > 75)
                {
                    riskCategory = "uninsurable"
                }
                else if (pointCounter > 50)
                {
                    riskCategory = "high risk"
                }
                else if (pointCounter > 20)
                {
                    riskCategory = "moderate risk"
                }
                else {
                    riskCategory = "low risk"
                }




        
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

