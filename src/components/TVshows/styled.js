import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
0%{
    position:relative;
    bottom:-300px;
    opacity:0;
    transform:scale(0);
}
80%{
    position:relative;
    bottom:0px;
    opacity:.8;
    transform:scale(1.1);
}
100%{
    position:relative;
    bottom:0px;
    opacity:1;
    transform:scale(1);
}
`

export const SlickCardContainer = styled.div`
height: 270px;
// border: 1px solid white;
background-image:url(${props=> props.backgroundUrl});
background-size: cover;
width:230px !important;
margin:10px;
cursor:pointer;
border-radius:15px;
animation: ${slideUp} .6s ease-out ${props=>props.delay}s;
transform:scale(0);
animation-fill-mode:forwards;
`