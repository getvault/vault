import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Vault from '~components/organisms/Vault'

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/vault">
          <Vault />
        </Route>
      </Switch>
    </Router>
  )
}
