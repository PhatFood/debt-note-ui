import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setPageTitle} from '../../features/common/headerSlice'
import Contacts from '../../features/contacts'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({title: "Leads"}))
    }, [])


    return (
        <Contacts/>
    )
}

export default InternalPage