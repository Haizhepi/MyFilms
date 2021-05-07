const moment = require("moment");
const BASEURL = "https://api.themoviedb.org/3";
const APIKEY = "?api_key=a62b092f963cce3979db513811305924";
const LANG = "&language=en-US&page=1";
const IMAGEURL = "https://image.tmdb.org/t/p/w500";
const BACKDROPURL = "https://image.tmdb.org/t/p/original";

const YOUTUBEURL = "https://www.youtube.com/watch?v=";

const getInfo = (data, media_type) => {
  if (media_type === "movie") {
    return data.map((d) => {
      console.log(d);
      return {
        id: d.id,
        title: d.title,
        poster_path: d.poster_path ? IMAGEURL + d.poster_path : null,
        date: d.release_date ? d.release_date : "2020",
      };
    });
  } else if (media_type === "tv") {
    return data.map((d) => {
      console.log(d);

      return {
        id: d.id,
        name: d.name,
        poster_path: d.poster_path ? IMAGEURL + d.poster_path : null,
        date: d.first_air_date ? d.first_air_date : "2020",
      };
    });
  }
};

const getNow = (data, media_type) => {
  if (media_type === "movie") {
    return data.map((d) => {
      return {
        id: d.id,
        title: d.title,
        poster_path: d.poster_path ? IMAGEURL + d.poster_path : null,
        backdrop_path: d.backdrop_path ? BACKDROPURL + d.backdrop_path : null,
        date: d.release_date ? d.release_date : "2020",
      };
    });
  } else if (media_type === "tv") {
    return data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        poster_path: d.poster_path ? IMAGEURL + d.poster_path : null,
        backdrop_path: d.backdrop_path ? BACKDROPURL + d.backdrop_path : null,
        date: d.first_air_date ? d.first_air_date : "2020",
      };
    });
  }
};
const getVid = (data, media_type) => {
  if (media_type === "movie") {
    return data.map((d) => {
      return {
        site: d.site,
        type: d.type,
        key: YOUTUBEURL + d.key,
        name: d.name,
      };
    });
  } else if (media_type === "tv") {
    return data.map((d) => {
      return {
        site: d.site,
        type: d.type,
        key: YOUTUBEURL + d.key,
        name: d.name,
      };
    });
  }
};

const getRev = (data) => {
  const revs = data.map((d) => {
    const date = new Date(d.created_at);
    const str = moment(date).format("MMM Do, YYYY");

    const re = {
      author: d.author,
      content: d.content,
      created_at: str,
      url: d.url,
      rating: d.author_details.rating ? d.author_details.rating : 0,
      avatar_path: d.author_details.avatar_path
        ? d.author_details.avatar_path
        : null,
    };
    return re;
  });
  revs.map((r) => {
    if (r.avatar_path) {
      console.log(r.avatar_path);
      if (r.avatar_path.startsWith("/https")) {
        r.avatar_path = r.avatar_path.substring(1);
      } else {
        r.avatar_path = BACKDROPURL + r.avatar_path;
      }
    }
  });
  return revs;
};

const getDetails = (data, media_type) => {
  const res = {};
  res.genres = data.genres.map((g) => g.name);
  res.spoken_languages = data.spoken_languages;
  res.overview = data.overview;
  res.vote_average = data.vote_average;
  res.tagline = data.tagline;
  res.poster_path = data.poster_path ? IMAGEURL + data.poster_path : null;
  if (media_type === "movie") {
    res.title = data.title;

    res.release_date = data.release_date;
    res.runtime = data.runtime;
  } else if (media_type === "tv") {
    res.name = data.name;

    res.first_air_date = data.first_air_date;
    res.episode_run_time = data.episode_run_time;
  }
  return res;
};

const getCas = (data, media_type) => {
  return data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      character: d.character ? d.character : null,
      profile_path: d.profile_path ? IMAGEURL + d.profile_path : null,
    };
  });
};

module.exports = {
  getInfo,
  getVid,
  getNow,
  getDetails,
  getRev,
  getCas,
};
