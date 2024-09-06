import { Box, styled } from "@mui/material"
import { useContext , useState, useEffect, useRef} from "react"
import Footer from "./Footer"
import { AccountContext } from "../../../context/AccountProvider"
import { newMessage, getMessages } from "../../../service/api"
import Message from "./Message"


const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`
const Component = styled(Box)`
    height: 75vh;
    overflow-y: scroll;
`
const Container = styled(Box)`
    padding: 1px 80px;
`
const Messages = ({ person, conversation })=>{

    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])
    const { account, socket } = useContext(AccountContext)
    const [newMessageFlag, setNewMessageFlag] = useState(false)
    const [file, setFile] = useState()
    const scrollRef = useRef()
    const [incomingMessages, setIncomingMessages] = useState(null)
    
    useEffect(()=>{
        socket.current.on('getMessage', data=>{
           setIncomingMessages({
            ...data,
            createdAt: Date.now()
           })  
        })
    },[])

    useEffect(()=>{
        const getMessageDetails = async()=>{
            let data = await getMessages(conversation._id)
            setMessages(data)            
        }
        conversation._id && getMessageDetails()
    }, [person._id, conversation._id, newMessageFlag])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({transition: 'smooth'})
    },[messages])

    useEffect(()=>{
        incomingMessages && conversation?.members.includes(incomingMessages.senderId) &&
        setMessages(prev =>[...prev, incomingMessages])
    }, [incomingMessages, conversation])
    

    const sendText = async(e)=>{
        const code = e.keyCode || e.which;
        if(code === 13){
            let message = {
                senderId: account.sub,
                receiverId: person.sub,
                conversationId: conversation._id,
                type: 'text',
                text: value
            }
            
            socket.current.emit('sendMessage', message)
            await newMessage(message)
            setValue('')
            setNewMessageFlag(prev => !prev)
        }
    }

    return(
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message=>(
                        <Container ref = {scrollRef}>
                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Footer
                sendText={sendText}
                setValue={setValue}
                value={value}
                file = {file}
                setFile = {setFile}
             />
        </Wrapper>
    )
}

export default Messages