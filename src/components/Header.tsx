import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingTop: '20px',
    paddingBottom: '30px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '20px',
      flexDirection: 'row'
    }
  },
  header: {
    lineHeight: '1.25em',
    marginBottom: '1em',
    textAlign: 'center',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      marginBottom: '0',
    }
  },
}));

export default () => {
  const classes = useStyles();

  const name = "Aaron Maldonado's";
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" className={classes.header}>
          {name} EOG React Visualization Assessment
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
