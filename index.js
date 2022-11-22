"use strict";

// Dependencies
const fileDownloader = require("nodejs-file-downloader")
const giphyAPI = require("giphy-api")("s8Z7C8o7jWTpTIC2fIHwnfinmrB7yTgb") //You can change the API key if you want, btw this key is not mine It's just leaked by me like 2 years ago can't remember.

// main
function gsad(directory, keyword, amount, callback){
    var gifIndex = 0

    async function start(){
        if(gifIndex === amount) return callback("Successfully download gifs.")

        giphyAPI.random({
            tag: keyword,
            rating: "g"
        }, (err, res)=>{
            const downloader = new fileDownloader({
                url: res.data.images.original.url,
                directory: directory
            })

            async function download(){
                try{
                    await downloader.download()

                    console.log(`Download status: Success | File link: ${res.data.images.original.url}`)
                    gifIndex++
                }catch{
                    console.log(`Download status: Failed | File link: ${res.data.images.original.url}`)
                }

                start()
            }

            download()
        })
    }

    start()
}

module.exports = gsad