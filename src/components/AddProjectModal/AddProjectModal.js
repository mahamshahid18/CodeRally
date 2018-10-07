import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import {
  Grid, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import AppService from '../../services/AppService';
import { validateUrl, validateRepoLink } from '../../utils';

const SNACKBAR_SUCCESS_MESSAGE = 'Submitted. After a quick review, your project will be listed!';
const SNACKBAR_FAILURE_MESSAGE = 'Project failed to be added!';
const SNACKBAR_LINK_ERROR = 'Error validating website link!';
const SNACKBAR_CHAT_LINK_ERROR = 'Error validating chat link!';
const SNACKBAR_REPO_LINK_ERROR = 'Error validating repository link!';

const btnStyles = {
  margin: '10px',
};

const styles = theme => ({
  title: {
    paddingTop: '20px',
  },
  root: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  button: {
    backgroundColor: deepPurple[700],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: deepPurple[900],
    },
  },
  btnCancel: {
    backgroundColor: grey[500],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
});

class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      partners: '',
      tech: '',
      link: '',
      chatLink: '',
      repoLink: '',
      loading: false,
      showLinkError: false,
      showChatLinkError: false,
      showRepoLinkError: false,
    };
    this.fetchProjects = props.fetchProjects;
    this.renderSnackbar = props.renderSnackbar;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePartnersChange = this.handlePartnersChange.bind(this);
    this.handleTechChange = this.handleTechChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleChatLinkChange = this.handleChatLinkChange.bind(this);
    this.handleRepoLinkChange = this.handleRepoLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handlePartnersChange(e) {
    this.setState({ partners: e.target.value });
  }

  handleTechChange(e) {
    this.setState({ tech: e.target.value });
  }

  handleLinkChange(e) {
    if (validateUrl(e.target.value)) {
      this.setState({ link: e.target.value, showLinkError: false });
    } else {
      this.setState({ link: e.target.value, showLinkError: true });
    }
  }

  handleChatLinkChange(e) {
    if (validateUrl(e.target.value)) {
      this.setState({ chatLink: e.target.value, showChatLinkError: false });
    } else {
      this.setState({ chatLink: e.target.value, showChatLinkError: true });
    }
  }

  handleRepoLinkChange(e) {
    if (validateRepoLink(e.target.value)) {
      this.setState({ repoLink: e.target.value, showRepoLinkError: false });
    } else {
      this.setState({ repoLink: e.target.value, showRepoLinkError: true });
    }
  }

  handleClose() {
    const { modalClosed } = this.props;
    modalClosed();
  }

  async handleSubmit() {
    const { renderSnackbar } = this.props;
    const {
      showLinkError,
      showChatLinkError,
      showRepoLinkError,
      name,
      description,
      partners,
      tech,
      link,
      chatLink,
      repoLink,
    } = this.state;
    if (showLinkError) {
      const snackbarText = SNACKBAR_LINK_ERROR;
      renderSnackbar({ snackbarText });
      return;
    }
    if (showChatLinkError) {
      const snackbarText = SNACKBAR_CHAT_LINK_ERROR;
      renderSnackbar({ snackbarText });
      return;
    }
    if (showRepoLinkError) {
      const snackbarText = SNACKBAR_REPO_LINK_ERROR;
      renderSnackbar({ snackbarText });
      return;
    }
    this.setState({ loading: true });
    try {
      await AppService.postProject({
        name,
        description,
        partners,
        tech,
        link,
        chatLink,
        repoLink,
      });
      this.setState({
        name: '',
        description: '',
        partners: '',
        tech: '',
        link: '',
        chatLink: '',
        repoLink: '',
        loading: false,
      });
      const snackbarText = SNACKBAR_SUCCESS_MESSAGE;
      renderSnackbar({ snackbarText });
      this.handleClose();
    } catch (e) {
      this.setState({ loading: false });
      const snackbarText = SNACKBAR_FAILURE_MESSAGE;
      renderSnackbar({ snackbarText });
    }
  }

  render() {
    const {
      name,
      description,
      partners,
      tech,
      link,
      chatLink,
      repoLink,
      showLinkError,
      showChatLinkError,
      showRepoLinkError,
      loading,
    } = this.state;
    const { open, classes } = this.props;
    return (
      <span>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <Grid container>
            <Grid item xs={12}>
              <DialogTitle id="form-dialog-title" className={classes.title}>
                List Project
                {loading && <LinearProgress />}
              </DialogTitle>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  fullWidth
                  label="Project Name"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={this.handleDescriptionChange}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  fullWidth
                  label="Tech Stack"
                  value={tech}
                  onChange={this.handleTechChange}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  fullWidth
                  label="What partners are you looking for?"
                  value={partners}
                  onChange={this.handlePartnersChange}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  error={showLinkError}
                  helperText={showLinkError ? 'Please enter a valid https url' : ''}
                  fullWidth
                  label="Website"
                  value={link}
                  onChange={this.handleLinkChange}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  error={showChatLinkError}
                  helperText={showChatLinkError ? 'Please enter a valid https url' : ''}
                  fullWidth
                  label="Slack/Gitter"
                  value={chatLink}
                  onChange={this.handleChatLinkChange}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent className={classes.root}>
                <TextField
                  error={showRepoLinkError}
                  helperText={showRepoLinkError ? 'Please enter a valid github repo url' : ''}
                  fullWidth
                  label="Repo Link"
                  value={repoLink}
                  onChange={this.handleRepoLinkChange}
                />
              </DialogContent>
            </Grid>
            <Grid item container xs={12} justify="center" alignItems="center">
              <DialogActions className={classes.root}>
                <Button style={btnStyles} onClick={this.handleClose} className={classes.btnCancel}>
                  Cancel
                </Button>
                <Button style={btnStyles} onClick={this.handleSubmit} className={classes.button}>
                  Submit
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </span>
    );
  }
}

export default withStyles(styles)(AddProjectModal);
