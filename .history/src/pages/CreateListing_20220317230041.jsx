import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)

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
        boolean = null

        if(e.target.value === 'true') {
            boolean = true
        }
        if(e.target.value === 'false') {
            boolean = false
        }
    }

    // Files
    if(e.target.files) {
        setFormData((prevState) => ({
            ...prevState,
            images: e.target.files
        }))
    }
    // Text/Boolean/Numbers
    if(!e.target.files) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.value]: boolean ?? e.target.value
        }))
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div className='profile'>
            <header>
                <p className="pageHeader">T???o Danh S??ch</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Nh?? b??n / Nh?? cho thu??</label>
                    <div className='formButtons'>
                        <button 
                            type='button'
                            className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='sale'
                            onClick={onMutate}
                        >
                            Nh?? b??n
                        </button>

                        <button 
                            type='button'
                            className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='rent'
                            onClick={onMutate}
                        >
                            Nh?? cho thu??
                        </button>
                    </div>

                    <label className="formLabel">T??n</label>
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

                    <div className="formRooms flex">
                        <div>
                            <label className="formLabel">Ph??ng ng???</label>
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
                            <label className="formLabel">Nh?? v??? sinh</label>
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

                    <label className="formLabel">B??i ?????u xe</label>
                    <div className="formButtons">
                        <button
                            className={parking ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='parking'
                            value={true}
                            onClick={onMutate}
                        >
                            C??
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
                            Kh??ng
                        </button>
                    </div>

                    <label className="formLabel">N???i th???t</label>
                    <div className="formButtons">
                        <button
                            className={furnished ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='furnished'
                            value={true}
                            onClick={onMutate}
                        >
                            C??
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
                            Kh??ng
                        </button>
                    </div>

                    <label className="formLabel">?????a ch???</label>
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
                                <label className="formLabel">V?? ?????</label>
                                <input 
                                    type="number" 
                                    className='formInputSmall'
                                    id='latitude'
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>

                            <div>
                                <label className="formLabel">Kinh ?????</label>
                                <input 
                                    type="number" 
                                    className='formInputSmall'
                                    id='longitude'
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <label className="formLabel">Gi???m gi??</label>
                    <div className="formButtons">
                        <button
                            className={offer ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='offer'
                            value={true}
                            onClick={onMutate}
                        >
                            C??
                        </button>

                        <button
                            className={
                                !offer && offer !== null ? 'formButtonActive'
                                : 'formButton'
                            }
                            type='button'
                            id='offer'
                            value={false}
                            onClick={onMutate}
                        >
                            Kh??ng
                        </button>
                    </div>

                    <label className="formLabel">Gi??</label>
                    <div className="formPriceDiv">
                        <input 
                            type="number" 
                            className='formInputSmall'
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onMutate}
                            min='50'
                            max='750000000'
                            required
                        />
                        {type === 'rent' && <p className="formPriceText">$ / Th??ng</p>}
                    </div>
                    {offer && (
                        <>
                            <label className="formLabel">Gi??</label>
                            <input 
                                type="number" 
                                className='formInputSmall'
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required={offer}
                            />
                        </>
                    )}

                    <label className="formLabel">H??nh ???nh</label>
                    <p className="imagesInfo">H??nh ???nh trang b??a</p>
                    <input 
                        type="file" 
                        className='formInputFile'
                        id='images'
                        onChange={onMutate}
                        max='6'
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                    />
                    <button type='submit' className='primaryButton createListingButton'>
                        T???o Danh S??ch
                    </button>
                </form>
            </main>
        </div>
    )
}

export default CreateListing
