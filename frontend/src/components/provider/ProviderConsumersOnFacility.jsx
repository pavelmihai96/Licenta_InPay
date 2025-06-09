import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";
import {FcInfo} from "react-icons/fc";

const ProviderConsumersOnFacility = () => {

    const { facilityId } = useParams();

    const [subscriptions, setSubscriptions] = useState([]);
    const [facility, setFacility] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData(facilityId);
    }, [facilityId]);

    const fetchTableData = async (facilityId) => {
        setLoading(true);

        try {
            const f = await request("GET", `http://localhost:8082/api/facility/${facilityId}`);
            setFacility(f.data);

            const s = await request("GET", `http://localhost:8082/api/subscription/by-ids/${facilityId}`);
            setSubscriptions(s.data);

            console.log("subscriptions: " + s.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscription = async (subscriptionId) => {
        request("GET", `http://localhost:8082/api/consumer/${userId}`)
            .then((response) => {
                navigate(`/consumer-subscriptions/${response.data.consumerId}/${subscriptionId}`)
            })
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.consumer.consumerId,
        },
        {
            name: "Name",
            selector: (row) => row.consumer.firstName + ' ' + row.consumer.lastName,
        },
        {
            name: "Address",
            selector: (row) => row.consumer.address,
        },
        {
            name: "Status",
            selector: (row) => row.status,
        },
        {
            name: "Info",
            cell: (row) => (
                <FcInfo onClick={() => handleSubscription(row.subscriptionId)} size={30}/>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    {facility && (
                        <h1 className="facility-title">Facility: {facility.facilityName}</h1>
                    )}
                    <div className="header">
                        <h3>Subscribed consumers</h3>
                    </div>

                    <DataTable
                        columns={columns}
                        data={subscriptions}
                        progressPending={loading}
                        pagination
                        paginationPerPage={10}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />

                    <div className="data-table-footer">
                        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProviderConsumersOnFacility;