import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ProviderFacilitiesComponent = () => {

    const { userId } = useParams();

    const [facilities, setFacilities] = useState([]);
    const [facilityName, setFacilityName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData(userId);
    }, [userId]);

    const handleAddFacility = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setFacilityName('');
        setPrice('');
        setType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const p = await request("GET", `http://localhost:8080/api/provider/by-userId/${userId}`);
            request('POST', `api/facility`, {
                facilityName: facilityName,
                type: type,
                providerId: p.data.providerId,
                createdAt: new Date().toISOString()
            })
              .then((response) => {
                  request('POST', `api/${response.data.type.toLowerCase()}`, {
                      facilityId: response.data.facilityId,
                      price: price
                  })
                  .then((response) => {
                      console.log(response.data);
                  })

                  handleCloseDialog();
                  setIsDialogOpen(false);
                  fetchTableData(userId);
              })
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const fetchTableData = async (userId) => {
        setLoading(true);

        try {
            const provider = await request("GET", `http://localhost:8080/api/provider/by-userId/${userId}`);
            const response = await request("GET", `/api/facility/provider/${provider.data.providerId}`);

            setFacilities(response.data);
            console.log("facilities: " + response.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFacility = (facilityId) => {
        navigate(`/X/${facilityId}`)
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.facilityId,
        },
        {
            name: "Company name",
            selector: (row) => row.provider.companyName,
        },
        {
            name: "Description",
            selector: (row) => row.facilityName,
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "Type",
            selector: (row) => row.type,
        },
        {
            name: "",
            cell: (row) => (
                <button onClick={() => handleFacility(row.facilityId)}>
                    See subscribers
                </button>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>List of Facilities</h2>
                        <button onClick={handleAddFacility}>Add Facility</button>
                    </div>

                    <DataTable
                        columns={columns}
                        data={facilities}
                        progressPending={loading}
                        pagination
                        paginationPerPage={5}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>

                <dialog open={isDialogOpen}>
                    <form onSubmit={handleSubmit}>
                        <h3>Create New Facility</h3>
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
                                    className={type === 'MOBILESERVICE' ? 'active' : ''}
                                    onClick={() => setType('MOBILESERVICE')}
                                >
                                    Mobile Service
                                </button>
                            </div>

                            {(type === 'INTERNET' || type === 'MOBILESERVICE') && (
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

export default ProviderFacilitiesComponent;