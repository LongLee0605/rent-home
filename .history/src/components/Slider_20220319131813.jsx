import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)
    
            let listings = []
    
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listings)
            setLoading(false)
        }

        fetchListings()
    }, [])

    if(loading) {
        return <Spinner />
    }

    if()

    return listings && (
        <>
            <div className="exploreHeading">Nổi Bật</div>

            <Swiper slidersPerView={1} pagination={{clickable: true}}>
                {listings.map((data, id) => (
                    <SwiperSlide key={id} onClick={() => navigate(
                        `/category/${data.type}/${id}`
                    )}>
                        {/* <div
                            style={{
                                background: `url(${data.imgUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                            className='swiperSlideDiv'
                        > */}
                            {/* <p className="swiperSlideText">{data.name}</p> */}
                            {/* <p className="swiperSlidePrice">
                                ${data.discountedPrice ?? data.regularPrice}
                            </p> */}
                        {/* </div> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Slider