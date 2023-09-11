import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";



const NavBar = () => {
    return <>
        <div
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
            <div>

                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography variant={"h5"}> Chat app </Typography>
                </Link>

            </div>
            <div style={{
                marginTop:"8px",
                marginRight:"7px"
            }}>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined">
                        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography>Login</Typography>
                        </Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography>Register</Typography>
                        </Link>
                    </Button>


                </Stack>
            </div>


        </div>

    </>

}

export default NavBar;