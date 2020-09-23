
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import travelData from '../../fakeData/fakeData';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../../App';
import './DetailsItem.css'


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '45ch',
      },
    },

    rootE: {
        minWidth: 35,
        marginLeft:'10%',
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 180,
      },
      HotelBtn: {
        width:'95%',
      },
      TravelTitle:{
        fontSize:'50px',
        fontWeight:'bold',
      }
    }));

const DetailsItem = () => {
const classes = useStyles();
const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const {id} = useParams();
    const data = travelData;
    data.find(place => place.id === id)
    const TravelData = data[id].TravelTitle;
    setLoggedInUser(TravelData)

    return (
        <div className={" d-flex bd-highlight mb-3 align-items-center backgroundImag"}>
            <div style={{width:'48%',color:'white'}}>
                <h1 className={classes.TravelTitle}>{data[id].TravelTitle}</h1>
                <p>{data[id].TravelBody}</p>
            </div>

            <Card className={classes.rootE}>
                <CardContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>Origin</Typography>
                        <TextField id="filled-basic" required label={data[id].TravelTitle} variant="filled" /> <br/>
                        
                        <Typography className={classes.title} color="textSecondary" gutterBottom>Destination</Typography>
                        <TextField id="filled-basic" required label="Filled" variant="filled" /> <br/>

                        <TextField
                            id="date"
                            label="Form"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="To"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        /><br/>
                        <Link to="/Hotel">  <Button className={classes.HotelBtn} variant="contained" color="primary" disableElevation>Start Booking</Button></Link>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DetailsItem;