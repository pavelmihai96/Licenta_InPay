import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import { FiSettings } from 'react-icons/fi';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ProviderFacilities = () => {

    const { userId } = useParams();

    const [facilities, setFacilities] = useState([]);

    const [type, setType] = useState('');
    const [price, setPrice] = useState('');

    const [contractId, setContractId] = useState('');
    const [facilityName, setFacilityName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [serviceArea, setServiceArea] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleAddFacility = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setContractId('');
        setCompanyName('');
        setServiceArea('');
        setIsDialogOpen(false);
        setFacilityName('');
        setPrice('');
        setType('');
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            request('POST', `api/provider`, {
                contractId: contractId,
                companyName: companyName,
                serviceArea: serviceArea,
                facilityName: facilityName,
                type: type,
                price: price,
                createdAt: new Date().toISOString()
            }).then((response) => {
                console.log(response.data);
                handleCloseDialog();
                fetchTableData();
            }).catch((error) => {
                console.error("Eroare:", error);
                if (error.response && error.response.data && error.response.data.error) {
                    setMessage(error.response.data.error);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                } else {
                    setMessage('Unexpected error occurred.');
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                }
            });
    };

    const fetchTableData = async () => {
        setLoading(true);

        try {
            const f = await request("GET", `http://localhost:8082/api/provider`);
            setFacilities(f.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFacility = (providerId, facilityId) => {
        navigate(`/provider-facilities/${providerId}/${facilityId}`);
    }

    const columns = [
        {
            name: "Contract Id",
            selector: (row) => row.contractId,
        },
        {
            name: "Company name",
            selector: (row) => row.companyName,
        },
        {
            name: "Description",
            selector: (row) => row.facilityName,
        },
        {
            name: "Type",
            selector: (row) => row.type,
        },
        {
            name: "",
            cell: (row) => (
                <button className="settings-button" onClick={() => handleFacility(row.provider.providerId, row.facilityId)}>
                    <FiSettings size={20} />
                </button>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>Providers</h2>
                        <div className="data-table-header">
                            <button className="back-button" onClick={handleAddFacility}>New Provider</button>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={facilities}
                        progressPending={loading}
                        pagination
                        paginationPerPage={10}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>

                <dialog open={isDialogOpen}>
                    <form onSubmit={handleSubmit}>
                        <h3>Add new provider</h3>
                        <div>
                            { message && (
                                <label className="message-class">{message}</label>
                            )}
                        </div>
                        <label htmlFor="facilityName">Id: </label>
                        <input
                            type="text"
                            id="contractId"
                            name="contractId"
                            value={contractId}
                            onChange={(e) => setContractId(e.target.value)}
                            required
                        />
                        <label htmlFor="facilityName">Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                        <label htmlFor="facilityName">Service Area:</label>
                        <input
                            type="text"
                            id="serviceArea"
                            name="serviceArea"
                            value={serviceArea}
                            onChange={(e) => setServiceArea(e.target.value)}
                            required
                        />
                        <label htmlFor="facilityName">Facility Name:</label>
                        <input
                            type="text"
                            id="facilityName"
                            name="facilityName"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                            required
                        />

                        <div className="form-column">
                            <div className="tab-buttons">
                                <button
                                    type="button"
                                    className={type === 'GAS' ? 'active' : ''}
                                    onClick={() => setType('GAS')}
                                >
                                    Gas
                                </button>
                                <button
                                    type="button"
                                    className={type === 'ELECTRICITY' ? 'active' : ''}
                                    onClick={() => setType('ELECTRICITY')}
                                >
                                    Electricity
                                </button>
                                <button
                                    type="button"
                                    className={type === 'INTERNET' ? 'active' : ''}
                                    onClick={() => setType('INTERNET')}
                                >
                                    Internet
                                </button>
                                <button
                                    type="button"
                                    className={type === 'MOBILE' ? 'active' : ''}
                                    onClick={() => setType('MOBILE')}
                                >
                                    Mobile Service
                                </button>
                            </div>

                            {(type === 'INTERNET' || type === 'MOBILE') && (
                                <>
                                    <label>Monthly price</label>
                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </>
                            )}

                            {(type === 'GAS' || type === 'ELECTRICITY') && (
                                <>
                                    <label>Price / kwH</label>
                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </>
                            )}
                        </div>
                        <div>
                            <button type="button" onClick={handleCloseDialog}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
}

export default ProviderFacilities;