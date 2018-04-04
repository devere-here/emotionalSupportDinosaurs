import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Navbar = () => (
  <div>
    <h1>Emotional Support Dinosaurs</h1>
    <nav>
        <div>
          <Link to="/about">About</Link>
          <Link to="/choose">Choose Your Dinosaur</Link>
        </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */

export default withRouter((Navbar))


