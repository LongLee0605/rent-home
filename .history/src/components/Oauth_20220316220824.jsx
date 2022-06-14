import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            
            // Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: 
                })
            }
        } catch (error) {
            
        }
    }

    return (
        <div className='socialLogin'>
            <p>Đăng {location.pathname === '/sign-up' ? 'ký' : 'nhập'} bằng</p>
            <button className='socialIconDiv' onClick={onGoogleClick}>
                <img className='socialIconImg' src={googleIcon} alt="google" />
            </button>
        </div>
    )
}

export default OAuth
