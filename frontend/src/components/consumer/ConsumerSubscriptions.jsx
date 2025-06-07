import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import { FcInfo } from "react-icons/fc";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckBoxIcon from '@mui/icons-material/CheckBox';



import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ConsumerSubscriptions = () => {

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
            const consumer = await request("GET", `/api/consumer/${userId}`);
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
        request("GET", `/api/consumer/${userId}`)
            .then((response) => {
                navigate(`/consumer-subscriptions/${response.data.consumerId}/${subscriptionId}`)
            })
    }

    const columns = [
        {
            name: "Client ID",
            selector: (row) => row.clientId,
        },
        {
            name: "Contract ID",
            selector: (row) => row.contractId,
        },
        {
            name: "Description",
            selector: (row) => row.provider.facilityName,
        },
        {
            name: "Added at",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "Type",
            selector: (row) => row.provider.type,
        },
        {
            cell: (row) => (
                <ArrowRightIcon onClick={() => handleSubscription(row.subscriptionId)} size={30}/>
            ),
        }
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
                        onRowClicked={(row) => {
                            // Your onClick logic here
                            handleSubscription(row.subscriptionId);
                            // For example, navigate to a detail page or open a modal
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConsumerSubscriptions;