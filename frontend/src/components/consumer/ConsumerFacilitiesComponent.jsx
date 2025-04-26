import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ConsumerFacilitiesComponent = () => {

    const { userId } = useParams();

    const [facilities, setFacilities] = useState([]);
    const [facilityName, setFacilityName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [pricePerKwh, setPricePerKwh] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData(userId);
    }, [userId]);

    const fetchTableData = async (userId) => {
        setLoading(true);

        try {
            const consumer = await request("GET", `http://localhost:8080/api/consumer/${userId}`);
            const response = await request("GET", `/api/facility/by-consumer/${consumer.data.consumerId}`);

            setFacilities(response.data);
            console.log("facilities: " + response.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFacilityInfo = async (facilityId) => {
        try {
            const consumer = await request("GET", `http://localhost:8080/api/consumer/${userId}`);
            console.log(consumer.data.consumerId);
            console.log(facilityId);
            navigate(`/consumer-facilities/${consumer.data.consumerId}/${facilityId}`);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
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
                <button onClick={() => handleFacilityInfo(row.facilityId)}>
                    Facility info
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
            </div>
        </div>
    );
}

export default ConsumerFacilitiesComponent;