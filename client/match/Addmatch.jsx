
import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import { random } from "lodash";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: "auto",
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
    },
}));

export default function AddMatch({ }) {
    const classes = useStyles();
    const [state, setState] = useState({
        oponent1: "",
        oponent2: "",
        points: 0
    })
    const [matches, setMatches] = useState([]);
    const handleSubmit = (e) => {
        console.log(state)
        // Add the current match to the list of matches
        const newMatch = { ...state };
        setMatches([...matches, newMatch]);

        // Reset the form state
        setState({
            oponent1: "",
            oponent2: "",
            points: 0
        });
    }

    const handleChange = (oponent) => (event) => {
        setState({ ...state, [oponent]: event.target.value });
    };

    return (
        <Paper className={classes.root} elevation={4}>
            <FormControl fullWidth>
                Oponent1
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.oponent1}
                    label="oponent1"
                    onChange={handleChange("oponent1")}>
                    <MenuItem value="Pedro">Pedro</MenuItem>
                    <MenuItem value="Lucas">Lucas</MenuItem>
                    <MenuItem value="Camilo">Camilo</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            VS
            <br />
            <br />
            <FormControl fullWidth>
                Oponent2
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.oponent2}
                    label="oponent2"
                    onChange={handleChange("oponent2")}>
                    <MenuItem value="Pedro">Pedro</MenuItem>
                    <MenuItem value="Lucas">Lucas</MenuItem>
                    <MenuItem value="Camilo">Camilo</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            <Button variant="outlined" onClick={handleSubmit}>Save</Button>
            <br />
            <br />
            {/* Display section for created matches */}
            {matches.length > 0 && (
                <div className={classes.matchList}>
                    <Typography variant="h6">Matches Created:</Typography>
                    <List>
                        {matches.map((match, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Match ${index + 1}`}
                                        secondary={`Oponent 1: ${match.oponent1} - Oponent 2: ${match.oponent2}- Points: ${match.points}`}
                                    />
                                </ListItem>
                                <button>Delete</button><button>Update</button>
                                <br />
                                <br />
                                {index !== matches.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </div>
            )}
        </Paper>

    )
}