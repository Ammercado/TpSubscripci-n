import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Beneficios from './beneficio';

const estilo = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

class Inicio extends Component {

  render() {
    const { classes } = this.props;
    const free = props => <Link to={{pathname: '/registro', state: 'free'}} {...props}/>
    const premiun = props => <Link to={{pathname: '/registro', state: 'premiun'}} {...props}/>
  return (
    <div className={classes.root}>
        <Button
          component={free}
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '50%',
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url('http://www.pilaradiario.com/u/fotografias/m/2016/11/15/f960x0-43089_43107_15.jpg')`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              Free
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </Button>
        <Button
          component={premiun}
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '50%',
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url('https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2016/11/14/74.jpg')`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              Premiun
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </Button>
      <Beneficios />
    </div>

  );
}
}
Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(estilo)(Inicio);