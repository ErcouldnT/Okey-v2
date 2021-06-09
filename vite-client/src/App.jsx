import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './Styles/App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Index from './Pages/Index'
import Gameroom from './Pages/Gameroom'
import Test from './Pages/Test'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/dashboard" component={Dashboard} exact/>
        <Route path="/test" component={Test} exact/>
        <Route path="/room/:id" component={Gameroom} exact/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
