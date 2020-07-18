const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'aab1e91b',
  apiSecret: 'J0zVJaI8qnwtPoK1',
});

//const from = 'Vonage APIs';
//const to = '51989743471';
//const text = 'Hello from Vonage SMS API';

function sendMessage(emisor, receptor, mensaje){
    emisor='Vonage APIs';
    nexmo.message.sendSms(emisor, receptor, mensaje);
}

module.exports={
    sendMessage
}