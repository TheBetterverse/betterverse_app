const url = context.payload.urlParam

var data = JSON.stringify({
  "domain": "share.betterverse.app",
  "long_url": url 
});

var config = {
  method: 'post',
  url: 'https://api-ssl.bitly.com/v4/shorten',
  headers: { 
    'Authorization': 'Bearer 57929bbe449a73dc752eed34cad922e18f561591', 
    'Content-Type': 'application/json'
  },
  data : data
};

let result = await axios(config)
result = result.data

context.data = result