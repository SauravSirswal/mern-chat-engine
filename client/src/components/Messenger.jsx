import {AppBar, Toolbar, styled, Box} from "@mui/material";
import ChatDialog from "./chat/ChatDialog";
import LoginDialog from "./accounts/LoginDialog";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

const Component = styled(Box)`
    height: 100vh;
    background: #DCDCDC;
`
const Header = styled(AppBar)`
    height: 125px;
    background-color: #00a884;
    box-shadow : none;
`
const LoginHeader = styled(AppBar)`
    height: 200px;
    background-color: #00bfa5;
    box-shadow : none;
`

const Messenger = () =>{
    const {account} = useContext(AccountContext);
    
    return (
        <Component>
            {
                account ? 
                <>
                <Header>
                    <Toolbar>
                
                    </Toolbar>
                </Header>
                <ChatDialog/>
                </>
            :
            <>
            <LoginHeader>
                <Toolbar>
                
                </Toolbar>
            </LoginHeader>
            <LoginDialog/>
            </>
}
        </Component>
    )
}

export default Messenger;