import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc }

function OAuth() {
    return (
        <div>
            Google
        </div>
    )
}

export default OAuth
