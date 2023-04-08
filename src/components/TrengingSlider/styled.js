import styled,{keyframes} from "styled-components";

const sliderCardAnimation = keyframes`
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
`

export const SlickCardContainer = styled.div`
height: 250px;
// border: 1px solid white;
background-image:url(${props=> props.backgroundUrl});
background-size: cover;
width:90% !important;
margin-left:10px;
border-radius:15px;
animation: ${sliderCardAnimation} .6s ease-out ${props=>props.delay}s;
transform:scale(0);
animation-fill-mode:forwards;
`