import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from 'redux/auth/auth.reducer';
import { selectUserData } from 'redux/selectors';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserData);
  return (
    <div className={styles.container_userMenu}>
      <p className={styles.user_email}>{userEmail.email}</p>
      <button
        onClick={() => {
          dispatch(logoutThunk());
        }}
        className={styles.button_logout}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
