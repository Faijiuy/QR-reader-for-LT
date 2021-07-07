
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import jsQR from 'jsqr'
import { useEffect, useState } from 'react'

export default function Home() {

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [qrData, setQRdata] = useState('')


  useEffect(() => {

    //Option 1: Work only on pure QR-code (@nuintun/qrcode)
    // const qrcode = new Decoder();

    // qrcode
    //   .scan('./img/Test_QR_Coupon.png')
    //   .then(result => {
    //     console.log(result.data);
    //   })
    //   .catch(error => {
    //     console.error(result.data);
    //   });

    //Option 2: Work only on pure QR-code picture (jsqr)

    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext('2d');
    // const width = 100;
    // const height = 100;

    // const image = new Image;
    // var imageDataT = new Uint8ClampedArray()
    // image.src = './img/Test_QR_Coupon.png'
    // image.onload = () => {
    //   ctx.drawImage(image, 0, 0, width, height);
    //   imageDataT = ctx.getImageData(0, 0, 100, 100);
    //   console.log(imageDataT);
    //   const code = jsQR(imageDataT.data, 100, 100, 'dontInvert')
    //   console.log('Code:', code)
    //   if (code) {
    //     setQRdata(code.data)
    //     console.log("Found QR code", code);
    //   } else {
    //     console.log("Do not detect code.")
    //   }
    // }

    //Option 3: Work for picture of paper with QR-code (jsqr)
    //But, not on pure QR-code picture.
    // var url = 'https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.6435-9/181720070_337312094402402_2434758660344882908_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_ohc=zBQCX0ZOjeEAX8vqC21&_nc_ht=scontent.fbkk6-1.fna&oh=31af8b43501175f7a25caad56b536c83&oe=60E88C9F'

    // const image = new Image;
    // // image.src = url
    // // image.crossOrigin = "Anonymous";
    // image.src = './img/Coupon_with_Hash.png'
    // if (image.width > image.height) {
    //   setWidth(600)
    //   setHeight(400)
    // } else if (image.width < image.height) {
    //   setWidth(450)
    //   setHeight(600)
    // }

    // const canvas = document.getElementById("canvas"); //Able to show picture on webpage
    // // const canvas = document.createElement('canvas'); //Do not show picture on page
    // canvas.width = width
    // canvas.height = height 
    // const ctx = canvas.getContext('2d');

    // let imageDataT = new Uint8ClampedArray()

    // image.onload = () => {
    //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //   // console.log('width:', image.width)
    //   // console.log('height:', image.height)
    //   imageDataT = ctx.getImageData(0, 0, image.width, image.height);
    //   console.log(imageDataT);
    //   const code = jsQR(imageDataT.data, image.width, image.height, 'dontInvert')
    //   if (code) {
    //     setQRdata(code.data)
    //     console.log("Found QR code", code);
    //     console.log("Result", code.data);
    //   } else {
    //     console.log("Do not detect QR-code.")
    //   }
    // }

  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Detect QR-Code from Picture
        </h1>
        <p></p>

        <p>Width: {width} ,Height: {height}</p>

        <p className={styles.description}>
          Result: {qrData}
        </p>

        <canvas id="canvas" width={width} height={height}></canvas>
        
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}