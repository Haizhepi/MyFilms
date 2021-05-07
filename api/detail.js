const express = require("express");
const axios = require("axios");

const { getInfo, getVid, getDetails, getRev, getCas } = require("../utils");

const router = express.Router();
const BASEURL = "https://api.themoviedb.org/3";
const APIKEY = "?api_key=a62b092f963cce3979db513811305924";
const LANG = "&language=en-US&page=1";
const IMAGEURL = "https://image.tmdb.org/t/p/w500";
const PAGE = "&page=1";

router.get("/movie/videos/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const data = await getVideo("movie", movieId);
    const results = getVid(data, "movie");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});
router.get("/tv/videos/:tvId", async (req, res, next) => {
  try {
    const { tvId } = req.params;
    const data = await getVideo("tv", tvId);
    const results = getVid(data, "tv");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});
const getVideo = async (media_type, id) => {
  const url =
    BASEURL + "/" + media_type + "/" + id + "/videos" + APIKEY + LANG + PAGE;
  const resp = await axios.get(url);
  return resp.data.results;
};

router.get("/recommend_movie/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const data = await getRecommandAndSimilar(
      movieId,
      "movie",
      "recommendations"
    );
    const results = getInfo(data, "movie");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

router.get("/similiar_movie/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const data = await getRecommandAndSimilar(movieId, "movie", "similar");
    const results = getInfo(data, "movie");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

router.get("/recommend_tv/:tvId", async (req, res, next) => {
  try {
    const { tvId } = req.params;
    const data = await getRecommandAndSimilar(tvId, "tv", "recommendations");
    const results = getInfo(data, "tv");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

router.get("/similiar_tv/:tvId", async (req, res, next) => {
  try {
    const { tvId } = req.params;
    const data = await getRecommandAndSimilar(tvId, "tv", "similar");
    const results = getInfo(data, "tv");
    res.status(200).json({ data: results });
  } catch (err) {
    next(err);
  }
});

const getRecommandAndSimilar = async (id, media_type, kind) => {
  let url =
    BASEURL + "/" + media_type + "/" + id + "/" + kind + APIKEY + LANG + PAGE;
  const resp = await axios.get(url);
  return resp.data.results;
};

router.get("/detail_movie/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const data = await getDetail(movieId, "movie", "");
    res.status(200).json({ data: getDetails(data, "movie") });
  } catch (err) {
    next(err);
  }
});

router.get("/detail_tv/:tvId", async (req, res, next) => {
  try {
    const { tvId } = req.params;
    const data = await getDetail(tvId, "tv", "");
    res.status(200).json({ data: getDetails(data, "tv") });
  } catch (err) {
    next(err);
  }
});

const getDetail = async (id, media_type, kind) => {
  let url = BASEURL + "/" + media_type + "/" + id + APIKEY + LANG + PAGE;
  const resp = await axios.get(url);
  return resp.data;
};

router.get("/reviews_movie/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const data = await getReview(movieId, "movie");
    res.status(200).json({ data: getRev(data) });
  } catch (err) {
    next(err);
  }
});

router.get("/reviews_tv/:tvId", async (req, res, next) => {
  try {
    const { tvId } = req.params;
    const data = await getReview(tvId, "tv");
    res.status(200).json({ data: getRev(data) });
  } catch (err) {
    next(err);
  }
});

const getReview = async (id, media_type) => {
  let url =
    BASEURL +
    "/" +
    media_type +
    "/" +
    id +
    "/" +
    "reviews" +
    APIKEY +
    LANG +
    PAGE;
  const resp = await axios.get(url);
  return resp.data.results;
};

router.get("/cast_movie/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const data = await getCast(movieId, "movie");
    res.status(200).json({ data: getCas(data) });
  } catch (err) {
    next(err);
  }
});

router.get("/cast_tv/:tvId", async (req, res, next) => {
  try {
    const { tvId } = req.params;
    const data = await getCast(tvId, "tv");
    res.status(200).json({ data: getCas(data) });
  } catch (err) {
    next(err);
  }
});

const getCast = async (id, media_type) => {
  let url =
    BASEURL +
    "/" +
    media_type +
    "/" +
    id +
    "/" +
    "credits" +
    APIKEY +
    LANG +
    PAGE;
  const resp = await axios.get(url);
  return resp.data.cast;
};

router.get("/person/:personId", async (req, res, next) => {
  try {
    const { personId } = req.params;
    let bio_url = BASEURL + "/person/" + personId + APIKEY + LANG + PAGE;
    let b = await axios.get(bio_url);
    let { data } = b;
    const bio = {};
    bio.birthday = data.birthday;
    bio.gender = 0;
    if (data.gender) {
      bio.gender = data.gender;
    }
    bio.name = data.name;
    bio.homepage = data.homepage;
    bio.also_known_as = data.also_known_as;
    bio.known_for_department = data.known_for_department;
    bio.biography = data.biography;
    bio.place_of_birth = data.place_of_birth;
    bio.profile_path = IMAGEURL + data.profile_path;
    let external_url =
      BASEURL + "/person/" + personId + "/external_ids" + APIKEY + LANG + PAGE;
    let d = await axios.get(external_url);
    data = d.data;
    const ext = {};
    ext.imdb = data.imdb_id ? "imdb.com/name/" + data.imdb_id : null;
    ext.facebook = data.facebook_id ? "facebook.com/" + data.facebook_id : null;
    ext.instagram = data.instagram_id
      ? "instagram.com/" + data.instagram_id
      : null;
    ext.twitter = data.twitter_id ? "twitter.com/" + data.twitter_id : null;

    res.status(200).json({ bio: bio, external: ext });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
