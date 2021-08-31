import { Typography, Paper } from "@material-ui/core";
import FollowButton from "../shared/FollowButton";
import React from "react";
import { getDefaultUser } from "../../data";
import { useFeedSideSuggestionsStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { LoadingIcon } from "../../icons";

function FeedSideSuggestions() {
  const classes = useFeedSideSuggestionsStyles();

  let loading = false;

  return (
    <article className={classes.article}>
      <Paper className={classes.paper}>
        <Typography
          color = "textSecondary"
          variant = "subtitle2"
          component="h2"
          align="left"
          gutterBottom
          className={classes.typography}
          >
            Suggestions For you
        </Typography>
        {loading ? (
          <LoadingIcon />
        ) : (
          Array.from({ length: 5 }, () => getDefaultUser()).map(user => (
            <div key={user.id} className={classes.card}>
              <UserCard user={user} />
              <FollowButton side />
            </div>
          ))
        )}
      </Paper>
    </article>
  )
}

export default FeedSideSuggestions;
