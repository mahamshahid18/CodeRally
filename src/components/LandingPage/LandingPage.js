import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';


const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit,
    textAlign: 'center',
    backgroundImage: 'url("assets/bg.png")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '100vh',
    marginTop: '-64px',
    paddingTop: '20vh',
    boxSizing: 'border-box',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    border: `2px solid ${deepPurple[900]}`,
    color: deepPurple[900],
    '&:hover': {
      backgroundColor: '#fff',
      border: '2px solid #fff',
    },
    fontWeight: 'bold',
    borderRadius: '100px',
    fontSize: '1.2em',
    padding: '15px 50px',
  },
  typingItem: {
    color: '#fff',
    fontWeight: 'bold',
  },
  typist: {
    display: 'inline',
  },
  improveSkillsTextBlock: {
    padding: '40px',
    fontSize: '3em',
  },
  aboutUs: {
    marginTop: '50px',
    fontSize: '1em',
    opacity: '.6',
  },
  aboutUsTitle: {
    fontSize: '2.2em',
  },
  attribution: {
    color: '#fff',
    fontSize: '10px',
    fontWeight: '200',
    opacity: '.5',
  },
});

const techList = [
  { tech: 'React', chars: 5 },
  { tech: 'NodeJS', chars: 6 },
  { tech: 'MongoDB', chars: 7 },
  { tech: 'Angular', chars: 7 },
  { tech: 'Express', chars: 7 },
  { tech: 'Frontend', chars: 9 },
];

const LandingPage = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.improveSkillsTextBlock}>
      <span>Improve your </span>
      <Typist className={classes.typist}>
        {techList.map(({ tech, chars }) => (
          <span key={tech}>
            <span className={classes.typingItem}>{tech}</span>
            <Typist.Backspace count={chars} delay={chars * 120} avgTypingDelay={120} />
          </span>
        ))}
        <span className={classes.typingItem}>FullStack</span>
      </Typist>
      <span>skills.</span>
    </div>
    <div>
      <Button
        href="/home"
        className={classes.button}
      >
        See Projects
      </Button>
    </div>
    <div className={classes.aboutUs}>
      <h2 className={classes.aboutUsTitle}>About Us</h2>
      <p>
        CodeRally is a project listing board for developers by developers.
      </p>
      <p>
        Contributing to open source can be intimidating.
      </p>
      <p>
        CodeRally gives you a simplified look at projects so you can pick a project easier.
      </p>
    </div>

    <div>
      <small className={classes.attribution}>
        Icons made by
        {' '}
        <a className={classes.attribution} href="http://www.freepik.com" title="Freepik">Freepik </a>
        from
        {' '}
        <a className={classes.attribution} href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com </a>
        is licensed by
        {' '}
        <a className={classes.attribution} href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY </a>
      </small>
    </div>
  </div>
);

export default withStyles(styles)(LandingPage);
