import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import AppService from '../../services/AppService';
import './Project.css';


const getLinkElement = (linkName, linkValue) => {
  if (linkValue !== '') {
    return (
      <a
        className={`link-item ${linkName}`}
        href={linkValue}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkName}
      </a>
    );
  }
}

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
      <Grid container spacing={0}>
        <Grid item container xs={12} spacing={0}>
          <Card className="card">
            <CardContent>
              <Typography className="title" variant="title" component="h1">
                {project ? project.name : ''}
              </Typography>
              <Typography className="links-container" component="div">
                {getLinkElement('Website', project && project.link ? project.link : '')}
                {getLinkElement('Repo', project && project.repoLink ? project.repoLink : '')}
                {getLinkElement('Chat', project && project.chatLink ? project.chatLink : '')}
              </Typography>
              <Typography className="description" component="p">
                {project ? project.description : ''}
              </Typography>
              <Typography className="tech-container" component="div">
                <Typography className="tech-title" component="h2">
                  {'Tech Stack'}
                </Typography>
                <Chip
                  label={project && project.tech ? project.tech : ''}
                  className="chip-divider"
                  color="secondary"
                />
              </Typography>
              <Typography className="resources-container" component="div">
                <Typography className="resources-title" component="h2">
                  {'Resources Needed'}
                </Typography>
                <div className="resource-items">
                  <Chip
                    label={project && project.partners ? project.partners : ''}
                    className="chip-divider"
                    color="primary"
                  />
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
