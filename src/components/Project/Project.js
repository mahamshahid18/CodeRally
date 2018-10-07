import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppService from '../../services/AppService';

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { project: null };
  }

  componentDidMount() {
    this.getProjectData();
  }

  async getProjectData() {
    const { match } = this.props;
    const { name } = match.params;
    const project = await AppService.getProjectByName(name);
    this.setState({ project });
  }

  render() {
    const { project } = this.state;

    return (
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12}>
          <br />
          <Typography
            styles={{ marginTop: '20px' }}
            variant="display1"
            align="center"
            component="h1"
            gutterBottom
          >
            {project ? project.name : ''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" className="description" align="center" paragraph>
            {project ? project.description : ''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="description" align="center" paragraph>
            <b>Tech Stack: </b>
            {project ? project.tech : ''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="description" align="center" paragraph>
            <b>Looking for partners: </b>
            {project ? project.partners : ''}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          {project && project.link ? (
            <Button
              href={project.link}
              style={{ backgroundColor: '#ff0000b3', color: 'white', margin: '10px' }}
              target="_blank"
            >
              Website
            </Button>
          ) : (
            ''
          )}
          {project && project.chatLink ? (
            <Button
              href={project.chatLink}
              style={{ backgroundColor: '#008000b3', color: 'white', margin: '10px' }}
              target="_blank"
            >
              Slack/Gitter
            </Button>
          ) : (
            ''
          )}
          {project && project.repoLink ? (
            <Button
              href={project.repoLink}
              style={{ backgroundColor: '#0072ffb3', color: 'white', margin: '10px' }}
              target="_blank"
            >
              Repo
            </Button>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    );
  }
}
