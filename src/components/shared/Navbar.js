import React from "react";
import { useNavbarStyles } from "../../styles";
import { AppBar, InputBase, Hidden } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import logo from '../../images/logo.png';
import { LoadingIcon, AddIcon, LikeIcon, LikeActiveIcon, ExploreIcon, ExploreActiveIcon, HomeIcon, HomeActiveIcon } from '../../icons';
import { defaultCurrentUser } from '../../data';

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        {!minimalNavbar && (
          <>
            <Search />
            <Links path={path} />
          </>
        )}
      </section>
    </AppBar>
  )
}

function Logo() {
  const classes = useNavbarStyles()

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWraper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  )
}

function Search() {
  const classes = useNavbarStyles();
  const [query, setQuery] = React.useState('');

  let loading = true;

  function handleClearInput() {
    setQuery('');
  }

  return (
    <Hidden xsDown>
      <InputBase
        className={classes.input}
        onChange = {event => setQuery(event.target.value)}
        startAdornment = {<span className={classes.searchIcon} />}
        endAdornment={
          loading ? (
            <LoadingIcon />
          ) : (
            <span onClick={handleClearInput} className={classes.clearIcon} />
          )
        }
        placeholder="Search"
        value = {query}
      />
    </Hidden>
  );
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setList] = React.useState();

  return (
    <div className={classes.linksContainer}>
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">
          {path === "/" ? <HomeActiveIcon /> : <HomeIcon />}
        </Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <div className={classes.notifications}>
          {showList ? <LikeActiveIcon /> : <LikeIcon />}
        </div>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div className={path === `/${defaultCurrentUser.username}` ?
          classes.profileActive : ""}>
          </div>
          {path === `/${defaultCurrentUser.username}` ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
