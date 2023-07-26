import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../Assets/svg/Arrow.svg";

export const HeaderContainer = styled.header`
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.125rem;
`;

export const DivUser = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
`;

export const Logout = styled(Link)`
  display: ${({ active }) => (active === "true" ? "block" : "none")};
  position: absolute;
  cursor: pointer;
  text-decoration: none;
  color: #2a2a2a;
  top: 3rem;
  right: 0;
  left: 0;
  background-color: #f4f4f4;
  padding: 1rem;
  font-size: 18px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
`;

export const ArrowElement = styled(Arrow)`
  ${({ active }) => (active === "true" ? "transform: rotateZ(-180deg);" : "")}
  transition: all 0.2s ease-in-out;
`;