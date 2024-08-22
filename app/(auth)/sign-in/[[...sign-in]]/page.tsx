import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignedInPage = () => {
    return (
        <main className="auth-page">
            <SignIn />
        </main>
    )
}

export default SignedInPage
