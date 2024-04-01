import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import applogo from './app logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import logo from './logo512.png'
import { BsCaretDown } from "react-icons/bs";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '30%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar({ handleCategoryClick, search }) {
  const [anchorEl, setAnchorEl] = React.useState(null); // Define anchorEl state
  const isSmallDevice = useMediaQuery('(max-width:600px)');
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [val, setval] = React.useState('');

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Category = [
    'Goat', 'Breakfast', 'Vegetarian',
    'Vegan', 'Starter', 'Side', 'Seafood',
    'Pork', 'Pasta', 'Miscellaneous', 'Lamb',
    'Dessert', 'Chicken', 'Beef'
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={isSmallDevice ? { justifyContent: 'space-between' } : { justifyContent: 'space-around' }}>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          ><img className='logo-rotate' src={logo} style={{ width: '8%' }} alt="" />
            <img src={applogo} alt="" height={100} style={{ width: '30%', marginBottom: '-7px' }} />
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={val}
              onChange={e => { setval(e.target.value) }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  search(val.trim(''));
                  setval('')// Call your submit function here
                }
              }}
            />
          </Search>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen}
            >
              {isSmallDevice ? <MenuIcon /> : <h2 style={{ fontFamily: 'fantasy' }}>Categorys<BsCaretDown />
              </h2>}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {Category.map((category) => (
                <MenuItem key={category} onClick={handleMenuClose}>
                  <button style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'black',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                    onClick={() => handleCategoryClick(category)}>{category}</button>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
