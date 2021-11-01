//Requirements Importer
const File_Downloader = require("nodejs-file-downloader")
const Giphy_API = require("giphy-api")("s8Z7C8o7jWTpTIC2fIHwnfinmrB7yTgb") //You can change the API key if you want, btw this key is not mine It's just leaked by me like 2 years ago can't remember.

//Main
function self(directory = String, keyword = String, amount = BigInt, callback){
    var gif_index = 0

    Init()
    async function Init(){
        if(gif_index == amount){
            callback("Successfully download gifs.")
            return
        }

        Giphy_API.random({
            tag: keyword,
            rating: "g"
        }, function (err, res) {
            var downloader = new File_Downloader({
                url: res.data.image_url,
                directory: directory
            })
    
            Init_2()
            async function Init_2(){
                try{
                    await downloader.download()

                    console.log(`Download status: Success | File link: ${res.data.image_url}`)
                    gif_index += 1
                    Init()
                    return
                }catch{
                    console.log(`Download status: Failed | File link: ${res.data.image_url}`)

                    Init()
                    return
                }
            }
        })
    }
}

//Exporter
module.exports = {
    self: self
}
