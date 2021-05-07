const express = require("express");
const axios = require("axios");

const { getInfo } = require("../utils");

const router = express.Router();

const BASEURL = "https://api.themoviedb.org/3";
const APIKEY = "?api_key=a62b092f963cce3979db513811305924";
const LANG = "&language=en-US";
const PAGE = "&page=1";
const IMAGEURL = "https://image.tmdb.org/t/p/w500";
const BACKDROPURL = "https://image.tmdb.org/t/p/original";

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "sbc" });
});

router.get("/multi/:query", async (req, res, next) => {
  const { query } = req.params;
  const url = BASEURL + "/search/multi" + APIKEY + LANG + "&query=" + query;
  try {
    const resp = await axios.get(url);
    const data = resp.data.results;
    result = [];
    data.forEach((d) => {
      if (d.media_type === "movie") {
        result.push({
          media_type: d.media_type,
          id: d.id,
          title: d.title,
          poster_path: d.poster_path ? IMAGEURL + d.poster_path : null,
          backdrop_path: d.backdrop_path ? IMAGEURL + d.backdrop_path : null,
          date: d.release_date ? d.release_date : "2020",
          vote_average: d.vote_average ? d.vote_average : "0.0",
        });
      } else if (d.media_type === "tv") {
        result.push({
          media_type: d.media_type,
          id: d.id,
          title: d.name,
          poster_path: d.poster_path ? IMAGEURL + d.poster_path : null,
          backdrop_path: d.backdrop_path ? IMAGEURL + d.backdrop_path : null,
          date: d.first_air_date ? d.first_air_date : "2020",
          vote_average: d.vote_average ? d.vote_average : "0.0",
        });
      }
    });
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
