import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddProjectModal from '../AddProjectModal/AddProjectModal';
import AppService from '../../services/AppService';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  icon: {
    margin: theme.spacing.unit * 2,
    backgroundColor: deepPurple[700],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: deepPurple[800],
    },
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    position: 'absolute',
  },
  tableWrapper: {
    marginTop: '10px',
  },
  tableHeader: {
    backgroundColor: grey[100],
  },
  button: {
    '&:hover': {
      backgroundColor: grey[300],
    },
    color: deepPurple[700],
  },
  addButton: {
    backgroundColor: deepPurple[700],
    '&:hover': {
      backgroundColor: deepPurple[800],
    },
    color: theme.palette.common.white,
    margin: '0 10px',
  },
  chip: {
    backgroundColor: yellow[500],
    color: grey[900],
    marginLeft: 10,
    fontWeight: 'bold',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.19)',
    height: '2.0em',
    fontSize: '0.825em',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProjects: true,
      modalOpen: false,
      snackbarOpen: false,
      initialProjects: [],
      projects: [],
      snackbarText: '',
    };
    this.addProject = this.addProject.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.renderSnackbar = this.renderSnackbar.bind(this);
    this.filterProjects = this.filterProjects.bind(this);
  }

  async componentDidMount() {
    this.fetchProjects();
  }

  async fetchProjects() {
    const projects = await AppService.getProjects();
    // sorting projects by earliest date created
    this.setState({
      projects: [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    });
    this.setState({ initialProjects: projects });
    this.setState({ loadingProjects: false });
  }

  addProject() {
    this.setState({ modalOpen: true });
  }

  modalClosed() {
    this.setState({ modalOpen: false });
    this.fetchProjects();
  }

  filterProjects(event) {
    const { initialProjects } = this.state;
    let updatedProject = initialProjects;
    updatedProject = updatedProject.filter((item) => {
      const query = event.target.value.toLowerCase();
      const tableContent = `${item.name}${item.description}${item.tech}`;

      return tableContent.toLowerCase().indexOf(query) >= 0;
    });
    this.setState({ projects: updatedProject });
  }

  renderSnackbar({ snackbarText }) {
    this.setState({ snackbarOpen: true, snackbarText });
    setTimeout(() => {
      this.setState({ snackbarOpen: false });
    }, 5000);
  }

  renderProjects() {
    const { projects, loadingProjects } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Grid container justify="space-between" alignItems="flex-end" spacing={0}>
          <Hidden only={['xs', 'sm']}>
            <Grid item>
              <TextField
                label="Search"
                margin="normal"
                style={{ marginLeft: '10px', width: '280px', marginBottom: '10px' }}
                onChange={this.filterProjects}
              />
            </Grid>
          </Hidden>
          <Grid item>
            <Button onClick={this.addProject} className={classes.addButton}>List a Project</Button>
          </Grid>
        </Grid>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell id="col_name">Name</TableCell>
                <Hidden only={['xs', 'sm', 'md']}>
                  <TableCell>Description</TableCell>
                </Hidden>
                <Hidden only={['xs', 'sm']}>
                  <TableCell>Tech</TableCell>
                </Hidden>

                <TableCell>Project Page</TableCell>
              </TableRow>
            </TableHead>
            {!loadingProjects && (
              <TableBody>
                {projects.map(({
                  name, description, tech, createdAt,
                }) => {
                  const currentDate = new Date();
                  const projectDate = new Date(createdAt);
                  const timeDiff = Math.abs(currentDate.getTime() - projectDate.getTime());
                  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                  return (
                    <TableRow key={name}>
                      {diffDays < 5 ? (
                        <TableCell>
                          {name}
                          <Chip className={classes.chip} label="NEW" />
                        </TableCell>
                      ) : (
                        <TableCell>{name}</TableCell>
                      )}
                      <Hidden only={['xs', 'sm', 'md']}>
                        <TableCell>{description}</TableCell>
                      </Hidden>
                      <Hidden only={['xs', 'sm']}>
                        <TableCell>{tech}</TableCell>
                      </Hidden>
                      <TableCell>
                        <Button className={classes.button} href={`/projects/${name}`}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
          {loadingProjects && <LinearProgress />}
        </div>
      </Paper>
    );
  }

  render() {
    const { modalOpen, snackbarOpen, snackbarText } = this.state;
    return (
      <div>
        <div>{this.renderProjects()}</div>
        <AddProjectModal
          open={modalOpen}
          modalClosed={this.modalClosed}
          renderSnackbar={this.renderSnackbar}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackbarText}</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
