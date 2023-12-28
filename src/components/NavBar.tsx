import { Link } from 'react-router-dom';

type NavBarLink = {
  label: string;
  path: string;
};

type NavBarProps = {
  links: NavBarLink[];
};

function NavBar({ links }: NavBarProps) {
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

export default NavBar;
