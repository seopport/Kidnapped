import React from 'react'
import styled from 'styled-components'
import colors from 'styles/theme'
import { IoSearch } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";

const SideBar = () => {
  return (
    <StSideBar>
      <StContainer>
        <StSearchWrapper>
          <StSearchForm>
            <input type='text' placeholder="지역 검색" ></input>
            <StSearchButton>
              <IoSearch size={25} />
            </StSearchButton>
          </StSearchForm>
          <StBookmarkButton>
            <FaBookmark size={30} color={"white"} />
          </StBookmarkButton>
        </StSearchWrapper>
        <StMainCardContainer>
          <StMainCardItem></StMainCardItem>
        </StMainCardContainer>
      </StContainer>
    </StSideBar>
  )
}

export default SideBar

export const StSideBar = styled.div`
  position: absolute;
  top: 68px;
  left: 0;
  width: 400px;
  height: 100vh;
  background-color: ${colors.subColor};
  z-index: 2;
`

export const StContainer = styled.div`
  display: felx;
  padding: 20px 16px;
  height: calc(100% - 40px); 
`

export const StSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  height: 47px;
  margin-bottom: 20px;
  flex: 1
`
export const StSearchForm = styled.form`
display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: white;
  border-radius: 100px;
  padding: 0 16px; 
  flex: 1; 
  
  & input {
  flex: 1; 
  border: none; 
  font-size: 20px; 
  height: 100%;
  outline: none;
  background-color: transparent;
  }
`

export const StSearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

`
export const StBookmarkButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const StMainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; 
`

export const StMainCardItem = styled.div`

width: 100%;
height: 143px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
background-color: white;
`



