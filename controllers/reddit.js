const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const snoowrap = require('snoowrap');
const fs = require('fs');
const rawJSON = fs.readFileSync('./cartypes.json');
var carTypes = JSON.parse(rawJSON);

var response = {
  message: '',
  success: true,
  user: null
};

const r = new snoowrap({
  userAgent: 'reddit-bot-example-node',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

class RedditController {
  // Route: /reddit/getposts
  // Access: public
  getposts(req, res) {
    fetch("https://www.reddit.com/api/v1/authorize?client_id=qJJABT26HPg5Sw&response_type=code&state=wqX%2Fx7OGhlK%2BMPrLEoRxASvBljWoB8aw8jCrGumDzcA%3D&redirect_uri=http://localhost:65010/authorize_callback%2F&duration=permanent&scope=account%20creddits%20edit%20flair%20history%20identity%20livemanage%20modconfig%20modcontributors%20modflair%20modlog%20modmail%20modothers%20modposts%20modself%20modtraffic%20modwiki%20mysubreddits%20privatemessages%20read%20report%20save%20structuredstyles%20submit%20subscribe%20vote%20wikiedit%20wikiread")
      // .then(response => response.json())
      .then(response => {
        res.json(response)
        // console.log(response);
      })
      .catch(err => {
        console.log(err)
      });
  }

  // Route: /reddit/signin
  // Access: public
  signin(req, res) {
    // const REDDIT_CLIENT_ID = 'qJJABT26HPg5Sw';

    // // Getting the reddit sub from the POST body request
    // const redditSub = 'whatcarshouldIbuy';

    // // Creating Body for the POST request which are URL encoded
    // const params = new URLSearchParams()
    // params.append('grant_type', APP_ONLY_GRANT_TYPE)
    // params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')

    // // Trigger POST to get the access token
    // const tokenData = fetch(REDDIT_ACCESS_TOKEN_URL, {
    //   method: 'POST',
    //   body: params,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': `Basic ${Buffer.from(`${REDDIT_CLIENT_ID}:`).toString('base64')}` // Put password as empty
    //   }
    // }).then(res => res.json()).then(res => console.log('res', res))

    // if (!tokenData.error) {
    //   // Fetch Reddit data by passing in the access_token
    //   const trendData = fetchRedditTrendingData(redditSub, tokenData.access_token)
      
    //   // Finding just the title of the post
    //   const trendingResult = trendData.data.children.map(
    //     child => child.data.title
    //   )
      
    //   res.send(trendingResult)
    // }

    // r.getSubreddit('whatcarshouldIbuy').then(res => console.log('res', res));
    // r.getSubreddit('AskReddit').getWikiPage('bestof').content_md.then(console.log).catch(err => console.log('errror', err));
    r.getSubreddit('whatcarshouldIbuy').getTop({time: 'all'}).then(data => res.json(data));
  }

  async psPosts(req, res) {
    // const carTypes = [crossover, large car, midsize car, minivan, truck, small car, special purpose, SUV, station wagon, sports, sedan, coupe];
    // var carTypeDetails = {
    //   type: '',
    //   count: '',
    //   aliases: []
    // }
    console.log('carTypes', carTypes)

    const url = 'https://api.pushshift.io/reddit/search/submission/?subreddit=whatcarshouldIbuy&sort=desc&sort_type=created_utc&after=1483228800&before=1582212180&size=10';
    const response = await fetch(url);
    const data = await response.json();
    var posts = data.data;
    // ex
    // posts[0].title
    // posts[0].selftext
    // posts[0].id



    console.log(posts.length);
    res.json(posts.length);

    // fetch(url).then(response => {
    //   console.log(response.json())
    //   res.json(response.json())
    // });

    // fetch(url).then(response => response.json())
    // .then(data => {
    //   console.log(data)
    // })
  }
}

module.exports = new RedditController();