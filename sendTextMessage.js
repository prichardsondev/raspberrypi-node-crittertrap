require('dotenv').config();

const sendTextMessage = async (url, atticPet) => {

    let {phone, message} = buildTxtObj(atticPet);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    await client.messages 
        .create({
            body: message,
            from: '+18556438681',
            mediaUrl: [url],
            to: phone
        });
};

const buildTxtObj = (atticPet) => {

    let phone;
    let message;
    if(atticPet==='Betsie') {
        phone = process.env.PHONE1;
        message = 'Save Betsie'
    }
    else {
        phone = process.env.PHONE2;
        atticPet==='Ralph' ? message = 
            'Save Ralph' : message = 
                'Not sure what we caught baby - good luck';
    }

    return {
        phone,
        message
    }
};

exports.sendTextMessage = sendTextMessage;
