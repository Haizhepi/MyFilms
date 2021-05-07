const express = require("express");
const axios = require("axios");

const { getInfo, getNow } = require("../utils");

const router = express.Router();
const BASEURL = "https://api.themoviedb.org/3";
const APIKEY = "?api_key=a62b092f963cce3979db513811305924";
const LANG = "&language=en-US&page=1";
const IMAGEURL = "https://image.tmdb.org/t/p/w500";

const query = async (param, type) => {
  let url;
  if (param === "trending") {
    url = BASEURL + "/" + param + "/" + type + "/day" + APIKEY;
  } else if (param === "top_rated") {
    url = BASEURL + "/" + type + "/" + param + APIKEY;
  } else if (param === "popular") {
    url = BASEURL + "/" + type + "/" + param + APIKEY;
  } else if (param === "airing_today") {
    url = BASEURL + "/" + type + "/" + param + APIKEY;
  } else {
    const error = new Error("unknown param");
    throw error;
  }
  url += LANG;
  const resp = await axios.get(url);
  return resp.data.results;
};

router.get("/movie/now_playing", async (req, res, next) => {
  try {
    const url = BASEURL + "/movie" + "/" + "now_playing" + APIKEY;
    const resp = await axios.get(url);
    const r = resp.data.results;
    const results = getNow(r, "movie");

    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

router.get("/movie/:param", async (req, res, next) => {
  try {
    const { param } = req.params;
    const data = await query(param, "movie");
    const results = getInfo(data, "movie");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

router.get("/tv/:param", async (req, res, next) => {
  try {
    const { param } = req.params;
    const data = await query(param, "tv");
    const results = getInfo(data, "tv");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
