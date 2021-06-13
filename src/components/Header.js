import React, { useContext} from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserContext from './UserContext';

const Header = (props) => {
  const UseContext = useContext(UserContext)

  const renderButton = () => {
    if (UseContext.user.userToken) {
      return <Button href="/">Logout</Button>
    }
  }

  return (
    <div>
      <nav className="navbar navbar-inverse navbar-dark bg-dark">
        <a className="navbar-brand" href="#">SkillApp</a>

        <div className="navbar-nav">
          <span className="nav-item nav-link">
            {renderButton()}
          </span>
        </div>
      </nav>
    </div >
  );
}

export default withRouter(Header);