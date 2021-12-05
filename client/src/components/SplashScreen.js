import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/private-theming';
import { createTheme, textAlign, width } from '@mui/system';
import { Box } from '@mui/system';
import { Button } from '@mui/material';   
import { useHistory } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 790,
    bgcolor: '#d3af35',
    border: '2px solid #000',
    boxShadow: 2,
    p: 4,
  };

const createStyle = {
    position: "absolute",
    top: "71.5%",
    left: "35%",
    textAlign: "left",
    fontSize: "20px",
    color: "#111111",
    width: 700,
    fontWeight: "bold"
}

const loginStyle = {
    position: "absolute",
    top: "81.5%",
    left: "35%",
    textAlign: "left",
    fontSize: "20px",
    color: "#111111",
    width: 700,
    fontWeight: "bold"
}

const guestStyle = {
    position: "absolute",
    top: "91.5%",
    left: "35%",
    textAlign: "left",
    fontSize: "20px",
    color: "#111111",
    width: 700,
    fontWeight: "bold"
}
export default function SplashScreen() {

    const history = useHistory();

    const handleCreateAccount = () => {
        history.push("/register/")
    }

    const handleLogin = () => {
        history.push("/login/")
    }

    return (
        <div id="splash-screen">
            <Typography id = "splash-screen-title">The Top 5 Lister</Typography>
            <Box sx = {style}>
                <Typography id= "splash-text" variant="h6" component="h1">
                    Have you ever wondered about who actually cares about your opinon? We certainly do! Whether it be your favorite dinner meals or your favorite video games, the Top 5 Lister allows you to rank the 5 best things in any category.  If you don't want to create your own, feel free to browse through lists created by other users and share your thoughts on them.
                </Typography>
            </Box>
            <Button onClick = {handleCreateAccount} id = "splash-button-create" variant = "outlined" sx = {{width: 220}}>Create Account</Button>
            <Box sx = {createStyle}>First time? Click here to create an account and start making lists.</Box>
            <Button  onClick = {handleLogin} id = "splash-button-login" variant = "outlined" sx = {{width: 220}}>Login</Button>
            <Box sx = {loginStyle}>Welcome back! Click here to login.</Box>
            <Button id = "splash-button-guest" variant = "outlined" sx = {{width: 220}}>Continue As Guest</Button>
            <Box sx = {guestStyle}>Just want to browse? Click here to continue as guest.</Box>
        </div>
    )
}