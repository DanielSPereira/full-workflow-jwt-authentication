import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider'

export function Loading() {
    const { verifyUserAuthentication, setIsVerifyingOnLoading } = useAuth()

    useEffect(() => {
        (async () => {
            await verifyUserAuthentication()

            setIsVerifyingOnLoading(false)
        })()
    })

    return <h1>Loading...</h1>;
}
