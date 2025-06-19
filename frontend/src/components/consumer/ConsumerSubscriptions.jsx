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
import RefreshButton from "../layout/RefreshButton.jsx";
import {NoDataComponent} from "../layout/NoDataComponent.jsx";

const ConsumerSubscriptions = () => {

    const { userId } = useParams();

    const [subscriptions, setSubscriptions] = useState([]);

    const [loading, setLoading] = useState(false);

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
            sortable: true,
        },
        {
            name: "Added in",
            selector: (row) => formatDate(row.createdAt),
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.provider.type,
            sortable: true,
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
                        { subscriptions.length > 0 &&
                            <div className="header-refresh">
                                <div className="style-header"><h2>Your synced subscriptions</h2></div>
                                <div className="style-refresh"><RefreshButton onClick={() => fetchTableData(userId)}/></div>
                            </div>
                        }
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
                        noDataComponent=<NoDataComponent styleHeader={"No synced subscriptions"} onClick={() => fetchTableData(userId)}/>
                    />
                </div>
            </div>
        </div>
    );
}

export default ConsumerSubscriptions;