import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

function Profile() {
    const [user, setUser] = useState(null)

    const auth = getAuth()

    useEffect(() => {
        
    }, [])
    return (
        <div>
            kkkkk
        </div>
    )
}

export default Profile
