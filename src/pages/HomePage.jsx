import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAuthenticated, selectUserData } from 'redux/selectors';

const HomePage = () => {
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUserData);
  return (
    <div className="container">
      {authenticated ? (
        <h1 className="hero_text">Welcome, {userData.name}</h1>
      ) : (
        <>
          <h1 className="hero_text">
            To access your contacts, log in to your account
          </h1>
          <Link to="/login">
            <button className="button_home">Login</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
