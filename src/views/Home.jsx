//eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'

//Components
import { Header } from '../components/Header'

//Http
import { getMovies, getTvShows, getMovieGenres, getTvGenres } from '../api/requestMisc';

//Images
import movieBanner from '../assets/img/moviedb-banner.jpg'

//Icons
import {
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export const Home = () => {

  // Refs
  const nextRef = useRef()
  const prevRef = useRef()

  //Vars and states
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieGen, setMovieGen] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [tvGen, setTvGen] = useState([]);

  //General methods
  const loadMovies = async () => {
    setLoading(true)
    const resMovieDB = await getMovies()
    const resMovieGenres = await getMovieGenres()
    // console.log(resMovieDB)
    const genreMap = {};
    resMovieGenres.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
    const moviesWithGenres = resMovieDB.results.map(movie => {
      const genreNames = movie.genre_ids.map(genreId => genreMap[genreId]);
      return {
        ...movie,
        genre_names: genreNames,
      };
    });
    setMovies(resMovieDB.results)
    setMovieGen(moviesWithGenres)
  }

  const loadTvShows = async () => {
    setLoading(true)
    const resTvDB = await getTvShows()
    const resTvGenres = await getTvGenres()
    // console.log(resTvDB)
    const genreMap = {};
    resTvGenres.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
    const tvWithGenres = resTvDB.results.map(tv => {
      const genreNames = tv.genre_ids.map(genreId => genreMap[genreId]);
      return {
        ...tv,
        genre_names: genreNames,
      };
    });
    setTvShows(resTvDB.results)
    setTvGen(tvWithGenres)
  }

  //For Slider
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndexTv, setCurrentIndexTv] = useState(0)

  //Slider methods MOVIE
  const prevSlide = (movieOrTv) => {
    let newIndex;
    if (movieOrTv === 'movie') {
      newIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    } else {
      newIndex = currentIndexTv === 0 ? tvShows.length - 1 : currentIndexTv - 1;
      setCurrentIndexTv(newIndex);
    }
  }

  const nextSlide = (movieOrTv) => {
    let newIndex;
    if (movieOrTv === 'movie') {
      newIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    } else {
      newIndex = currentIndexTv === tvShows.length - 1 ? 0 : currentIndexTv + 1;
      setCurrentIndexTv(newIndex);
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    loadMovies()
    loadTvShows()
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

  // Initialize currentIndex from localStorage on component mount
  useEffect(() => {
    const storedIndex = localStorage.getItem('currentIndex');
    const storedIndexTv = localStorage.getItem('currentIndexTv');
    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }

    if (storedIndexTv !== null) {
      setCurrentIndexTv(parseInt(storedIndexTv, 10))
    }
  }, []);

  // Update localStorage whenever currentIndex changes
  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('currentIndexTv', currentIndexTv);
  }, [currentIndexTv]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? 19 : prevIndex - 1));
        setCurrentIndexTv((prevIndex) => (prevIndex === 0 ? 19 : prevIndex - 1));
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex === 19 ? 0 : prevIndex + 1));
        setCurrentIndexTv((prevIndex) => (prevIndex === 19 ? 0 : prevIndex + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures that this effect runs once

  return (
    <>
      {
        (loading) ?
          <>
            <div className="loader absolute top-[40%] left-[47%] text-white"></div>
          </>
          :
          <>
            <Header></Header>
            {/* Home */}

            <div className="container mt-16 w-1/2">
              {/* <img src={movieBanner} alt="" className='flex mx-auto' /> */}
              <div className="content rounded shadow-xl">
                <h1 className="text-3xl pt-16 ps-10 font-bold">Welcome to React MovieDB</h1>
                <h3 className='text-xl pt-24 ps-10 font-semibold'>Thousand of nice choices to entertain you and your family!</h3>
              </div>
            </div>

            <div className="max-w-[1400px] h-[780px] m-auto py-16 px-4 relative group">
              <h2 className="text-4xl text-white font-semibold mb-10">Discover new movies</h2>
              {movies[currentIndex] && (
                <>
                  <div style={{
                    backgroundImage: `url('https://www.themoviedb.org/t/p/w1280_and_h720_face${movies[currentIndex].poster_path}')`,
                  }} className='w-full h-full rounded-2xl bg-center bg-no-repeat bg-cover duration-500 filter brightness-50' id='background'
                  ></div>
                  <div className='group:block absolute top-[10%] -translate-x-0 translate-y-[40%] left-[10%] text-2xl'>
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movies[currentIndex].poster_path}`} alt="" className='rounded' id='poster'
                    />
                  </div>

                  <div className='group:block absolute top-[30%] left-[30%] '>
                    <h2 className='text-4xl font-semibold'>{movies[currentIndex].original_title}</h2>
                    <br />
                    <h4>Release Date: <span className="font-bold">{new Date(movies[currentIndex].release_date).toLocaleDateString()}</span></h4>
                    <br />
                    <h3 className='text-justify w-3/4'>{movies[currentIndex].overview}</h3>
                    <br />
                    <h5>Genres: {movieGen[currentIndex].genre_names.join(', ')}</h5>
                  </div>
                </>
              )}
              {/* Left Arrow */}
              <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[55%] left-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer ms-5'>
                <ArrowLeftIcon
                  className='text-sm w-10'
                  size={30}
                  onClick={() => prevSlide('movie')}
                />
              </div>
              {/* Right Arrow */}
              <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[55%] right-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer me-5'>
                <ArrowRightIcon
                  className='text-sm w-10'
                  size={30}
                  ref={nextRef}
                  onClick={() => nextSlide('movie')}
                />
              </div>
            </div>


            <div className="max-w-[1400px] h-[780px] m-auto py-16 px-4 relative group">
              <h2 className="text-4xl text-white font-semibold mb-10">Discover TV Shows</h2>
              {tvShows[currentIndexTv] && (
                <>
                  <div
                    style={{
                      backgroundImage: `url('https://www.themoviedb.org/t/p/w1280_and_h720_face${tvShows[currentIndexTv].poster_path}')`,
                    }}
                    className='w-full h-full rounded-2xl bg-center bg-no-repeat bg-cover duration-500 filter brightness-50'
                    id='background'
                  ></div>
                  <div className='group:block absolute top-[10%] -translate-x-0 translate-y-[40%] left-[10%] text-2xl'>
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tvShows[currentIndexTv].poster_path}`}
                      alt=""
                      className='rounded'
                      id='poster'
                    />
                  </div>

                  <div className='group:block absolute top-[30%] left-[30%] '>
                    <h2 className='text-4xl font-semibold'>{tvShows[currentIndexTv].original_name}</h2>
                    <br />
                    <h4>
                      Release Date: <span className="font-bold">{new Date(tvShows[currentIndexTv].first_air_date).toLocaleDateString()}</span>
                    </h4>
                    <br />
                    <h3 className='text-justify w-3/4'>{tvShows[currentIndexTv].overview}</h3>
                    <br />
                    <h5>Genres: {tvGen[currentIndexTv].genre_names.join(', ')}</h5>
                  </div>
                </>
              )}
              {/* Left Arrow */}
              <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[55%] left-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer ms-5'>
                <ArrowLeftIcon
                  className='text-sm w-10'
                  size={30}
                  onClick={() => prevSlide('tv')}
                />
              </div>
              {/* Right Arrow */}
              <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[55%] right-5 text-2xl rounded-full bg-black/20 text-white cursor-pointer me-5'>
                <ArrowRightIcon
                  className='text-sm w-10'
                  size={30}
                  onClick={() => nextSlide('tv')}
                />
              </div>
            </div>
          </>
      }
    </>
  )
}
