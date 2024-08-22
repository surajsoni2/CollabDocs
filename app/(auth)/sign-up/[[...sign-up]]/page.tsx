import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignedUpPage = () => {
    return (
        <main className="auth-page">
            <SignUp />
        </main>
    )
}

export default SignedUpPage
