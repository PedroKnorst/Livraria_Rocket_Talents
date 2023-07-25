import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const NavBack = styled.nav`
  align-self: start;
  display: flex;
  gap: 0.5rem;
  font-size: 1.25rem;
  margin: 0 2rem;
`;

export const NavBackHome = styled(Link)`
  text-decoration: none;
  color: #00000080;
`;

export const NavBackPage = styled.p`
  color: black;
  font-weight: 500;
`;
