
const request = require('request')
require('dotenv').config()

// const [arr, setArr] = useState([])

// export const [cal, setCal] = useState([false])

let count = 0

let cal_state = []




export default (req, res) => {
    count += 1
    // res.status(200).json({ name: 'John Doe' })
    console.log(".................")

    console.log(req.body)

    console.log(".................")
    // console.log(res)

    // handle LINE BOT webhook verification
    // The verification message does not contain any event, so length is zero.
    if( req.body.events.length === 0) {
        res.status(200).json({})
        // console.log("hello")
        reply("Hello")   // can reply anything
        return
    }
    
    let event = req.body.events[0];

    let reply_token = event.replyToken

    // if (event.source.type === 'user') {
    //     // console.log('User:', event.source.userId)
    // }

    let id = event.source.userId

  
    if (event.message.type === 'text') {
        let msg = event.message.text.trim()
        console.log("count : ", count)
        console.log("message : "+msg)
        console.log(".................")

        console.log("cal : ",cal_state)
    
        console.log(".................")

        if(cal_state.includes(id)){
            if(msg === 'q'){
                let index = cal_state.indexOf(id)
                cal_state.splice(index, 1)
                reply(reply_token, "ลาก่อน " +event.source.userId)

            }else if(msg === 'id'){
                reply(reply_token, "id : " +cal_state)

            }else{
                // calculation function
                reply(reply_token, eval(msg))  
            }
        }else{
            if (msg === 'commands') {
                reply(reply_token, "type คำนวณ to calculate\ntype anything to echo")
            }else if(msg === 'คำนวณ'){
                cal_state.push(id)
                reply(reply_token, "สวัสดี " +event.source.userId +"\nพิม q เพื่อ ออก")            
            } else {
                // echo
                reply(reply_token, msg)
            }
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
    });
}
