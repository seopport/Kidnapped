import { getReviews } from 'api/reviewApi';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const { FaStar } = require('react-icons/fa');
const { default: colors } = require('styles/theme');

// 별점 평균 구하기
const CalculateGrade = ({ cafeId }) => {
  const { isLoading, isError, data: reviews } = useQuery('reviews', getReviews);

  if (isLoading) {
    return <div style={{ fontSize: '12px', color: colors.mainTextColor, marginTop: 'auto' }}>로딩중..</div>;
  }

  if (isError) {
    console.log('error');
    return;
  }

  // map return부분에서 받아온 각 cafeId와 리뷰데이터에서 cafeId가 일치하는 부분의 별점 배열을 생성
  const cafeGrades = reviews?.filter((item) => item.cafeId === cafeId).map((item) => item.grade);

  // 별점 배열의 평균 구하기
  const gradeAverage =
    cafeGrades.reduce((acc, cur) => {
      return acc + cur;
    }, 0) / cafeGrades.length;

  // 소수점 반올림
  const roundedGradeAverage = gradeAverage.toFixed(1);

  // 리뷰가 없으면 gradeAverage = Nan = false
  return gradeAverage ? (
    <StGradeWrap>
      <FaStar color={colors.starColor} style={{ marginRight: '5px' }} />
      {roundedGradeAverage}
    </StGradeWrap>
  ) : (
    <StGradeWrap style={{ fontSize: '12px' }}>등록된 평점이 없습니다. 😕</StGradeWrap>
  );
};

export const StGradeWrap = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  color: ${colors.mainTextColor};
  margin-top: auto;
`;

export default CalculateGrade;
