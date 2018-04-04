import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Home, About, Choose, AudioRecognition } from './components'

/**
 * COMPONENT
 */

function Routes(){
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/choose" component={Choose} />
      <Route exact path="/audio" component={AudioRecognition}/>
      <Route exact path="/" component={Home} />
    </Switch>
  )
}

export default withRouter(Routes);

