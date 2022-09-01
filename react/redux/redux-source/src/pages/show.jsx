import React from 'react'
import { connect } from 'react-redux'

function Show () {
  return (
    <div style={{border: '1px solid red'}}>show</div>
  )
}

const mapStateTpProps = (state) => {
  return {
    
  }
}
export default connect(mapStateTpProps)(Show)