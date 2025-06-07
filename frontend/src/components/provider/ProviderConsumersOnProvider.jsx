import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import { FcInfo } from "react-icons/fc";



import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import { formatDate } from "../../functions.js";

const ProviderConsumersOnProvider = () => {

    const { userId } = useParams();

    const [subscriptions, setSubscriptions] = useState([]);
    const [provider, setProvider] = useState();
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
            // const p = await request("GET", `http://localhost:8082/api/provider/by-userId/${userId}`);
            // setProvider(p.data);
            //
            // const s = await request("GET", `/api/subscription/join/${p.data.providerId}`);
            // setSubscriptions(s.data);
            //
            // const f = await request("GET", `/api/facility/provider/${p.data.providerId}`);
            // setFacilities(f.data);
            //
            // console.log("subscriptions: " + s.data);
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

    const handleGenerateInvoices = async () => {
        subscriptions.map(async (subscription) => {
            try {
                const service = await request("GET", `http://localhost:8082/api/${subscription.facility.type.toLowerCase()}/by-facilityId/${subscription.facility.facilityId}`);

                if (service.data.facility.type === "MOBILESERVICE" || service.data.facility.type === "INTERNET") {
                    const sendInvoice = await request("POST", `api/invoice/no-index`, {
                        subscriptionId: subscription.subscriptionId,
                        amount: service.data.price,
                        status: "UNPAID",
                        createdAt: new Date().toISOString()
                    });

                    console.log(sendInvoice.data);
                } else if (service.data.facility.type === "GAS" || service.data.facility.type === "ELECTRICITY") {
                    const last2Indexes = await request("GET", `http://localhost:8082/api/index/by-subscription/${subscription.subscriptionId}`);

                    // last index from the database was sent in the last 21 days
                    // so that a realistic invoice can be generated
                    if ( (new Date().getTime() - last2Indexes.data[0].createdAt) / (24 * 60 * 60 * 1000) < 21 ) {
                        console.log(last2Indexes.data[0].readingValue)
                        console.log(last2Indexes.data[1].readingValue)
                        console.log(service.data.price)
                        const amount = parseFloat((last2Indexes.data[0].readingValue - last2Indexes.data[1].readingValue) * (service.data.price));

                        const sendInvoice = await request("POST", `api/invoice/with-index`, {
                            subscriptionId: subscription.subscriptionId,
                            startId: last2Indexes.data[1].indexId,
                            endId: last2Indexes.data[0].indexId,
                            amount: amount,
                            status: "UNPAID",
                            createdAt: new Date().toISOString()
                        });

                        console.log(sendInvoice.data);
                    }
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    console.log(error.response.data.error);
                } else {
                    console.log('Unexpected error occurred.');
                }
            }
        })
    }

    const getFacilityName = (facilityId) => {
        for (let i = 0; i < facilities.length; i++) {
            if (facilities[i].facilityId === facilityId) {
                return facilities[i].facilityName;
            }
        }
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.subscriptionId,
        },
        {
            name: "Name",
            selector: (row) => row.consumer.firstName + ' ' + row.consumer.lastName,
        },
        {
            name: "Facility",
            selector: (row) => getFacilityName(row.facility.facilityId),
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
                    <div className="header">
                        <h2>Your consumers</h2>
                    </div>

                    <div className="data-table-header">
                        <button className="back-button" onClick={() => handleGenerateInvoices()}>Generate Invoices</button>
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

export default ProviderConsumersOnProvider;