import React, {Component} from 'react'
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipRaw from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const cardStyles = theme => ({
    root: {
      background: theme.palette.primary.main
    },
    title: {
      color: "white"
    }
  });
  
const styles = {
    card: {
        margin: "5% 25%"
    }
};
const Chip = withStyles(cardStyles)(ChipRaw);

class Location extends Component{
    componentDidMount() {
        this.props.onLoad();
    }

    render(){
        const {loading, data, temperatureinFahrenheit} = this.props;
        if (loading) return <LinearProgress />;
        const latitude = data.latitude ? data.latitude.toFixed(2) : "";
        const longitude = data.longitude ? data.longitude.toFixed(2) : "";
        const temperature = temperatureinFahrenheit ? temperatureinFahrenheit.toFixed(2) : "";

        return (
            <Card>
                <CardContent>
                <List>
                    <ListItem>
                        <ListItemText primary={`Latitude: ${latitude}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Longitude: ${longitude}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Temperature: ${temperature}°`} />
                    </ListItem>
                </List>
            </CardContent>
          </Card>
        );
    }
}

const mapState = (state, ownProps) => {
    console.log(state);
    const {loading, data} = state.location;
    const {temperatureinFahrenheit} = state.weather;
    return {loading, data, temperatureinFahrenheit};
  };
  
  const mapDispatch = dispatch => ({
    onLoad: () =>
      dispatch({
        type: actions.FETCH_DRONE_LOCATION
      })
  });
  
  export default connect(
    mapState,
    mapDispatch
  )(Location);