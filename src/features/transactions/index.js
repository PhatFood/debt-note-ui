import moment from "moment"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {showNotification} from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import {RECENT_TRANSACTIONS} from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import {openModal} from "../common/modalSlice";
import {MODAL_BODY_TYPES} from "../../utils/globalConstantUtil";

const AddNewTransactionButton = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title: "New transaction", bodyType: MODAL_BODY_TYPES.TRANSACTION_RECORD_ADD_NEW}))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New
            </button>
        </div>
    )
}

const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="float-right align-middle flex gap-2">
            <SearchBar searchText={searchText} styleClass="" setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()}
                                          className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon
                className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                {/*<label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>*/}
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-ox w-52">
                    {
                        locationFilters.map((l, k) => {
                            return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
            <AddNewTransactionButton/>
        </div>
    )
}

function Transactions() {

    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    })
    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
            return t.location == params
        })
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
            return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase())
        })
        setTrans(filteredTransactions)
    }
    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});

        const sortedData = [...trans].sort((a, b) => {
            if (key === 'amount') {
                return direction === 'asc'
                    ? parseFloat(a[key]) - parseFloat(b[key])
                    : parseFloat(b[key]) - parseFloat(a[key]);
            }
            if (key === 'date') {
                return direction === 'asc'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            return direction === 'asc'
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        });
        setTrans(sortedData);
    };
    return (<>
            <TitleCard topMargin="mt-2"
                       TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter}
                                                       removeFilter={removeFilter}/>}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th onClick={() => sortData('name')} className="cursor-pointer">
                                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => sortData('amount')} className="cursor-pointer">
                                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => sortData('date')} className="cursor-pointer">
                                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            trans.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={l.avatar} alt="Avatar"/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{l.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {/*<td>{l.email}</td>*/}
                                        {/*<td>{l.location}</td>*/}
                                        <td>${l.amount}</td>
                                        <td>{moment(l.date).format("D MMM YYYY")}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Transactions