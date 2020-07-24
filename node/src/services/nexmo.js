const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'aab1e91b',
  apiSecret: 'J0zVJaI8qnwtPoK1',
  applicationId: 'dabb6685-9b06-4169-a084-8b59a0468de3'  
})

//const from = 'Vonage APIs';
//const to = '51989743471';
//const text = 'Hello from Vonage SMS API';

function sendMessage(emisor, receptor, mensaje){
    emisor='Vonage APIs';
    
    nexmo.message.sendSms(emisor, receptor, mensaje, (err, responseData) => {
      if (err) {
          console.log(err);
      } else {
          if(responseData.messages[0]['status'] === "0") {
              console.log("Mensaje enviado satisfactoriamente.");
          } else {
              console.log(`Mensaje enviado con error: ${responseData.messages[0]['error-text']}`);
          }
      }
  })
}

module.exports={
    sendMessage
}