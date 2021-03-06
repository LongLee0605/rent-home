import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(null)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async() => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if(loading) {
        return <Spinner />
    }

    return (
        <main>
            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 2000)
            }}>
                <img src={shareIcon} alt="shared" />
            </div>

            {shareLinkCopied && <p className='linkCopied'>Copy Link!</p>}

            <div className="listingDetails">
                <p className="listingName">
                    {listing.name} - $
                    {listing.offer 
                        ? listing.discountedPrice 
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                </p>
                <div className="listingLocation">{listing.location}</div>
                <div className="listingType">
                    Lo???i {listing.type === 'rent' ? 'Nh?? cho thu??' : 'Nh?? b??n'}
                </div>
                {listing.offer && (
                    <p className='discountPrice'>
                        Gi???m gi?? ${listing.regularPrice - listing.discountedPrice}
                    </p>
                )}

                <ul className="listingDetailsList">
                    <li>
                        {
                            listing.bedrooms > 1 
                                ? `${listing.bedrooms} Ph??ng ng???`
                                : '1 Ph??ng ng???'
                        }
                    </li>
                    <li>
                        {
                            listing.bathrooms > 1 
                                ? `${listing.bathrooms} Nh?? v??? sinh`
                                : '1 Nh?? v??? sinh'
                        }
                    </li>
                    <li>{listing.parking && 'B??i ?????u xe'}</li>
                    <li>{listing.furnished && 'N???i th???t'}</li>
                </ul>

                <p className="listingLocationTitle">V??? tr??</p>

                {/* Map */}

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=$
                        {listing.name}&listingLocation=$`}
                    >

                    </Link>
                )}
            </div>
        </main>
    )
}

export default Listing
