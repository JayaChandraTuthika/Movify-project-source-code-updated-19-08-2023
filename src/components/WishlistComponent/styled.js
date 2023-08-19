import styled, { keyframes } from "styled-components";

const popUpCard = keyframes`
0%{
    opacity:0;
    transform:scale(0);
}
80%{
    opacity:1;
    transform:scale(1.1);
}
100%{
    
    opacity:1;
    transform:scale(1);
}
`;

export const SlickCardContainer = styled.div`
  height: 270px;
  // border: 1px solid white;
  background-image: url(${(props) => props.backgroundUrl});
  background-size: cover;
  width: 230px !important;
  margin: 10px;
  cursor: pointer;
  border-radius: 15px;
  animation: ${popUpCard} 0.6s ease-out ${(props) => props.delay}s;
  transform: scale(0);
  animation-fill-mode: forwards;
`;
