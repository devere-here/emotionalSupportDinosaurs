import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setDinosaur} from '../store'
import GifPlayer from 'react-gif-player'


class Choose extends Component{

  handleClick = (dinosaur) => {
    this.props.pickDinosaur(dinosaur)
  }

  render = () => (
      <div id="choose">
        <div id="choosePanel">
          <h1>Pick a dinosaur</h1>
          <div id="choosePanelFlexContainer">
            <Link to="/audio">
              <div className="choosePanelDinoContainer" onClick={() => this.handleClick('stegosaurus')}>
                <h2>Stegosaurus</h2>
                  <GifPlayer gif={'https://drive.google.com/uc?export=download&id=1jwO0PLd1G4jNBQcbtsW3zDHsc1_K9Kf-'}  autoplay />
              </div>
            </Link>
            <Link to="/audio">
            <div className="choosePanelDinoContainer" onClick={() => this.handleClick('tyrannosaurus')}>
              <h2>Tyrannosaurus</h2>
                <GifPlayer gif={'https://drive.google.com/uc?export=download&id=10oYkrHB_q2plQJxzELy8EyKsheHEgEip'}  autoplay />
            </div>
            </Link>
            <Link to="/audio">
              <div className="choosePanelDinoContainer" onClick={() => this.handleClick('brontosaurus')}>
                <h2>Brontosaurus</h2>
                <GifPlayer gif={'https://drive.google.com/uc?export=download&id=1G2eR26NW6DJGbUkAsSRsvafatiqzpKR1'}  autoplay />
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
}

// mapping redux state to props
const mapState = state => ({ dinosaur: state.dinosaur })

const mapDispatch = dispatch => ({
  pickDinosaur(dinosaur){
    dispatch(setDinosaur(dinosaur));
  }
})

export default connect(mapState, mapDispatch)(Choose)

