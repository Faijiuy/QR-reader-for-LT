const request = require('request')
require('dotenv').config()

export default (req, res) => {
    // res.status(200).json({ name: 'John Doe' })
    console.log(req.body)

    // handle LINE BOT webhook verification
    // The verification message does not contain any event, so length is zero.
    if( req.body.events.length === 0) {
        // res.status(200).json({})
        reply("Hello, World")   // can reply anything
        return
    }
    
    let event = req.body.events[0];
    let reply_token = event.replyToken
    if (event.source.type === 'user') {
        console.log('User:', event.source.userId)
    }

    if (event.message.type === 'text') {
        let msg = event.message.text.trim()
        if (msg === 'ยอดขาย') {
            reply(reply_token,"What did you say?")
        } else {
            // echo
            reply(reply_token,msg)
        }

    }
}

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + process.env.CHANNEL_ACCESS_TOKEN + '}'
    }

    console.log('msg:', msg)
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}