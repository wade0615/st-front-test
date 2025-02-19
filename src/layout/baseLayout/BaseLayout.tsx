import { Outlet } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { setSelectedValue } from '../../store/reducers/initReducer';

import './BaseLayout.scss';

// import ExceptionHandleService from 'utils/ExceptionHandler';
// const _EHS = new ExceptionHandleService({
//   _NAME: 'layout/Baselayout.tsx',
//   _NOTICE: ''
// });

/* 基本樣式 */
function BaseLayout() {
  return (
    <div id='base_layout'>
      {/* Header */}
      <BaseLayoutHeader />
      {/* Main content */}
      <Outlet></Outlet>
      {/* Footer */}
      <BlaseLayoutFooter />
    </div>
  );
}

/** Footer */
function BlaseLayoutFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='base_layout_footer'>
      <p>© {currentYear} By Harry Potter</p>
      <p>Theme From Base Layout</p>
    </footer>
  );
}

/** Header */
function BaseLayoutHeader() {
  const dispatch = useDispatch();
  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
    { label: 'Inception', id: 3 },
    { label: 'The Dark Knight', id: 4 },
    { label: 'Fight Club', id: 5 },
    { label: 'Forrest Gump', id: 6 },
    { label: 'The Matrix', id: 7 },
    { label: 'The Shawshank Redemption', id: 8 },
    { label: 'The Lord of the Rings', id: 9 },
    { label: 'Star Wars', id: 10 },
    { label: 'The Silence of the Lambs', id: 11 },
    { label: "Schindler's List", id: 12 },
    { label: 'Se7en', id: 13 },
    { label: 'The Usual Suspects', id: 14 },
    { label: 'Saving Private Ryan', id: 15 },
    { label: 'Gladiator', id: 16 },
    { label: 'Braveheart', id: 17 },
    { label: 'The Green Mile', id: 18 },
    { label: 'Interstellar', id: 19 },
    { label: 'Django Unchained', id: 20 }
  ];

  const handleChange = (
    event: React.SyntheticEvent,
    value: { label: string; id: number } | null
  ) => {
    dispatch(setSelectedValue(value ? value.label : null));
  };

  return (
    <header className='base_layout_header'>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 600 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label=''
            placeholder='輸入台/美股代號，查看公司價值'
          />
        )}
      />
    </header>
  );
}

export default BaseLayout;
