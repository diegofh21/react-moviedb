//eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'

//Components
import { Header } from '../components/Header'

//Http
import { getMovies, getTvShows, getMovieGenres, getTvGenres, getMoviesByGenre, getTvShowsByGenre } from '../api/requestMisc';

//Images
import movieBanner from '../assets/img/moviedb-banner.jpg'

//Icons
import {
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { parse, startOfYesterday } from 'date-fns';
import PreviousMap from 'postcss/lib/previous-map';

export const Home = () => {

  // Refs
  const nextRef = useRef()
  const prevRef = useRef()

  //Vars and states
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieGen, setMovieGen] = useState([]);
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [tvGen, setTvGen] = useState([]);
  const [tvGenreList, setTvGenreList] = useState([]);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState('All');
  const [selectedTVGenre, setSelectedTVGenre] = useState('All');
  const [movieGenreId, setMovieGenreId] = useState(0);
  const [tvGenreId, setTvGenreId] = useState(0);

  //Pagination
  const [pageMovie, setPageMovie] = useState(1)
  const [totalPagesMovie, setTotalPagesMovie] = useState(0)
  const [pageTv, setPageTv] = useState(1)
  const [totalPagesTv, setTotalPagesTv] = useState(0)

  //General methods
  //Initial load of movies
  const loadMovies = async (page) => {
    setLoading(true)
    const resMovieDB = await getMovies(page)
    const resMovieGenres = await getMovieGenres()
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
    setPageMovie(page)
    setTotalPagesMovie(500)
    setMovieGen(moviesWithGenres)
    setMovieGenreList(resMovieGenres)
  }

  //Initial load of tv shows
  const loadTvShows = async (page) => {
    setLoading(true)
    const resTvDB = await getTvShows(page)
    const resTvGenres = await getTvGenres()
    // This creates a genre map to add the genre names to the array of tv shows results
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
    setPageTv(page)
    setTotalPagesTv(500)
    setTvGen(tvWithGenres)
    setTvGenreList(resTvGenres)
  }

  //Handler methods
  //Handler for genre selected in the header component
  const handleMovieGenreChange = async (newGenre, page) => {
    setLoading(true)
    const genreId = findGenreIds(newGenre, movieGenreList.genres);

    if (genreId !== null) {
      // Set the selected genre and its ID
      setSelectedMovieGenre(newGenre);
      // Verify if the page is undefined
      if (page === undefined) {
        page = 1
      }
      // Request to the API a new result of movies with the specific gender
      const resMoviesByGenre = await getMoviesByGenre(genreId, page)
      // Again, creates a genreMap to add the genre names to the array
      const genreMap = {};
      movieGenreList.genres.forEach(genre => {
        genreMap[genre.id] = genre.name;
      });
      const moviesWithGenres = resMoviesByGenre.results.map(movie => {
        const genreNames = movie.genre_ids.map(genreId => genreMap[genreId]);
        return {
          ...movie,
          genre_names: genreNames,
        };
      });
      setMovies(resMoviesByGenre.results)
      setMovieGen(moviesWithGenres)
      setTotalPagesMovie(500)
      setPageMovie(page)
      setLoading(false)
    } else {
      // Handle the case when the genre is not found
      setLoading(false)
      alert('Selected movie genre not found:', newGenre);
    }
  };

  const handleTVGenreChange = async (newGenre, page) => {
    setLoading(true)
    // Gets the genre ID
    const genreId = findGenreIds(newGenre, tvGenreList.genres);

    if (genreId !== null) {
      // Verify if page is undefined, if so, set it to 1
      if (page === undefined) {
        page = 1;
      }
      // Request to the API a new result of tv shows with the specific gender
      const resTvShowsByGenre = await getTvShowsByGenre(genreId, page)
      // Again, creates a genreMap to add the genre names to the array
      const genreMap = {};
      tvGenreList.genres.forEach(genre => {
        genreMap[genre.id] = genre.name;
      });
      const tvShowsWithGenres = resTvShowsByGenre.results.map(show => {
        const genreNames = show.genre_ids.map(genreId => genreMap[genreId]);
        return {
          ...show,
          genre_names: genreNames,
        };
      });
      setSelectedTVGenre(newGenre);
      setTvShows(resTvShowsByGenre.results)
      setTvGen(tvShowsWithGenres)
      setTotalPagesTv(500)
      setPageTv(page)
      setLoading(false)
    } else {
      // Handle the case when the genre is not found
      setLoading(false)
      alert('Selected tv genre not found:', newGenre);
    }
  };

  const findGenreIds = (genreName, genreList) => {
    const selectedGenre = genreList.find((genre) => genre.name === genreName);
    if (selectedGenre) {
      return selectedGenre.id;
    }
    return null; // Return null if the genre is not found
  }

  //Loader of movies and tv shows by genres

  //For Slider
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndexTv, setCurrentIndexTv] = useState(0)

  //Slider methods
  //Previous slide
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

  //Next slide
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

  //Go to specific slide (NOT IMPLEMENTED YET)
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  //Initial loader of movies and tv shows, I put here a timeout to simulate internet loading ETA 3 - 5 seconds, but that depends on the internet speed of the user
  useEffect(() => {
    loadMovies(pageMovie)
    loadTvShows(pageTv)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

  // Initialize indexs and pages from localStorage on component mount
  useEffect(() => {
    const storedIndex = localStorage.getItem('currentIndex');
    const storedIndexTv = localStorage.getItem('currentIndexTv');
    const storedPageMovie = localStorage.getItem('pageMovie')
    const storedPageTv = localStorage.getItem('pageTv')
    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }

    if (storedIndexTv !== null) {
      setCurrentIndexTv(parseInt(storedIndexTv, 10))
    }

    if (storedPageMovie) {
      setPageMovie(parseInt(storedPageMovie, 10));
    }

    if (storedPageMovie) {
      setPageTv(parseInt(storedPageTv, 10));
    }
  }, []);

  // Here localStorage updates whenever currentIndex changes
  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex);
  }, [currentIndex]);

  // Here localStorage updates whenever currentIndexTv changes
  useEffect(() => {
    localStorage.setItem('currentIndexTv', currentIndexTv);
  }, [currentIndexTv]);

  //In this part I control the events of keyboard arrow left and arrow right, then I update the slider with the corresponding index
  useEffect(() => {
    const handleKeyDown = (event) => {
      //Prevents all the default events of the keyboard
      event.preventDefault()

      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? 19 : prevIndex - 1));
        setCurrentIndexTv((prevIndex) => (prevIndex === 0 ? 19 : prevIndex - 1));
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex === 19 ? 0 : prevIndex + 1));
        setCurrentIndexTv((prevIndex) => (prevIndex === 19 ? 0 : prevIndex + 1));
      } else if (event.key === 'ArrowUp') {
        //Pass the carousel of movies to the previous page, if is the first page then jump to the last page
        if (selectedMovieGenre === 'All') {
          setPageMovie((prevPage) => {
            let newPage;
            if (prevPage <= 1) {
              newPage = 500;
            } else {
              newPage = prevPage - 1
            }
            localStorage.setItem('pageMovie', newPage.toString())
            loadMovies(newPage)
            setCurrentIndex(0)
            return newPage;
          })
        } else {
          setPageMovie((prevPage) => {
            let newPage;
            if (prevPage <= 1) {
              newPage = 500;
            } else {
              newPage = prevPage - 1
            }
            localStorage.setItem('pageMovie', newPage.toString())
            handleMovieGenreChange(selectedMovieGenre, newPage)
            setCurrentIndex(0)
            return newPage;
          })
        }

        //Pass the carousel of tv shows to the previous page, if is the first page then jump to the last page
        if (selectedTVGenre === 'All') {
          setPageTv((prevPage) => {
            let newPage;
            if (prevPage <= 1) {
              newPage = 500;
            } else {
              newPage = prevPage - 1;
            }
            localStorage.setItem('pageTv', newPage.toString())
            loadTvShows(newPage)
            setCurrentIndexTv(0)
            return newPage;
          })
        } else {
          setPageTv((prevPage) => {
            let newPage;
            if (prevPage <= 1) {
              newPage = 500;
            } else {
              newPage = prevPage - 1;
            }
            localStorage.setItem('pageTv', newPage.toString())
            handleTVGenreChange(selectedTVGenre, newPage)
            setCurrentIndexTv(0)
            return newPage;
          })
        }

        //Timeout to load the data
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      } else if (event.key === 'ArrowDown') {
        //Pass the carousel of tv shows to the next page, if is the last page then jump to the first page
        if (selectedMovieGenre === 'All') {
          setPageMovie((prevPage) => {
            let newPage;
            if (prevPage >= 500) {
              newPage = 1;
            } else {
              newPage = prevPage + 1
            }
            localStorage.setItem('pageMovie', newPage.toString())
            loadMovies(newPage)
            setCurrentIndex(0)
            return newPage;
          })
        } else {
          setPageMovie((prevPage) => {
            let newPage;
            if (prevPage >= 500) {
              newPage = 1;
            } else {
              newPage = prevPage + 1
            }
            localStorage.setItem('pageMovie', newPage.toString())
            handleMovieGenreChange(selectedMovieGenre, newPage)
            setCurrentIndex(0)
            return newPage;
          })
        }

        //Pass the carousel of tv shows to the next page, if is the last page then jump to the first page
        if (selectedTVGenre === 'All') {
          setPageTv((prevPage) => {
            let newPage;
            if (prevPage >= 500) {
              newPage = 1;
            } else {
              newPage = prevPage + 1;
            }
            localStorage.setItem('pageTv', newPage.toString())
            loadTvShows(newPage)
            setCurrentIndexTv(0)
            return newPage;
          })
        } else {
          setPageTv((prevPage) => {
            let newPage;
            if (prevPage >= 500) {
              newPage = 1;
            } else {
              newPage = prevPage + 1;
            }
            localStorage.setItem('pageTv', newPage.toString())
            handleTVGenreChange(selectedTVGenre, newPage)
            setCurrentIndexTv(0)
            return newPage;
          })
        }

        //Timeout to load the data
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      }
    };

    //Event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    //Unmount the listener to avoid memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTVGenre, selectedMovieGenre]);

  return (
    <>
      {
        (loading) ?
          <>
            <div className="loader absolute top-[40%] left-[47%] text-white"></div>
          </>
          :
          <>
            <Header onMovieGenreChange={handleMovieGenreChange} onTVGenreChange={handleTVGenreChange} />

            <div className="container mt-16 w-1/2">
              <div className="content rounded shadow-xl">
                <h1 className="text-3xl pt-16 ps-10 font-bold">Welcome to React MovieDB</h1>
                <h3 className='text-xl pt-24 ps-10 font-semibold'>Thousand of nice choices to entertain you and your family!</h3>
              </div>
            </div>

            <div className="container max-w-[1400px] px-4">
              <h4 className="text-xl mt-10">Actual Movie Genre: <span className="font-bold">{selectedMovieGenre}</span></h4>
              <h4 className="text-xl">Actual Tv Shows Genre: <span className="font-bold">{selectedTVGenre}</span></h4>
            </div>

            {/* MOVIES CAROUSEL */}
            <div className="max-w-[1400px] h-[780px] m-auto pb-16 pt-5 px-4 relative group">
              <h2 className="text-4xl text-white font-semibold mb-10">Discover new movies</h2>
              {movies[currentIndex] && (
                <>
                  <div style={{
                    backgroundImage: `url('https://www.themoviedb.org/t/p/w1280_and_h720_face${movies[currentIndex].poster_path}')`,
                  }} className='w-full h-full rounded-2xl bg-center bg-no-repeat bg-cover duration-700 filter brightness-50 shadow-2xl object-cover' id='background'
                  ></div>
                  <div className='group:block absolute top-[10%] -translate-x-0 translate-y-[40%] left-[10%] text-2xl'>
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movies[currentIndex].poster_path}`} alt="" className='rounded duration-700' id='poster'
                    />
                  </div>

                  <div className='group:block absolute top-[30%] left-[30%] bg-black/60 p-5 w-[60%] rounded'>
                    <h2 className='text-4xl font-semibold'>{movies[currentIndex].title}</h2>
                    <br />
                    <h4>Release Date: <span className="font-bold">{new Date(movies[currentIndex].release_date).toLocaleDateString()}</span></h4>
                    <br />
                    <h3 className='text-justify'>{movies[currentIndex].overview}</h3>
                    <br />
                    <h5>Genres: <span className="font-bold">{movieGen[currentIndex].genre_names.join(', ')}</span></h5>
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

            {/* TV SHOWS CAROUSEL */}
            <div className="max-w-[1400px] h-[780px] m-auto py-16 px-4 relative group mb-20">
              <h2 className="text-4xl text-white font-semibold mb-10">Discover TV Shows</h2>
              {tvShows[currentIndexTv] && (
                <>
                  <div
                    style={{
                      backgroundImage: `url('https://www.themoviedb.org/t/p/w1280_and_h720_face${tvShows[currentIndexTv].poster_path}')`,
                    }}
                    className='w-full h-full rounded-2xl bg-center bg-no-repeat bg-cover duration-700 filter brightness-50 shadow-2xl object-cover'
                    id='background'
                  ></div>
                  <div className='group:block absolute top-[10%] -translate-x-0 translate-y-[40%] left-[10%] text-2xl'>
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tvShows[currentIndexTv].poster_path}`}
                      alt=""
                      className='rounded duration-700'
                      id='poster'
                    />
                  </div>

                  <div className='group:block absolute top-[30%] left-[30%] bg-black/60 p-5 w-[60%] rounded'>
                    <h2 className='text-4xl font-semibold'>{tvShows[currentIndexTv].name}</h2>
                    <br />
                    <h4>
                      Release Date: <span className="font-bold">{new Date(tvShows[currentIndexTv].first_air_date).toLocaleDateString()}</span>
                    </h4>
                    <br />
                    <h3 className='text-justify'>{tvShows[currentIndexTv].overview}</h3>
                    <br />
                    <h5>Genres: <span className="font-bold">{tvGen[currentIndexTv].genre_names.join(', ')}</span></h5>
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
