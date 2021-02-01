import { useState } from 'react'
import axios from 'axios'

function LoginRegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [error, setError] = useState('');
    const [displayRegistration, setDisplayRegistration] = useState(false);
    
    async function handleSubmit(event) {
        event.preventDefault();

        setError('');

        if(displayRegistration) {

            if(confirmPassword !== passwordReg) return setError('Passwords do not match');
            const userObject = { 'username': usernameReg, 'secret': passwordReg, 'confirm_secret': confirmPassword, 'first_name': firstName, 'last_name': lastName }
            const authObject = { 'Private-Key': '2e6d9038-d060-4db9-9a11-a792f642f052' }
            
            try {

                await axios.post('https://api.chatengine.io/projects/people/', userObject, { headers: authObject });
                
                localStorage.setItem('username', usernameReg);
                localStorage.setItem('password', passwordReg);

                window.location.reload();
                    
            } catch (error) {
                setError('Registration failed')
            }
            
        } else {
            
            const authObject = { 'Project-ID': '18a2e6be-6bf1-4371-86e6-9d65a4b3b2c2', 'User-Name': username, 'User-Secret': password }
            try {
                await axios.get('https://api.chatengine.io/chats', { headers: authObject });
                
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                
                window.location.reload();
            } catch (error) {
                setError('Incorrect credentials')
            }

        }
    }

    function pageHandler() {
        setDisplayRegistration(!displayRegistration);
        setError('');

        setUsername('');
        setPassword('');

        setUsernameReg('');
        setPasswordReg('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        
    }

    return (
        <div className="wrapper">
            <div hidden={ displayRegistration } className="form">
                <h1 className="title">Login</h1>
                <form onSubmit={ handleSubmit }>
                    <input type="text" value={ username } onChange={ (e) => setUsername(e.target.value) } className="input" placeholder="Username" required />
                    <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Login</span>
                        </button>
                        <button style={{color: '#FFFFFF'}} type="button" className="btn btn-link" onClick={ pageHandler }>Need an account? Register</button>
                    </div>
                    <h2 className="error">{ error }</h2>
                </form>
            </div>
            <div hidden={ !displayRegistration } className="form">
                <h1 className="title">Register</h1>
                <form onSubmit={ handleSubmit }>
                    <input type="text" value={ usernameReg } onChange={ (e) => setUsernameReg(e.target.value) } className="input" placeholder="Username" required />
                    <input type="password" value={ passwordReg } onChange={ (e) => setPasswordReg(e.target.value) } className="input" placeholder="Password" required />
                    <input type="password" value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) } className="input" placeholder="Confirm Password" required />
                    <input type="text" value={ firstName } onChange={ (e) => setFirstName(e.target.value) } className="input" placeholder="First Name" required />
                    <input type="text" value={ lastName } onChange={ (e) => setLastName(e.target.value) } className="input" placeholder="Last Name" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Register</span>
                        </button>
                        <button style={{color: '#FFFFFF'}} type="button" className="btn btn-link" onClick={ pageHandler }>Have an account? Login</button>
                    </div>
                    <h2 className="error">{ error }</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginRegisterForm
