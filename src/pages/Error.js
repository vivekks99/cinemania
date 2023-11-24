import React from 'react'

function Error({err}) {
  return (
    <div className='error'>
      <div>OOPS!</div>
      <div className="error-content">
        {err}
      </div>
    </div>
  )
}

export default Error