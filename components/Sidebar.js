import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/morevert'
import SearchIcon from '@material-ui/icons/search'
import * as EmailValidator from "email-validator"
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'

function Sidebar() {
    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshots] = useCollection(userChatRef)

    const createChat = () => {
        const input = prompt('Please enter email address for the user you wish to chat with')

        if (!input) { return null }

        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            db.collection('chats').add({ users: [user.email, input] })
        }
    }

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshots?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0)

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <IconsContainer>
                    <IconButton>   <ChatIcon /></IconButton>
                    <IconButton>   <MoreVertIcon /></IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SideBarButton onClick={createChat}>START A NEW CHAT</SideBarButton>
            {chatsSnapshots?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`

const SearchInput = styled.input`
    outline-width:0;
    border: none;
    flex: 1;
`

const SideBarButton = styled(Button)`
    width: 100%;
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`

const Header = styled.div`  
    display: flex;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    
    :hover {
        opacity: 0.8
    }`
const IconsContainer = styled.div``