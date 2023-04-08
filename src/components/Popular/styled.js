import styled,{keyframes} from "styled-components";

// export const SlickCardContainer = styled.div`
// height: 270px;
// // border: 1px solid white;
// background-image:url(${props=> props.backgroundUrl});
// background-size: cover;
// width:230px !important;
// margin:10px;
// cursor:pointer;
// border-radius:15px;
// animation: ${slideUp} .5s ease-out

// `
const slideUp = keyframes`
from{
    position:relative;
    bottom:-600px;
    opacity:0;
}
to{
    position:relative;
    bottom:0px;
    opacity:1;
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
animation: ${slideUp} ${props=>props.delay}s ease-out;

`