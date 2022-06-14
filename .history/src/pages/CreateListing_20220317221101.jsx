import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import SignIn from './SignIn'

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    })

    const {
        type, 
        name, 
        bedrooms, 
        bathrooms, 
        parking, 
        furnished, 
        address, 
        offer, 
        regularPrice, 
        discountedPrice, 
        images, 
        latitude, 
        longitude
    } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    const onSubmit = (e) => {
        e.preventDefault()
    }

    const onMutate = (e) => {
        
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div className='profile'>
            <header>
                <p className="pageHeader">Tạo Danh Sách</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Nhà bán / Nhà cho thuê</label>
                    <div className='formButtons'>
                        <button 
                            type='button'
                            className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='sale'
                            onClick={onMutate}
                        >
                            Nhà bán
                        </button>

                        <button 
                            type='button'
                            className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='rent'
                            onClick={onMutate}
                        >
                            Nhà cho thuê
                        </button>
                    </div>

                    <label className="formLabel">Tên</label>
                    <input 
                        type="text" 
                        className='formInputName'
                        id='name'
                        value={name}
                        onChange={onMutate}
                        maxLength='32'
                        minLength='10'
                        required
                    />
                </form>

                <div className="formRooms flex">
                    <div>
                        <label className="formLabel">Phòng ngủ</label>
                        <input 
                        type="number" 
                        className='formInputSmall'
                        id='bedrooms'
                        value={bedrooms}
                        onChange={onMutate}
                        min='1'
                        max='50'
                        required
                        />
                    </div>
                    <div>
                        <label className="formLabel">Nhà vệ sinh</label>
                        <input 
                        type="number" 
                        className='formInputSmall'
                        id='bedrooms'
                        value={bedrooms}
                        onChange={onMutate}
                        min='1'
                        max='50'
                        required
                        />
                    </div>
                </div>

                <label className="formLabel">Bãi đậu xe</label>
                <div className="formButtons">
                    <button
                        className={parking ? 'formButtonActive' : 'formButton'}
                        type='button'
                        id='parking'
                        value={true}
                        onClick={onMutate}
                    >
                        Có
                    </button>

                    <button
                        className={
                            !parking && parking !== null ? 'formButtonActive'
                            : 'formButton'
                        }
                        type='button'
                        id='parking'
                        value={false}
                        onClick={onMutate}
                    >
                        Không
                    </button>
                </div>

                <label className="formLabel">Nội thất</label>
                <div className="formButtons">
                    <button
                        className={furnished ? 'formButtonActive' : 'formButton'}
                        type='button'
                        id='furnished'
                        value={true}
                        onClick={onMutate}
                    >
                        Có
                    </button>

                    <button
                        className={
                            !furnished && furnished !== null ? 'formButtonActive'
                            : 'formButton'
                        }
                        type='button'
                        id='furnished'
                        value={false}
                        onClick={onMutate}
                    >
                        Không
                    </button>
                </div>

                <label className="formLabel">Địa chỉ</label>
                <textarea 
                    className='formInputAddress'
                    type='text'
                    id='address'
                    value={address}
                    onChange={onMutate}
                    required
                />

                {!geolocationEnabled && (
                    <div className="formLatLng flex">
                        <div>
                            <label className="formLabel">Vĩ độ</label>
                            <input 
                                type="number" 
                                className='formInputSmall'
                                id='latitude'
                                value={latitude}
                                onChange={onMutate}
                                required
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default CreateListing
