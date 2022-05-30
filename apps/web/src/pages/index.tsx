/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  FaBars,
  FaChevronDown,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'
import { Button } from 'ui/Button'

const Index = () => (
  <div className="font-body">
    <Head>
      <title>Eyewalk</title>
    </Head>
    {/* Header */}
    <header>
      <div className="absolute top-0 right-0 z-0  h-[40em] hidden lg:block w-[55em]">
        <div className="w-full h-full bg-cover bg-old-people bg-blend-overlay " />
        {/* <div className="bg-[url('/images/group.27.png')] w-full h-full bg-cover " /> */}
      </div>
      <nav className="container relative z-10 flex items-center py-4">
        <div className="py-1">
          <Link href="/">
            <a>
              <Image
                src="/EyeWalk_TextOnlyNoLogo_1.svg"
                height={120}
                width={300}
                alt="Eyewalk logo"
              />
            </a>
          </Link>
        </div>
        <div className="items-center justify-end flex-1 hidden gap-12 sm:flex">
          <ul className="items-center gap-12 text-sm uppercase sm:flex text-eyewalk-navy-blue font-header">
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
          <button
            type="button"
            className="py-3 font-medium text-white uppercase rounded-md bg-eyewalk-black px-7"
          >
            Login
          </button>
        </div>
        <div className="flex justify-end flex-1 sm:hidden">
          <FaBars size="2em" />
        </div>
      </nav>
    </header>

    {/* Hero */}
    <section className="relative">
      <div className="container flex flex-col-reverse items-center gap-12 lg:flex-row mt-14 lg:mt-28">
        {/* Content */}
        <div className="flex flex-col items-center flex-1 lg:items-start">
          <h2 className="mb-6 text-3xl text-center font-header text-eyewalk-navy-blue md:text-4 lg:text-5xl lg:text-left">
            About Us
          </h2>
          <p className="mb-6 text-lg text-center text-eyewalk-black lg:text-left">
            Using a modern technique and technology advancement, our product
            offers the development of a new generation of smart walking canes
            built with innovative features
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button color="yellow">Get Started</Button>
            <Button color="white">Learn more</Button>
          </div>
        </div>
        {/* Image */}
        <div className="z-10 flex justify-center flex-1 mb-10 rounded-full md:mb-16 lg:mb-0 ">
          {/* Replace with actual image */}
          <img
            src="/images/Group 2.png"
            alt="cane"
            className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
          />
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 mt-20 bg-eyewalk-white lg:mt-60">
      {/* Heading */}
      <div className="px-2 mx-auto sm:w-3/4 lg:w-5/12">
        <h2 className="text-3xl text-center uppercase font-header text-eyewalk-navy-blue">
          Features
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Providing intelligent navigation for the visually impaired has become
          simpler as a result of substantial technology improvements in both
          hardware and software
        </p>
      </div>
      {/* Feature 1 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <img
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
              src="/images/image.4.png"
              alt=""
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-bold uppercase font-header text-eyewalk-navy-blue">
              Pulse Monitor
            </h2>
            <p className="my-4 text-center text-gray-500 lg:text-left sm:w-3/4 lg:w-full">
              the Smart Walking Cane&lsquo;s pulse rate sensor is essential, as
              monitoring an elderly person&lsquo;s heart rate while walking is
              vital for their health and their family&lsquo;s ability to react
              promptly in the event of an emergency. Knowing their heart rate
              enables them to detect developing medical problems
            </p>
            <Button color="yellow">Learn more</Button>
          </div>
        </div>
      </div>
      {/* Feature 2 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row-reverse gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <img
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
              src="/images/feature.2.png"
              alt="Obstacle & Fail Detection"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-bold uppercase font-header text-eyewalk-navy-blue">
              Obstacle & Fail Detection
            </h2>
            <p className="my-4 text-center text-gray-500 lg:text-left sm:w-3/4 lg:w-full">
              By introducing advanced sensors into the architecture of the Smart
              Walking cane to create a functional system that avoid obstacles
              and alerts the user to potential dangers in their path, along with
              the fail detection system, accidents can be avoided or, in some
              cases, aided through the use of an alert structure that sends a
              notification tot he client&lsquo;s relative or guardian
            </p>
            <Button color="yellow">Learn more</Button>
          </div>
        </div>
      </div>
      {/* Feature 3 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <img
              src="/images/feature.3.png"
              alt=""
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-bold uppercase font-header text-eyewalk-navy-blue">
              Speaker or earphone connectivity
            </h2>
            <p className="my-4 text-center text-gray-500 lg:text-left sm:w-3/4 lg:w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              deserunt quos placeat accusamus, molestias eveniet, architecto,
              tempore earum obcaecati temporibus quasi quisquam labore odio quae
              vero! Corrupti veniam quibusdam aliquam.
            </p>
            <Button color="yellow">Learn more</Button>
          </div>
        </div>
      </div>
      {/* Feature 4 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row-reverse gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <img
              src="/images/feature.3.png"
              alt=""
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-bold uppercase font-header text-eyewalk-navy-blue">
              Location Tracking
            </h2>
            <p className="my-4 text-center text-gray-500 lg:text-left sm:w-3/4 lg:w-full">
              The tracking implant offers information about the exact location
              of the person, allowing it to relay specifics on where the person
              is at any given time
            </p>
            <Button color="yellow">Learn more</Button>
          </div>
        </div>
      </div>
      {/* Feature 5 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <img
              src="/images/feature.3.png"
              alt=""
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-bold uppercase font-header text-eyewalk-navy-blue">
              Voice Assistance
            </h2>
            <p className="my-4 text-center text-gray-500 lg:text-left sm:w-3/4 lg:w-full">
              Voice assistance is provided through loudspeakers and earphones
            </p>
            <Button color="yellow">Learn more</Button>
          </div>
        </div>
      </div>
      {/* Feature 6 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row-reverse gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <img
              src="/images/feature.3.png"
              alt=""
              className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-bold uppercase font-header text-eyewalk-navy-blue">
              Walking cane portability
            </h2>
            <p className="my-4 text-center text-gray-500 lg:text-left sm:w-3/4 lg:w-full">
              They cane can be used at any time and from any time and from any
              locatoin, with battery life lasting at least three hours at the
              most.
            </p>
            <Button color="yellow">Learn more</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Download */}
    <section className="py-20 mt-20">
      {/* Heading */}
      <div className="px-2 mx-auto sm:w-3/4 lg:w-5/12">
        <h2 className="text-3xl text-center font-header text-eyewalk-navy-blue">
          Download
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
          voluptatum inventore laudantium accusantium dolor tenetur? Doloremque
          nihil exercitationem eaque provident nesciunt impedit fugit, accusamus
          ipsam magni deleniti facilis fugiat hic.
        </p>
      </div>
      {/* Cards */}
      <div className="container grid max-w-screen-lg grid-cols-1 gap-16 mt-16 md:grid-cols-2">
        {/* Card 1 */}
        <div className="flex flex-col rounded-md shadow-md lg:mb-16">
          <div className="flex flex-col items-center p-6">
            <Image
              src="/logo-play-store.svg"
              height={100}
              width={100}
              alt="Play store logo"
            />
            <h3 className="mt-5 mb-2 text-lg font-header text-eyewalk-navy-blue">
              Play Store
            </h3>
            <p className="mb-2 font-light text-gray-500">
              Minimum version: Android 5
            </p>
          </div>
          <hr className="border-b border-eyewalk-white" />
          <div className="flex p-6">
            <Button color="yellow" className="flex-1">
              Get it on Play Store
            </Button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col rounded-md shadow-md lg:my-8">
          <div className="flex flex-col items-center p-6">
            <Image
              src="/logo-app-store.svg"
              height={100}
              width={100}
              alt="Apple store logo"
            />
            <h3 className="mt-5 mb-2 text-lg font-header text-eyewalk-navy-blue">
              Apple Store
            </h3>
            <p className="mb-2 font-light text-gray-500">
              Minimum version: IOS 10
            </p>
          </div>
          <hr className="border-b border-eyewalk-white" />
          <div className="flex p-6">
            <Button color="yellow" className="flex-1">
              Get it on Apple Store
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 bg-eyewalk-white">
      <div className="container">
        <div className="px-2 mx-auto sm:w-3/4 lg:w-5/12">
          <h2 className="text-3xl text-center font-header text-eyewalk-navy-blue">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-center text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
            voluptatum inventore laudantium accusantium dolor tenetur?
            Doloremque nihil exercitationem eaque provident nesciunt impedit
            fugit, accusamus ipsam magni deleniti facilis fugiat hic.
          </p>
        </div>
        {/* FAQ Items */}
        <div className="flex flex-col mx-auto mt-12 sm:w-3/4 lg:w-5/12">
          <div className="flex items-center py-4 border-b">
            <span className="flex-1">Question 1</span>
            <FaChevronDown className="text-eyewalk-yellow" />
          </div>
          <div className="flex items-center py-4 border-b">
            <span className="flex-1">Question 2</span>
            <FaChevronDown className="text-eyewalk-yellow" />
          </div>
          <div className="flex items-center py-4 border-b">
            <span className="flex-1">Question 3</span>
            <FaChevronDown className="text-eyewalk-yellow" />
          </div>
          <div className="flex items-center py-4 border-b">
            <span className="flex-1">Question 4</span>
            <FaChevronDown className="text-eyewalk-yellow" />
          </div>
          <Button color="yellow">More Info</Button>
        </div>
      </div>
    </section>

    {/* Contact Us */}
    <section className="py-20 text-eyewalk-black bg-eyewalk-yellow">
      <div className="container">
        <div className="mx-auto sm sm:w-3/4 lg:w-2/4">
          <h2 className="text-3xl text-center font-header">
            Stay up-to-date with what we&apos;re doing
          </h2>
          <div className="flex flex-col gap-6 mt-8 sm:flex-row">
            <input
              type="text"
              placeholder="Enter your email address"
              className="flex-1 px-2 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-eyewalk-yellow focus:ring-offset-2 focus:ring-white"
            />
            <button
              type="button"
              className="font-medium text-white bg-red-400 btn hover:bg-eyewalk-white hover:text-eyewalk-black"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-8 bg-eyewalk-navy-blue">
      <div className="container flex flex-col items-center md:flex-row">
        <div className="flex flex-wrap items-center justify-center flex-1 gap-12 md:justify-start">
          <Image
            src="/EyeWalk_TextOnlyNoLogo_1.svg"
            height={120}
            width={300}
            alt="Eyewalk Logo"
          />
          <ul className="flex gap-12 text-sm text-white uppercase font-header">
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>
        <ul className="flex gap-10 mt-12 text-2xl text-white md:mt-0">
          <li>
            <Link href="https://facebook.com">
              <a target="_blank">
                <FaTwitter />
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://facebook.com">
              <a target="_blank">
                <FaFacebookSquare />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  </div>
)

export default Index
