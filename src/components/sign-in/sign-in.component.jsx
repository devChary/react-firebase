import React from 'react'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../button/button.component'
import { signInWithGoogle } from '../../firebase/firebase.utils'

import { auth } from '../../firebase/firebase.utils';


import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '', password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);

            this.setState({ email: '', password: '' })
        } catch (err) {
            console.log(err);
        }

    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign In with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        handleChange={this.handleChange}
                        type="email"
                        label="email"
                        value={this.state.email}
                        required />

                    <FormInput
                        name="password"
                        handleChange={this.handleChange}
                        type="password"
                        label="password"
                        value={this.state.password}
                        required />
                    <div className="buttons">
                        <CustomButton type="submit"> Sign In </CustomButton>
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}> Sign In With Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;