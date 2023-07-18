require('dotenv').config();

const sendTextMessage = async (url) => {
    console.log(url);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    await client.messages
        .create({
            body: 'Test',
            from: '+18556438681',
            mediaUrl: [url],
            to: '+12076519663'
        })
        .then(message => console.log(message.sid));
};
exports.sendTextMessage = sendTextMessage;
