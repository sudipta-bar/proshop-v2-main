import { useSelector, useDispatch } from 'react-redux';
import { FaSun, FaMoon } from 'react-icons/fa';
import { toggleTheme } from '../slices/themeSlice';
import { Nav } from 'react-bootstrap';

const ThemeToggle = () => {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Nav.Link onClick={handleToggle} style={{ cursor: 'pointer', transform: 'translateX(-12px)' }}>
      {mode === 'light' ? <FaMoon /> : <FaSun />}
    </Nav.Link>
  );
};

export default ThemeToggle;