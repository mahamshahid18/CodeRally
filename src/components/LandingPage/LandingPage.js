import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';


const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    textAlign: 'center',
  },
  button: {
    backgroundColor: deepPurple[700],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: deepPurple[900],
    },
    padding: '15px',
    fontWeight: 'bold',
  },
  typingItem: {
    color: deepPurple[700],
    fontWeight: 'bold',
  },
  typist: {
    display: 'inline',
  },
  improveSkillsTextBlock: {
    padding: '40px',
    fontSize: '2em',
  },
  aboutUs: {
    marginTop: '50px',
    fontSize: '1.2em',
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
            Get Started
      </Button>
    </div>
    <div className={classes.aboutUs}>
      <h2>About Us</h2>
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
  </div>
);

export default withStyles(styles)(LandingPage);
