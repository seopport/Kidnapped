import React from 'react'
import styled from 'styled-components'
import colors from 'styles/theme'

const SideBar = () => {
  return (
    <StSideBar></StSideBar>
  )
}

export default SideBar

export const StSideBar = styled.div`
  position: absolute;
  top: 68;
  left: 0;
  width: 400px;
  height: 100vh;
  background-color: ${colors.subColor};
  z-index: 2;
`