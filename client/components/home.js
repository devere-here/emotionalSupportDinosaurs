import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div id="home">
    <div id="homeWelcome">
      <h1>Emotional Support Dinosaurs</h1>
      <Link to="/about" className="homeButton">About</Link>
      <Link to="/instructions" className="homeButton">Instructions</Link>
      <Link to="/choose" className="homeButton">Choose Your Dinosaur</Link>
    </div>
  </div>
)

export default Home;
