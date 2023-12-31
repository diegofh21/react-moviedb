import axios from "axios";
import { baseURL } from "./apiURL"

// THEMOVIEDB CONFIG
const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjA1ZjQxMjYwZDMwZmFiZjdkNGJiYWZmOGFkNGYzNCIsInN1YiI6IjY1MmFjYzdmMDI0ZWM4MDEwMTUxOTM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mTgkXohlcg20WY_sYV880dVkyVvC1RUp9mQ-TuWLgMQ'
  }
};

/*
==================================================================================
REQUEST TO PAGINATE BETWEEN RECORDS
==================================================================================
*/
export async function RequestPage(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getMovies(page) {
  try {
    const resMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
    return resMovies.data;
  } catch(error) {
    console.error(error)
  }
}

export async function getMoviesByGenre(genreId, page) {
  try {
    const resMovies = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`, options)
    return resMovies.data;
  } catch(error) {
    console.error(error)
  }
}

export async function getTvShows(page) {
  try {
    const resTvShows = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_origin_country=US&with_original_language=en`, options)
    return resTvShows.data;
  } catch(error) {
    console.error(error)
  }
}

export async function getTvShowsByGenre(genreId, page) {
  try {
    const resTvShows = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`, options)
    return resTvShows.data;
  } catch(error) {
    console.error(error)
  }
}

export async function getMovieGenres() {
  try {
    const resTvShows = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    return resTvShows.data;
  } catch(error) {
    console.error(error)
  }
}

export async function getTvGenres() {
  try {
    const resTvShows = await axios.get('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
    return resTvShows.data;
  } catch(error) {
    console.error(error)
  }
}