import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Nav, Navbar as BNavbar } from 'react-bootstrap';

// import './Navbar.scss';

const blk = cn('Navbar');

export const Navbar = () => {
  return (
    <BNavbar bg='dark' variant='dark'>
      <Container>
        <BNavbar.Brand href='#home'>Navbar</BNavbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
        </Nav>
      </Container>
    </BNavbar>
    // <Navbar className={blk()}>
    //   <Link className={blk('Logo')} to='/'>
    //     Mastery
    //   </Link>
    //   <nav>
    //     <ul className={blk('NavSections')}>
    //       <li>
    //         <Link className={blk('Link')} to='/habits'>
    //           Habits
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className={blk('Link')} to='/skills'>
    //           Skills
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className={blk('Link')} to='/mood'>
    //           Mood
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className={blk('Link', { last: true })} to='/login'>
    //           Login <FontAwesomeIcon className={blk('LoginIcon')} icon={faCircleUser} size='lg' />
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </Navbar>
  );
};
