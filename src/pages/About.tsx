import React from 'react'
import Wrapper from 'sections/Wrapper';
import avatarImage from "assets/ProfOak.png"
import { FaGithub, FaLinkedin, FaLinkedinIn } from 'react-icons/fa';

function About() {
  return <div className='profile'>
    <img src={avatarImage} alt="avatar" className='profile-image' />
    <h1 className="profile-text">Hi I am Darshan Jain</h1>
    <h2 className="profile-text">The creator of the Pokedex</h2>
  
    <div className="profile-links">
      <a href="https://github.com/Darshan1412" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
      <a href="https://www.linkedin.com/in/Darshan-Jain1/" target="_blank" rel="noreferrer">
        <FaLinkedin />
      </a>
    </div>
  </div>
}

export default Wrapper(About); 