const webpush=require('web-push');
const config=require('../config')

webpush.setVapidDetails('mailto: huancaancajima@gmail.com',
    config.publicKey,
    config.privateKey
)

const pushSubscription = {
    endpoint: '.....',
    keys: {
      auth: '.....',
      p256dh: '.....'
    }
  };