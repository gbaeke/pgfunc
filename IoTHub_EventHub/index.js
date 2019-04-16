var pg = require('pg');
    
const config = {
                    host: 'HOST',
                    user: 'USER',     
                    password: "PASSWORD",
                    database: 'DATABASE',
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