import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core'
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdChat } from 'react-icons/md'
import { BiSearchAlt2 } from 'react-icons/bi'
import * as EmailValidator from "email-validator"
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'

function Sidebar({ email }) {
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
                    <IconButton>
                        <MdChat />
                    </IconButton>
                    <IconButton>
                        <BsThreeDotsVertical />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <BiSearchAlt2 size={23} />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SideBarButton onClick={createChat}>START A NEW CHAT</SideBarButton>
            {chatsSnapshots?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} email={email} />
            ))}
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
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
    background-color: #f2f2f2;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 70px;
    border-bottom: 1px solid whitesmoke;
`
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    
    :hover {
        opacity: 0.8
    }`
const IconsContainer = styled.div``