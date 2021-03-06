// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import axios from "axios";
import Xray from 'x-ray';
import serp from 'serp';
import NGrams from 'word-ngrams';
const x = Xray();

var options = {
  host : "google.com",
  qs : {
    q : "test",
    filter : 0,
    pws : 0
  },
  num : 1
};

export async function handler(event, context) {
  try {
    var corpus = [];
    const links = await serp.search(options);
    console.log(links);


    const response = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
