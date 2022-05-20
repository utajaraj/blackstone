const axios  = require("axios")
require("dotenv").config()
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BEARERTOKEN}`
async function tweets(){

 try {
     const gdl = await axios.get("https://api.twitter.com/2/tweets/search/recent?query=Guadalajara&expansions=author_id&tweet.fields=created_at,lang,conversation_id&user.fields=created_at,entities&max_results=10")
     const mx = await axios.get("https://api.twitter.com/2/tweets/search/recent?query=Mexico&expansions=author_id&tweet.fields=created_at,lang,conversation_id&user.fields=created_at,entities&max_results=10")
     const ussr = await axios.get("https://api.twitter.com/2/tweets/search/recent?query=Russia&expansions=author_id&tweet.fields=created_at,lang,conversation_id&user.fields=created_at,entities&max_results=10")
     return {
         guadalajara:gdl.data.data,
         mexico:mx.data.data,
         russia:ussr.data.data
     }
 } catch (error) {
    return {
        guadalajara:[{id:5, text:"Too many requests to the twitter API"}],
        mexico:[{id:6, text:"Too many requests to the twitter API"}],
        russia:[{id:7, text:"Too many requests to the twitter API"}]
    }
 }


}



module.exports = tweets