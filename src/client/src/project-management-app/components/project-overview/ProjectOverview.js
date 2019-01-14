import React from 'react'
import { Link } from 'react-router-dom'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core'
import ownClasses from './ProjectOverview.module.css'

const ProjectOverview = ({ title, description, _id, classes }) => (
  <div className={classes.root}>
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          <Link to={`/dashboard/projects/${_id}`} className={ownClasses.link}>
            <h1>{title}</h1>
          </Link>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.description}>{description}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

const styles = theme => ({
  root: {
    width: '80%',
    margin: '2rem auto'
  },
  heading: {
    fontSize: '.7rem',
    fontWeight: theme.typography.fontWeightRegular
  },
  description: {
    color: '#37423E'
  },
  panel: {
    backgroundColor: '#fffaef'
  }
})

export default withStyles(styles)(ProjectOverview)
