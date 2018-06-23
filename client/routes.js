import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Home, About, Instructions, Choose, NewNewAudioRecognition, AudioRecognition } from './components'

/**
 * COMPONENT
 */

const Routes = () => (
  <Switch>
    <Route exact path="/home" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/instructions" component={Instructions} />
    <Route exact path="/choose" component={Choose} />
    <Route exact path="/newAudio" component={NewNewAudioRecognition} />
    <Route exact path="/oldAudio" component={AudioRecognition} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default withRouter(Routes);
