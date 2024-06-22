import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ScaleIcon from '@mui/icons-material/Scale'; // Weights
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Payment
import { Paper } from '@mui/material';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess'; // Vacation
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function WiMenu() {
  const [value, setValue] = useState('home');
  function handleNavigationChange(_event: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
  }

  return (
    <Paper elevation={3} sx={{ position:'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          value="home"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Play"
          icon={<PlayArrowIcon />}
          value="play"
          component={Link}
          to="/play"
        />
        <BottomNavigationAction
          label="Weights"
          icon={<ScaleIcon />}
          value="weight"
          component={Link}
          to="/weight"
        />
        <BottomNavigationAction
          label="Payments"
          icon={<AttachMoneyIcon />}
          value="payment"
          component={Link}
          to="/payment"
        />
      </BottomNavigation>
    </Paper>
  );
}

/*
import { Link } from 'react-router-dom';

type NavBarLink = {
  label: string;
  path: string;
};

type NavBarProps = {
  links: NavBarLink[];
};

function WiMenuXXX({ links }: NavBarProps) {
  const renderedLinks = links.map((link) => {
    return (
      <li key={link.label}>
        <Link to={link.path}>{link.label}</Link>
      </li>
    );
  })
  return (
    <nav>
      <ul>
        {renderedLinks}
      </ul>
    </nav>
  );
}

export default WiMenu;
*/
