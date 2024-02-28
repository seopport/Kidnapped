import React from 'react'
import styled from 'styled-components'

/**
 * StLayoutBox
 * flexDirection 등 레이아웃과 관련된 부분을 효율적으로 사용하기 위해 구현하였습니다. 
 */
export const StLayoutBox = styled.div`
    display: flex;
    flex-direction: ${props => props.direction ? props.direction : "row"};
    align-items: ${props => props.align ? props.align : "center"};
    justify-content: ${props => props.justify ? props.justify : "space-between"};
    width: ${props => props.width ? props.width : "100px"};
    height: ${props => props.height ? props.height : "100px"};
    padding: ${props => props.padding ? props.padding : "0"};
    margin: ${props => props.margin ? props.margin : "0"};
    gap: ${props => props.gap ? props.gap : "0"};
`
