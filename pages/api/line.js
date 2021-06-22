import { useState } from 'react';

import axios from 'axios';
import liff from '@line/liff/dist/lib';
const request = require('request')
require('dotenv').config()

// const redis = require('redis')
// const client = redis.createClient();

// client.on("error", function(error) {
//   console.error(error);
// });


// client.set("key", "value", redis.print);
// client.get("key", redis.print);
let count = 0

const cal_state = []

let calState = false
// 


export default function test(req, res) {


    // handle LINE BOT webhook verification
    // The verification message does not contain any event, so length is zero.
    if (req.body.events.length === 0) {
        res.status(200).json({})
        // console.log("hello")
        reply("Hello")   // can reply anything
        return
    }

    let event = req.body.events[0];

    let reply_token = event.replyToken


    let id = event.source.userId


    if (event.message.type !== 'text') {
        reply(reply_token, event.message.type)


    } else {
        postToDialogflow(req)
    }
}

function reply(reply_token, msg) {


    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + process.env.CHANNEL_ACCESS_TOKEN + '}'
    }

    // console.log('msg:', msg)
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    console.log("reply =============> ", body)

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        // console.log('status = ' + res.statusCode);

        // console.log("body ====> ", res.body)
    });
}

const postToDialogflow = req => {
    req.headers.host = "dialogflow.cloud.google.com"
    axios({
        url: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/e8cc963c-2816-4340-892f-f424247eb2f5",
        headers: req.headers,
        method: "post",
        data: req.body
    })
}
