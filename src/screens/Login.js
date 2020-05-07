import React, {useState, useRef, useEffect} from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, RadioGroup, Radio  } from '@material-ui/core';
import axios from 'axios';
import { Face, Fingerprint } from '@material-ui/icons'
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

//class LoginTab extends React.Component {


function LoginTab(props) {
        const ButtonGRP = useRef(); 
        const [loginLabel, setLabel] = useState("Login");
        const [posts, setPosts] = useState(null);
        const [UserID, setUserID] = useState('');
        const [Pwd, setPwd] = useState('');
        const { classes } = props;
               
        function setLoginLabel(ev) {
            if (ev.target.value == "Login")
            {
                setLabel("Login");
            }
            else
            {
                setLabel("Create Account");
            }
        }

        function UserIDChange(ev)
        {
            setUserID(ev.target.value);
        }

        function PwdChange(ev)
        {
            setPwd(ev.target.value);
        }

        function LoginClick() {
            var LoginURL = "";
            if (loginLabel == "Login")
            {
                LoginURL="http://apicall.starshipfleets.com/User/UserLoginCall";
            }
            else
            {
                LoginURL="http://apicall.starshipfleets.com/User/CreateLoginCall";
            }            
            axios.post(LoginURL, 
            { 
                UserEmail: UserID,
                Password: Pwd
            }
            )
            .then(function (response) {
                setPosts(response.data);  
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                console.log(posts);      
            });
        }

        useEffect(() => {
            if (posts)
            {
                if (posts.userID)
                {
                    alert("Loged In");
                    window.location.assign("/PlanetList");
                }
                else
                {
                    alert("No User");
                }  
            }
        },[posts]);


        return (
            <div style={{alignItems:"center", width:"60%", margin:"auto"}}>
                LOGIN . CREATE USER
                <RadioGroup ref={ButtonGRP} row aria-label="AccountType" name="AccountType" onChange={setLoginLabel} value={loginLabel}  >
                    <FormControlLabel value="Login" control={<Radio />} label="Login" />
                    <FormControlLabel value="Create Account" control={<Radio />} label="Create Account" />    
                </RadioGroup>

                <Paper className={classes.padding} >
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Username" type="email" fullWidth autoFocus required 
                                onChange={UserIDChange} value={UserID}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="Password" label="Password" type="password" fullWidth required 
                                onChange={PwdChange} value={Pwd}/>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                    />
                                } label="Remember me" />
                            </Grid>
                            <Grid item>
                                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={LoginClick}>
                                {loginLabel}
                            </Button>
                        </Grid>
                    </div>
                </Paper>
            </div>
        );
    
}

export default withStyles(styles)(LoginTab);