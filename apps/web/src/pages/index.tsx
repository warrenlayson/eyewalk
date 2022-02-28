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
  <div className="font-Lora">
    <Head>
      <title>Eyewalk</title>
    </Head>
    {/* Header */}
    <header>
      <nav className="container flex items-center py-4">
        <div className="py-1">
          <Link href="/">
            <a>
              <Image
                src="/EyeWalk_TextOnlyNoLogo_1.svg"
                height={80}
                width={200}
                alt="Eyewalk logo"
              />
            </a>
          </Link>
        </div>
        <ul className="items-center justify-end flex-1 hidden gap-12 text-sm uppercase sm:flex text-eyewalk-navy-blue">
          <li className="cursor-pointer">Features</li>
          <li className="cursor-pointer">Pricing</li>
          <li className="cursor-pointer">Contact</li>
          <button
            type="button"
            className="py-3 font-medium text-white uppercase rounded-md bg-eyewalk-black px-7"
          >
            Login
          </button>
        </ul>
        <div className="flex justify-end flex-1 sm:hidden">
          <FaBars size="2em" />
        </div>
      </nav>
      {/* <div className="flex items-center justify-between h-20 max-w-5xl px-4 py-4 mx-auto md:px-0">
        <Link href="/">
          <a>
            <Image
              src="/EyeWalk_TextOnlyNoLogo_1.svg"
              height={80}
              width={200}
              alt="Eyewalk logo"
            />
          </a>
        </Link>
        <div className="hidden md:block">
          <button type="button" className="px-3 py-2 mr-4 ">
            Sign in
          </button>
          <button
            type="button"
            className="px-4 py-2 text-white bg-black rounded-xl"
          >
            Get Started
          </button>
        </div>
        <div className="block p-4 md:hidden">
          <FaBars size="2em" />
        </div>
      </div> */}
    </header>

    {/* Hero */}
    <section className="relative">
      <div className="container flex flex-col-reverse items-center gap-12 lg:flex-row mt-14 lg:mt-28">
        {/* Content */}
        <div className="flex flex-col items-center flex-1 lg:items-start">
          <h2 className="mb-6 text-3xl text-center font-Montserrat text-eyewalk-navy-blue md:text-4 lg:text-5xl lg:text-left">
            header
          </h2>
          <p className="mb-6 text-lg text-center text-eyewalk-black lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro non
            quis modi, pariatur vitae harum. Odio laboriosam eos maiores ipsum
            recusandae quis, vitae totam soluta, autem quasi minus facere quas.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button color="yellow">Get Started</Button>
            <Button color="white">Learn more</Button>
          </div>
        </div>
        {/* Image */}
        <div className="z-10 flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0">
          {/* Replace with actual image */}
          <div className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full">
            insert image
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 mt-20 bg-eyewalk-white lg:mt-60">
      {/* Heading */}
      <div className="px-2 mx-auto sm:w-3/4 lg:w-5/12">
        <h2 className="text-3xl text-center font-Montserrat text-eyewalk-navy-blue">
          Features
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
          voluptatum inventore laudantium accusantium dolor tenetur? Doloremque
          nihil exercitationem eaque provident nesciunt impedit fugit, accusamus
          ipsam magni deleniti facilis fugiat hic.
        </p>
      </div>
      {/* Feature 1 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <div className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full">
              insert image
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-Montserrat text-eyewalk-navy-blue">
              Feature 1
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
      {/* Feature 2 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row-reverse gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <div className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full">
              insert image
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-Montserrat text-eyewalk-navy-blue">
              Feature 2
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
      {/* Feature 3 */}
      <div className="relative mt-20 lg:mt-24">
        <div className="container flex flex-col items-center justify-center lg:flex-row gap-x-24">
          {/* Image */}
          <div className="z-10 flex justify-center flex-1 mb-10 lg:mb-0">
            {/* Replace with image */}
            <div className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full">
              insert image
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col items-center flex-1 lg:items-start">
            <h2 className="text-3xl font-Montserrat text-eyewalk-navy-blue">
              Feature 3
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
    </section>

    {/* Download */}
    <section className="py-20 mt-20">
      {/* Heading */}
      <div className="px-2 mx-auto sm:w-3/4 lg:w-5/12">
        <h2 className="text-3xl text-center font-Montserrat text-eyewalk-navy-blue">
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
            <h3 className="mt-5 mb-2 text-lg font-Montserrat text-eyewalk-navy-blue">
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
            <h3 className="mt-5 mb-2 text-lg font-Montserrat text-eyewalk-navy-blue">
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
          <h2 className="text-3xl text-center font-Montserrat text-eyewalk-navy-blue">
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
          <h2 className="text-3xl text-center font-Montserrat">
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
            height={80}
            width={200}
            alt="Eyewalk Logo"
          />
          <ul className="flex gap-12 text-sm text-white uppercase">
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>
        <ul className="flex gap-10 mt-12 text-2xl text-white md:mt-0">
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaFacebookSquare />
          </li>
        </ul>
      </div>
    </footer>
  </div>
)

export default Index
