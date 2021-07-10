import { useEffect, useState } from 'react';
import fs, { read } from 'fs'

import axios from 'axios';
import jsQR from 'jsqr'

const request = require('request')
require('dotenv').config()

// const redis = require('redis')
// const client = redis.createClient();

// client.on("error", function(error) {s
//   console.error(error);
// });


// client.set("key", "value", redis.print);
// client.get("key", redis.print);
let count = 0

const cal_state = []

let calState = false
// 

const line = require('@line/bot-sdk');

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

    let arr = []
    let path = './public/img/QR-Code.png'


    let id = event.source.userId


    if (event.message.type !== 'text') {

        const client = new line.Client({
            channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
        });

        client.getMessageContent(event.message.id)
            .then((stream) => {
                stream.on('data', (chunk) => {
                    console.log(chunk)
                    // let size = Buffer.byteLength(chunk)
                    // stream.push(chunk)
                    arr.push(chunk)
                    // stream.read(size)
                    // fs.writeFile('/public/img/logo.png', chunk, function (err) {
                    //     if (err) throw err
                    //     console.log('File saved.')
                    // })
                    // let imageDataY = new Uint8ClampedArray(arr);
                    // console.log('imageDataY', imageDataY)
                    // const code = jsQR(arr, 200, 200)
                    // if (code) {
                    //     console.log("Found QR code", code);
                    //     console.log("Result", code.data);
                    // } else {
                    //     console.log("Do not detect code.")
                    // }
                });

                stream.on('error', (err) => {
                    console.log("Error", err)
                });

                stream.on('end', function () {

                    //fs.writeFile('logo.png', imagedata, 'binary', function(err){

                    var buffer = Buffer.concat(arr)
                    fs.writeFileSync(path, buffer, function (err) {
                        if (err) throw err
                        console.log('File saved.')
                    })
                })

                stream.on('end', function() {
                    readPic()
                })
            });

        reply(reply_token, event.message.type)


    } else {
        postToDialogflow(req)
    }

}

function readPic() {
    const image = new Image;
    // // image.src = url
    // // image.crossOrigin = "Anonymous";
    image.src = './public/img/QR-Code.png'
    if (image.width > image.height) {
        setWidth(600)
        setHeight(400)
    } else if (image.width < image.height) {
        setWidth(450)
        setHeight(600)
    }

    // const canvas = document.getElementById("canvas"); //Able to show picture on webpage
    // const canvas = document.createElement('canvas'); //Do not show picture on page
    const canvas = new OffscreenCanvas(image.width, image.height);
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d');

    let imageDataT = new Uint8ClampedArray()

    image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        // console.log('width:', image.width)
        // console.log('height:', image.height)
        imageDataT = ctx.getImageData(0, 0, image.width, image.height);
        console.log(imageDataT);
        const code = jsQR(imageDataT.data, image.width, image.height, 'dontInvert')
        if (code) {
            setQRdata(code.data)
            console.log("Found QR code", code);
            console.log("Result", code.data);
        } else {
            console.log("Do not detect QR-code.")
        }
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
