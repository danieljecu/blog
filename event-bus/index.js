const express = require("express");
const bodyParser = require("body-parser");

const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events= [];

const post_clusterip_serv= "http://post-clusterip-serv:4000/events" //http://localhost:4000/events

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  console.log("event", event)
  try {
    axios.post(post_clusterip_serv, event);//posts
    // axios.post("http://localhost:4001/events", event);//comments
    // axios.post("http://localhost:4002/events", event);//query
    // axios.post("http://localhost:4003/events", event);//moderation
  } catch (err) {
    console.log(err.message);
  }

  res.send({ status: "OK" });
});

app.get('/events', (req,res)=>{
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
