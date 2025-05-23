import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import { FcInfo } from "react-icons/fc";



import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ConsumerSubscriptionsComponent = () => {

    const { userId } = useParams();

    const [subscriptions, setSubscriptions] = useState([]);
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
            const response = await request("GET", `/api/subscription/all/${consumer.data.consumerId}`);

            setSubscriptions(response.data);
            console.log("subscriptions: " + response.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscription = async (subscriptionId) => {
        request("GET", `http://localhost:8080/api/consumer/${userId}`)
            .then((response) => {
                navigate(`/consumer-subscriptions/${response.data.consumerId}/${subscriptionId}`)
            })
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.subscriptionId,
        },
        {
            name: "Owner name",
            selector: (row) => row.consumer.firstName + ' ' + row.consumer.lastName,
        },
        {
            name: "Description",
            selector: (row) => row.facility.facilityName,
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "Type",
            selector: (row) => row.facility.type,
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
                    <div className="header">
                        <h2>List of Subscriptions</h2>
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
                </div>
            </div>
        </div>
    );
}

export default ConsumerSubscriptionsComponent;