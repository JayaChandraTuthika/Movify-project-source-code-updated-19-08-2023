import styled from "styled-components";

export const SlickCardContainer = styled.div`
height: 270px;
// border: 1px solid white;
background-image:url(${props=> props.backgroundUrl});
background-size: cover;
width:230px !important;
margin:10px;
cursor:pointer;
border-radius:15px;

`