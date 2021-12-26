import React, {useRef} from 'react';
import classes from '../style/navbar.module.css';

const Navbar = (props) => {

    const toggleBtnRef = useRef(null);
    const onClcik = function () {

        console.log(toggleBtnRef.current.classList);
    if (toggleBtnRef.current.classList.contains("active")) {
        toggleBtnRef.current.attributes.push("aria-expanded", "false");
        toggleBtnRef.current.attributes.push("aria-label", "menu");
        toggleBtnRef.current.classList.remove("active");
    } else {
        toggleBtnRef.current.classList.add("active");
        toggleBtnRef.current.attributes.push("aria-label", "close menu");
        toggleBtnRef.current.attributes.push("aria-expanded", "true");
    }
    };

    return (
        <div className={classes.siteheader}>
        <div className={classes.siteheaderwrapper}>
          <div className={classes.siteheaderstart}>
            <a href="/home" className={classes.brand}>Conatcts</a>
          </div>
          <div className={classes.siteheaderend}>
            <nav className={classes.nav}>
              <button  ref={toggleBtnRef} onClick={props.onOpenGroup} className={classes.navtoggle} aria-expanded="false" type="button">
                menu
              </button>
              <ul className={classes.navwrapper}>
                <li className={classes.navitem}><a href="/home/contact">Contacts</a></li>
                <li className={classes.navitem}><a href="/home/group">Groups</a></li>
                <li className={classes.navitem}><button onClick={props.onOpenGroup}>Create Group</button></li>
                <li className={classes.navitem}><a href="/signout">Sign out</a></li>
              </ul>
            </nav>            
          </div>
        </div>
      </div>
  
    )
}

export default Navbar;