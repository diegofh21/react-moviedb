import { Fragment, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  RocketLaunchIcon,
  MapIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

import logoTMDB from '../assets/img/logos/tmdb-logo.svg'

// ICONS
import { TbMoodKid, TbPumpkinScary } from "react-icons/tb";
import { GiDramaMasks, GiPistolGun, GiCardRandom } from "react-icons/gi";

const products = [
  { name: 'All', description: 'See all the movies we have here for you! 😁', icon: GiCardRandom, genre: 'All' },
  { name: 'Action', description: "All the actions movies that you like 🔫", icon: GiPistolGun, genre: 'Action' },
  { name: 'Horror', description: 'For sure you will get a nice jumpscare with this movies... Boo! 👹', icon: TbPumpkinScary, genre: 'Horror' },
  { name: 'Adventure', description: 'Ahoy! Adventure call us with this movies! ⚔', icon: MapIcon, genre: 'Adventure' },
  { name: 'Drama', description: 'Nice set of movies to watch with your family and maybe cry! 😢', icon: GiDramaMasks, genre: 'Drama' },
  { name: 'Science Fiction', description: 'Level up your fantasies with the movies here! 🚀', icon: RocketLaunchIcon, genre: 'Science Fiction' },
]

const productsTv = [
  { name: 'All', description: 'See all the tv shows we have here for you! 😁', icon: GiCardRandom, genre: 'All' },
  { name: 'Action & Adventure', description: "All the actions & adventure tv shows that you like ⚔", icon: MapIcon, genre: 'Action & Adventure' },
  { name: 'Mystery', description: 'Every mysteries has to be solved... Or not?🤔 Find it seeing this tv shows!', icon: TbPumpkinScary, genre: 'Mystery' },
  { name: 'Comedy', description: 'Your favorite tv shows that for sure will make you laugh!😂', icon: MapIcon, genre: 'Comedy' },
  { name: 'Drama', description: 'Nice set of tv shows to watch with your family and maybe cry! 😢', icon: GiDramaMasks, genre: 'Drama' },
  { name: 'Sci-Fi & Fantasy', description: 'A lot of incredible adventures are told with the tv shows of this category! 🚀', icon: RocketLaunchIcon, genre: 'Sci-Fi & Fantasy' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Header = ({ onMovieGenreChange, onTVGenreChange }) => {

  const navigate = useNavigate();

  // States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [selectedMovieGenre, setSelectedMovieGenre] = useState('All');
  const [selectedTVGenre, setSelectedTVGenre] = useState('All');

  const handleMovieGenreChange = (newGenre) => {
    setSelectedMovieGenre(newGenre);
    // Here i update the genre and pass it to the parent (Home Component)
    onMovieGenreChange(newGenre);
  };

  const handleTVGenreChange = (newGenre) => {
    setSelectedTVGenre(newGenre);
    // Here i update the genre and pass it to the parent (Home Component)
    onTVGenreChange(newGenre); // Call the callback function to pass the selected TV genre
  };

  return (
    <>
      <header className="">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">React TMDB</span>
              <Link to="/home"><img className="h-8 w-auto" src={logoTMDB} alt="" /></Link>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <Popover.Group className="hidden lg:flex lg:gap-x-8 pe-52">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:text-white active:text-slate-200 duration-100">
                <div className='group relative rounded focus:outline-none focus:ring px-5 py-1 font-semibold'>
                  <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-100 group-hover:w-full"></span>
                  Discover Movies
                </div>
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-full right-full top-full z-10 mt-3 w-screen max-w-lg overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <button onClick={(e) => handleMovieGenreChange(item.genre)} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </button>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:text-white active:text-slate-200 duration-100">
                <div className='group relative rounded focus:outline-none focus:ring px-5 py-1 font-semibold'>
                  <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-100 group-hover:w-full"></span>
                  Discover TV Shows
                </div>
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-full right-full top-full z-10 mt-3 w-screen max-w-lg overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {productsTv.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <button onClick={(e) => handleTVGenreChange(item.genre)} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </button>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
        </nav>

        {/* MOBILE HEADER */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/home" className="-m-1.5 p-1.5">
                <span className="sr-only">React TMDB</span>
                <img className="h-8 w-auto" src={logoTMDB} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 duration-200">
                          <div className='group relative rounded focus:outline-none focus:ring pb-2 font-semibold text-black hover:bg-gray-700 active:text-black duration-150'>
                            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 rounded-full border-white text-black transition-all duration-100 group-hover:w-full"></span>
                            Discover movies
                          </div>
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2 duration-200">
                          {[...products].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="button"
                              onClick={(e) => handleMovieGenreChange(item.genre)}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-black hover:bg-gray-700 duration-200"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 duration-200">
                          <div className='group relative rounded focus:outline-none focus:ring pb-2 font-semibold text-black hover:bg-gray-700 active:text-black duration-150'>
                            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 rounded-full border-white text-black transition-all duration-100 group-hover:w-full"></span>
                            Discover TV Shows
                          </div>
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2 duration-200">
                          {[...productsTv].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="button"
                              onClick={(e) => handleTVGenreChange(item.genre)}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-black hover:bg-gray-700 duration-200"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  )
}