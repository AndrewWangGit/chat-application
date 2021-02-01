import { ChatEngine } from 'react-chat-engine'
import './App.css'
import ChatFeed from './components/ChatFeed'
import LoginRegisterForm from './components/LoginRegisterForm'

function App() {

    if(!localStorage.getItem('username')) return <LoginRegisterForm />

    return (
        <ChatEngine
            height="100vh"
            projectID="18a2e6be-6bf1-4371-86e6-9d65a4b3b2c2"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed { ... chatAppProps} />}
        />
    )
}

export default App