import { Loader } from 'components/Loader/Loader';
import UserMenu from 'components/UserMenu/UserMenu';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { selectAuthenticated } from 'redux/selectors';

const Layout = () => {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <>
      <header>
        <nav className="nav-memu container">
          <NavLink to="/" className="link_header">
            Home
          </NavLink>
          {authenticated ? (
            <>
              <NavLink to="/contacts" className="link_header">
                Contacts
              </NavLink>
              <UserMenu />
            </>
          ) : (
            <div className="container_login__register">
              <NavLink to="/register" className="link_header">
                Register
              </NavLink>
              <NavLink to="/login" className="link_header">
                Login
              </NavLink>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
