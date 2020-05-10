import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'lightblue',
    fontWeight: "bold",
    zIndex: 100,
    borderWidth: "1px", 
    borderColor: "black", 
    borderStyle: "solid"

   },
  nested: {
    paddingLeft: theme.spacing(4),
    borderBottomWidth: "1px",
    borderBottomColor: "black", 
    borderBottomStyle: "dashed"
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [PlanetOpen, setPlanetOpen] = React.useState(false);
  const [ShipOpen, setShipOpen] = React.useState(false);

  const PlanetClick = () => {
    setPlanetOpen(!PlanetOpen);
    setShipOpen(false);
  };
  const ShipClick = () => {
    setShipOpen(!ShipOpen);
    setPlanetOpen(false);
  };

  function MenuClick(type)
  {
    window.location.assign(type);
  }
  const UserEmail = useSelector(state => state.user.UserEmail);

  return (
     <div> 
    <div style={{display:"inline-block", width:"50%", verticalAlign:"top"}}>
    <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Starshipfleets.com
            </ListSubheader>
        }
      className={classes.root}
    >
      <ListItem button onClick={PlanetClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Planets" />
        {PlanetOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={PlanetOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={() => MenuClick("/GalaxyView")}>
             <ListItemText primary="Galaxy" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={() => MenuClick("/SectorView")}>
            <ListItemText primary="Sector" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={() => MenuClick("/SystemView")}>
            <ListItemText primary="System" />
          </ListItem>
          <ListItem button className={classes.nested}  onClick={() => MenuClick("/PlanetList")}>
            <ListItemText primary="Planet List" />
          </ListItem>
          <ListItem button className={classes.nested}  onClick={() => MenuClick("/PlanetDetail")}>
            <ListItemText primary="Planet Type" />  
          </ListItem>
          <ListItem button className={classes.nested}  onClick={() => MenuClick("/")}>
            <ListItemText primary="Login" />  
          </ListItem>
        </List>
      </Collapse>
    </List>
    </div>

    <div style={{display:"inline-block", width:"50%", verticalAlign:"top"}}>
    <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
               {UserEmail}
            </ListSubheader>
        }
        className={classes.root}
    >
    <ListItem button onClick={ShipClick}>
        <ListItemIcon>
        <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Ships" />
        {ShipOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={ShipOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested} onClick={() => MenuClick("/GalaxyView")}>
            <ListItemText primary="Galaxy" />
        </ListItem>
        <ListItem button className={classes.nested} onClick={() => MenuClick("/SectorView")}>
            <ListItemText primary="Sector" />
        </ListItem>
        <ListItem button className={classes.nested} onClick={() => MenuClick("/SystemView")}>
            <ListItemText primary="System" />
        </ListItem>
        <ListItem button className={classes.nested}  onClick={() => MenuClick("/PlanetList")}>
            <ListItemText primary="Planet List" />
        </ListItem>
        <ListItem button className={classes.nested}  onClick={() => MenuClick("/PlanetDetail")}>
            <ListItemText primary="Planet Type" />  
        </ListItem>
        </List>
    </Collapse>
    </List>
    </div>
</div>
  );
}
