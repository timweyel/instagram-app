import { Drawer, Hidden, IconButton, List } from "@material-ui/core";
import { Menu } from '@material-ui/icons'
import React from "react";
import Layout from "../components/shared/Layout";
import { useEditProfilePageStyles } from "../styles";

function EditProfilePage() {
  const classes = useEditProfilePageStyles();
  const [showDrawer, setDrawer] = React.useState(false);

  function handleToggleDrawer() {
    setDrawer(prev => !prev);
  }

  const option = [
    "Edit Profile",
    "Change Password",
    "Apps and Websites",
    "Email and SMS",
    "Push Notifications",
    "Manage Contacts",
    "Privacy and Security",
    "Login Activity",
    "Emails from Instagram"
  ]

  const drawer = (
    <List>

    </List>
  )

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
        <IconButton edge="start"
          onClick={handleToggleDrawer}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp impelementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={showDrawer}
              onClose={handleToggleDrawer}
              classes={{ paperAnchorLeft: classes.temporaryDrawer }}
            >

            </Drawer>
          </Hidden>
        </nav>
      </section>
    </Layout>
  )
}

export default EditProfilePage;
