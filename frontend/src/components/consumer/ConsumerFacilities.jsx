import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";
import {FcAbout} from "react-icons/fc";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RefreshButton from "../layout/RefreshButton.jsx";
import {useLocation} from "react-router";
import {NoDataComponent} from "../layout/NoDataComponent.jsx";

const ConsumerFacilities = () => {

    const { userId } = useParams();

    const [providers, setProviders] = useState([]);
    const [consumerId, setConsumerId] = useState([]);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData(userId);
    }, []);

    const fetchTableData = async (userId) => {
        setLoading(true);

        try {
            const consumer = await request("GET", `/api/consumer/${userId}`);
            const p = await request("GET", `/api/provider`);

            setConsumerId(consumer.data.consumerId);
            setProviders(p.data);
            console.log("facilities: ", p.data);
            console.log("consumer: ", consumer.data.consumerId);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFacilityInfo = async (contractId) => {
        try {
            navigate(`/consumer-facilities/${consumerId}/${contractId}`);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    }

    const checkIfSubscribed = async (providerId) => {
        try {
            // If loading is true, prevent execution, but explicitly return a default value
            if (loading) {
                console.log("Check skipped due to loading state");
                return "loading"; // You can return a fallback value like 'loading' or null.
            }

            // Perform the API request
            const s = await request("GET", `/api/subscription/by-ids/${consumerId}/${providerId}`);
            console.log("subscription: " + s.data.contractId);

            // Check if subscription exists and return the appropriate value
            if (s.data.subscriptionId !== undefined) {
                console.log("subscribed");
                return "subscribed";
            } else {
                console.log("not subscribed");
                return "not subscribed";
            }
        } catch (error) {
            // Log and handle the error but also return a fallback value
            console.error("Error during subscription check:", error);
            return "error"; // Indicate an error to the caller
        }
    };

    const columns = [
        {
            name: "Company name",
            selector: (row) => row.companyName,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.facilityName,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => row.type === 'INTERNET' || row.type === 'MOBILE' ? row.price + " RON" : row.price + " RON/Kwh",
            sortable: true,
        },
        {cell: (row) => {
                const [subscriptionStatus, setSubscriptionStatus] = useState(null);

                useEffect(() => {
                    const fetchSubscriptionStatus = async () => {
                        if (!loading) {
                            const result = await checkIfSubscribed(row?.providerId);
                            setSubscriptionStatus(result);
                        }
                    };

                    fetchSubscriptionStatus();
                }, [loading, row?.providerId]);

                if (subscriptionStatus === "subscribed") {
                    return (
                        <CheckBoxIcon size={20} style={{ color: "green" }} />
                    );
                } else if (subscriptionStatus === "loading") {
                    return <span>Loading...</span>;
                } else if (subscriptionStatus === "error") {
                    return <span style={{ color: "red" }}>Error</span>;
                } else {
                    return null;
                }
            },

        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        { providers.length > 0 && (
                            <div className="header-refresh">
                                <div className="style-header"><h2>All providers</h2></div>
                                <div className="style-refresh"><RefreshButton onClick={() => fetchTableData(userId)}/></div>
                            </div>
                        )}
                    </div>

                    <DataTable
                        columns={columns}
                        data={providers}
                        progressPending={loading === 2}
                        pagination
                        paginationPerPage={10}
                        highlightOnHover
                        pointerOnHover
                        responsive
                        onRowClicked={(row) => {
                            // Your onClick logic here
                            handleFacilityInfo(row.contractId);
                            // For example, navigate to a detail page or open a modal
                        }}
                        noDataComponent=<NoDataComponent styleHeader={"Providers are not available"} onClick={() => fetchTableData(userId)}/>
                    />
                </div>
            </div>
        </div>
    );
}

export default ConsumerFacilities;