import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import { FcInfo } from "react-icons/fc";

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ConsumerInvoicesComponent = () => {

    const { userId } = useParams();

    const [subscriptions, setSubscriptions] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [invoices, setInvoices] = useState([]);
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
            const i = await request("GET", `/api/invoice/by-consumerId/${consumer.data.consumerId}`);

            setInvoices(i.data);
            console.log("invoices: " + i.data);
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
            selector: (row) => row.invoiceId,
        },
        {
            name: "Amount",
            selector: (row) => row.amount + " RON",
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
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
                        <h2>Your Invoices</h2>
                    </div>

                    <DataTable
                        columns={columns}
                        data={invoices}
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

export default ConsumerInvoicesComponent;