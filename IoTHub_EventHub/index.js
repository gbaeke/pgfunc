var pg = require('pg');
    
const config = {
                    host: process.env["host"],
                    user: process.env["user"],     
                    password: process.env["password"],
                    database: process.env["database"],
                    port: 5432,
                    ssl: true
};

var client = new pg.Client(config);
client.connect();

module.exports = async function (context, eventHubMessage) {
    
    const query = 'insert into conditions(time, device, temperature, humidity) values(NOW(),\'' + eventHubMessage.device + '\',' 
        + eventHubMessage.temperature + ',' + eventHubMessage.humidity + ');';
    context.log(query);
    client.query(query);
    context.log('insert completed successfully!');
    
};