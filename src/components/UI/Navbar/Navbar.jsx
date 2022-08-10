import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='navbar__name'>My postcards</div>
      <div className="navbar__link1">
        <Link to="/albums">Albums</Link>
      </div>
      <div className="navbar__link2">
        <Link to="/about">Contacts</Link>
      </div>
      </div>
  )
}

export default Navbar

