import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap';

export const Navbar = () => {
  return (
    <BSNavbar bg='light' variant='light' fixed='top'>
      <Container>
        <BSNavbar.Brand as={Link} to='/home'>
          Mastery
        </BSNavbar.Brand>
        <Nav>
          <Nav.Link as={Link} to='/habits'>
            Habits
          </Nav.Link>
          <Nav.Link as={Link} to='/skills'>
            Skills
          </Nav.Link>
          <Nav.Link as={Link} to='/mood'>
            Mood
          </Nav.Link>
          <Nav.Link as={Link} to='/signup' className='ms-2'>
            Register <FontAwesomeIcon className='ms-1' icon={faCircleUser} size='lg' />
          </Nav.Link>
        </Nav>
      </Container>
    </BSNavbar>
  );
};
