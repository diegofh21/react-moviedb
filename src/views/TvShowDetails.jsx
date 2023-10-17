import React, { useState, useEffect } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

//Icons
import {
  StarIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'

export const TvShowDetails = (props) => {

  var tvShowDetail = props.tvShow;
  var tvShowGenreDetail = props.tvShowGenres;

  useEffect(() => {
    setTvShowDetailed(tvShowDetail)
  }, [tvShowDetail])

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === 'Backspace') {
        setShowModal(false)
      } else if(event.key  === 'Shift') {
        setShowModal(true)
      }
    }

    //Event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    //Unmount the listener to avoid memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  const [tvShowDetailed, setTvShowDetailed] = useState(tvShowDetail);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button
          type="button"
          className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => setShowModal(true)}
        >
          View TV Show Details
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog size="xl">
          <TEModalContent>
            <TEModalHeader style={{ background: '#3a7bd5' }}>
              {/* <!-- Modal title --> */}
              <h5 className="text-xl font-medium leading-normal ">
                {tvShowDetailed.name}
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody className="bg-body">
              <div className="grid grid-cols-8">
                <div className="col-span-2">
                  <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tvShowDetailed.poster_path}`} alt={tvShowDetailed.title} className="rounded shadow-xl text-center place-content-center mx-auto mt-4" />
                </div>
                <div className="col-span-6">
                  <h2 className="px-10 text-xl font-bold text-justify leading-[3rem]">
                    {tvShowDetailed.name}
                  </h2>
                  <p className="px-10 text-justify leading-[3rem]">
                    Release Date: <span className="font-bold">{new Date(tvShowDetailed.first_air_date).toLocaleDateString()}</span>
                  </p>
                  <p className="px-10 text-justify leading-[3rem]">
                    Genres: <span className="font-bold">{tvShowGenreDetail}</span>
                  </p>
                  <p className="px-10 text-justify leading-[3rem]">
                    {tvShowDetailed.overview}
                  </p>
                  <p className="px-10 text-justify leading-[3rem]">
                    Rating: <span className="font-bold">{tvShowDetailed.vote_average} / 10</span>
                  </p>
                  <div className="grid grid-cols-2 my-5">
                    <div className="mx-auto px-10">
                      <button className="text-white font-bold bg-red-600 rounded-full hover:bg-red-700 duration-100 px-5 py-1">
                        <span className="flex flex-row">
                          <StarIcon className="w-5 me-3" /> Add to Favourite
                        </span>
                      </button>
                    </div>

                    <div className="mx-auto px-10">
                      <button className="text-white font-bold bg-green-600 rounded-full hover:bg-green-700 duration-100 px-5 py-1">
                        <span className="flex flex-row">
                          Play now <PlayCircleIcon className="w-5 ms-3" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  )
}