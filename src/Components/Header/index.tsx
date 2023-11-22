import React from 'react';
import Logo from '../../assets/svg/Logo';
import UserImg from '../../assets/svg/User';
import Arrow from '../../assets/svg/Arrow.svg';
import { ArrowElement, DivUser, HeaderContainer, Logout } from './style';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/user';

const Header = () => {
  const [active, setActive] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      localStorage.removeItem('User');
      navigate('/');
    }
  };

  React.useEffect(() => {
    const userStorage = localStorage.getItem('User');
    if (userStorage) setUser(JSON.parse(userStorage));
  }, []);

  if (user)
    return (
      <HeaderContainer>
        <Logo />
        <DivUser onClick={() => setActive(prevActive => !prevActive)}>
          <UserImg />
          <p>{user.name}</p>
          <ArrowElement src={Arrow} active={`${active}`} />
          <Logout onClick={handleClick} active={`${active}`}>
            Sair
          </Logout>
        </DivUser>
      </HeaderContainer>
    );
  else return null;
};

export default Header;
