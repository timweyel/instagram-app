import React from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import { AppBar, InputBase, Hidden, Avatar, Grid, Fade, Typography, Zoom } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import logo from '../../images/logo.png';
import { LoadingIcon, AddIcon, LikeIcon, LikeActiveIcon, ExploreIcon, ExploreActiveIcon, HomeIcon, HomeActiveIcon } from '../../icons';
import NotificationTooltip from '../notification/NotificationTooltip';
import NotificationList from '../notification/NotificationList';
import { defaultCurrentUser, getDefaultPost, getDefaultUser } from '../../data';

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
            <Search history={history}/>
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

function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState('');
  
  const hasResults = Boolean(query) && results.length > 0;

  React.useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()))
  }, [query])

  function handleClearInput() {
    setQuery('');
  }

  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map(result => (
                <Grid
                  key={result.id}
                  item
                  className={classes.resultLink}
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput()
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">
                        {result.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }  
      >
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
      </WhiteTooltip>
    </Hidden>
  );
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setList] = React.useState(true);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleToggleList() {
    setList(prev => !prev);
  }

  function handleHideTooltip() {
    setShowTooltip(false);
  }

  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList />}
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
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
        <div className={classes.notifications} onClick={handleToggleList}>
          {showList ? <LikeActiveIcon /> : <LikeIcon />}
        </div>
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div className={path === `/${defaultCurrentUser.username}` ?
          classes.profileActive : ""}>
          </div>
          <Avatar 
            src={defaultCurrentUser.profile_image}
            className={classes.profileImage}
          />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
