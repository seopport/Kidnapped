import React from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';

const Review = () => {
  return (
    <StReviewTapContainer>
      <StReviewFormContainer>
        <StReviewTextArea placeholder="리뷰를 작성해주세요." />
        <StDropdownFormButtonWrap>
          <StGradeDropdown>
            평점
            <IoIosArrowUp />
          </StGradeDropdown>
          <StReviewFormBottom>등록</StReviewFormBottom>
        </StDropdownFormButtonWrap>
      </StReviewFormContainer>
      <StReviewContainer>
        <StReviewInfoWrap>
          <StReviewWriterProfileImage>르</StReviewWriterProfileImage>
          <StReviewProfileWrap>
            <p style={{ display: 'flex', marginBottom: '3px' }}>
              <StReviewWriterNicnkname>르탄이..</StReviewWriterNicnkname>
              <StReviewGrade>⭐⭐⭐⭐⭐</StReviewGrade>
            </p>
            <StReviewCreationDate>24.02.23</StReviewCreationDate>
          </StReviewProfileWrap>
        </StReviewInfoWrap>
      </StReviewContainer>
    </StReviewTapContainer>
  );
};

export const StReviewProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const StReviewTapContainer = styled.div`
  width: 335px;
  background-color: seashell;
  margin: 0 auto;
  color: ${colors.subColor};
`;

export const StReviewFormContainer = styled.div`
  width: 100%;
  border: 1px solid green;
  margin-bottom: 20px;
`;

export const StReviewTextArea = styled.textarea`
  width: 100%;
  height: 92px;
  border-radius: 10px;
  padding: 10px;
`;

export const StDropdownFormButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const StGradeDropdown = styled.div`
  display: flex;
`;

export const StReviewFormBottom = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${colors.mainColor};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

export const StReviewContainer = styled.div`
  min-height: 140px;
  width: 100%;
  background-color: darkseagreen;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${colors.subColor};
  border-bottom: 1px solid ${colors.subColor};
`;

export const StReviewInfoWrap = styled.div`
  width: 95%;
  border: 1px solid black;
  display: flex;
`;

export const StReviewWriterProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c8c4f5; //TOOD: 랜덤생성
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const StReviewWriterNicnkname = styled.span`
  font-size: 16px;
  margin-right: 5px;
`;

export const StReviewGrade = styled.div``;

export const StReviewCreationDate = styled.span``;

export default Review;
