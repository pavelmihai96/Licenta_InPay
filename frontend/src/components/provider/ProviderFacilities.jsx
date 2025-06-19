import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import '../../style/dialog.css';
import { FiSettings } from 'react-icons/fi';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";
import {FaHdd, FaWifi, FaUserShield, FaPhone, FaSignal, FaCheck, FaGasPump, FaBolt} from "react-icons/fa";

const ProviderFacilities = () => {

    const { userId } = useParams();

    const [facilities, setFacilities] = useState([]);

    const [page, setPage] = useState(1);

    const [contractId, setContractId] = useState(null);
    const [facilityName, setFacilityName] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [serviceArea, setServiceArea] = useState(null);
    const [type, setType] = useState(null);
    const [price, setPrice] = useState(null);

    const [wifi, setWifi] = useState(null);
    const [hdd, setHdd] = useState(null);
    const [parental, setParental] = useState(null);
    const [phone, setPhone] = useState(null);
    const [signal, setSignal] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [pump, setPump] = useState(null);
    const [bolt, setBolt] = useState(null);

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
        setContractId(null);
        setCompanyName(null);
        setServiceArea(null);
        setIsDialogOpen(false);
        setFacilityName(null);
        setPrice(null);
        setType(null);
        setMessage(null);
        setPage(1);
        setWifi(null);
        setHdd(null);
        setParental(null);
        setPhone(null);
        setSignal(null);
        setDiscount(null);
        setPump(null);
        setBolt(null);
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
                wifi: wifi,
                hdd: hdd,
                parental: parental,
                phone: phone,
                signal: signal,
                discount: discount,
                pump: pump,
                bolt: bolt,
                createdAt: new Date().toISOString()
            }).then((response) => {
                console.log(response.data);
                handleCloseDialog();
                fetchTableData();
            }).catch((error) => {
                console.error("Eroare:", error);
                if (error.response && error.response.data && error.response.data.error) {
                    setMessage(error.response.data.error);
                    console.log(error.response.data.error);
                    setTimeout(() => {
                        setMessage('');
                    }, 20000);
                } else {
                    setMessage('Please complete all fields.');
                    setTimeout(() => {
                        setMessage('');
                    }, 20000);
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
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>Providers</h2>
                        <div className="data-table-header">
                            <button className="new-provider" onClick={handleAddFacility}>New Provider</button>
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

                <dialog open={isDialogOpen} className="subscription-dialog">
                    <form onSubmit={handleSubmit} className="dialog-form">
                        <h3>Add new provider</h3>
                        <div>
                            { message && (
                                <label className="message-class" style={{color:"red", textAlign:"center"}}>{message}</label>
                            )}
                        </div>
                        {page === 1  && (
                            <div className="page1Container">
                                <label style={{marginBottom: "25px"}}><em>Fields annotated with <span style={{color: "red"}}>*</span> are mandatory</em></label>
                                        <label htmlFor="facilityName">Contract Id: <span style={{color: "red"}}>*</span></label>
                                        <input
                                            type="text"
                                            id="contractId"
                                            name="contractId"
                                            value={contractId}
                                            onChange={(e) => setContractId(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="facilityName">Company Name: <span style={{color: "red"}}>*</span></label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="facilityName">Service Area: <span style={{color: "red"}}>*</span></label>
                                        <input
                                            type="text"
                                            id="serviceArea"
                                            name="serviceArea"
                                            value={serviceArea}
                                            onChange={(e) => setServiceArea(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="facilityName">Facility Name: <span style={{color: "red"}}>*</span></label>
                                        <input
                                            type="text"
                                            id="facilityName"
                                            name="facilityName"
                                            value={facilityName}
                                            onChange={(e) => setFacilityName(e.target.value)}
                                            required
                                        />
                            </div>
                    )}
                        {page === 2 && (
                            <div className="page2Container">
                                <label style={{marginBottom: "25px"}}><em>Select the type of service agreed in the contract: <span style={{color: "red"}}>*</span></em></label><br/>
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
                                                    Mobile
                                                </button>
                                            </div>

                                            {(type === 'INTERNET' || type === 'MOBILE') && (
                                                <>
                                                    <label>Monthly price: <span style={{color: "red"}}>*</span></label>
                                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                </>
                                            )}

                                            {(type === 'GAS' || type === 'ELECTRICITY') && (
                                                <>
                                                    <label>Price / kwH: <span style={{color: "red"}}>*</span></label>
                                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                </>
                                            )}
                                        </div>
                            </div>
                        )}

                        {page === 3 && type === 'INTERNET' && (
                                <>
                                    <label><em>These fields are optional:</em></label>
                                    <FaWifi className="icon" style={{color:"black"}}/>
                                    <input type="text" placeholder="e.g. First router is free" value={wifi} onChange={(e) => setWifi(e.target.value)} />
                                    <FaHdd className="icon" style={{color:"black"}}/>
                                    <input type="text" placeholder="e.g. 20GB in DIGI Storage" value={hdd} onChange={(e) => setHdd(e.target.value)} />
                                    <FaUserShield className="icon" style={{color:"black"}}/>
                                    <input type="text" placeholder="e.g. Parental Control Activation" value={parental} onChange={(e) => setParental(e.target.value)} />
                                </>
                        )}
                        {page === 3 && type === 'MOBILE' && (
                            <>
                                <label><em>These fields are optional:</em></label>
                                <FaPhone className="icon" style={{color:"black"}}/>
                                <input type="text" placeholder="e.g. Unlimited calls inside the country" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <FaSignal className="icon" style={{color:"black"}}/>
                                <input type="text" placeholder="e.g. Unlimited mobile data" value={signal} onChange={(e) => setSignal(e.target.value)} />
                            </>
                        )}
                        {page === 3 && type === 'GAS' && (
                            <>
                                <label><em>These fields are optional:</em></label>
                                <FaCheck className="icon" style={{color:"black"}}/>
                                <input type="text" placeholder="e.g. Up to 100RON discount on your first invoice" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                <FaGasPump className="icon" style={{color:"black"}}/>
                                <input type="text" placeholder="e.g. First 500000 kwH with a reduced price" value={pump} onChange={(e) => setPump(e.target.value)} />
                            </>
                        )}
                        {page === 3 && type === 'ELECTRICITY' && (
                            <>
                                <label><em>These fields are optional:</em></label>
                                <FaCheck className="icon" style={{color:"black"}}/>
                                <input type="text" placeholder="e.g. Up to 100RON discount on your first invoice" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                <FaBolt className="icon" style={{color:"black"}}/>
                                <input type="text" placeholder="e.g. First 400000 kwH with a reduced price" value={bolt} onChange={(e) => setBolt(e.target.value)} />
                            </>
                        )}
                        {page === 3 && (
                            <div className="submit-button-wrapper">
                                <button type="submit">Add provider</button>
                            </div>
                        )}
                    </form>
                    <div className="bottom-div-provider-dialog">
                        <div className="dialog-footer-buttons">
                            <button className="dialog-cancel" type="button" onClick={handleCloseDialog}>Cancel</button>
                            {page > 1 && (
                                <button className="dialog-back"  onClick={() => setPage(page - 1)}>Back</button>
                            )}
                            {page < 3 && (
                                <button className="dialog-next"  onClick={() => setPage(page + 1)}>Next</button>
                            )}
                        </div>
                        <div className="dialog-bottom-item">
                            <label>{page} / 3</label>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
}

export default ProviderFacilities;