import React from 'react';
import { label } from 'reactbulma'

export default ({ handleSignIn, loginError }) => (
  <form onSubmit={handleSignIn}>

    { loginError && <p>{ loginError }!</p> }

    <label className="label">Email: <input type="text" name="email"  placeholder="example@app.com" /></label><br />
    <label className="label">Password: <input type="password" name="password"  placeholder="password" /></label><br />
    <input type="submit" />
  </form>
)
  



