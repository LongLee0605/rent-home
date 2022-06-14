import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
    collection,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingsRef = collection(db, 'listings')

                // Create a query
                const q = query(
                    listingsRef, 
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                // Execute query
                const querySnap = await getDoc(q)

                let listings
            } catch (error) {
                
            }
        }

        fetchListings()
    })

    return (
        <div>
            Category
        </div>
    )
}

export default Category
