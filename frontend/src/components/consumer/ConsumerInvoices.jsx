import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import { FcInfo } from "react-icons/fc";
import PaymentIcon from '@mui/icons-material/Payment';
import DownloadIcon from '@mui/icons-material/Download';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import { loadStripe } from '@stripe/stripe-js';
import {formatDate} from "../../functions.js";
import {PaymentStatus} from "../layout/PaymentStatus.jsx";
import PaymentLabel from "../layout/PaymentLabel.jsx";
import "../../style/paymentstatus.css";
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ConsumerInvoices = () => {

    const { userId } = useParams();

    const [invoices, setInvoices] = useState([]);

    const [loading, setLoading] = useState(false);

    const stripePromise = loadStripe('pk_test_51RO0IqDC2ijRDrIhq8n1cwOVrcWxbDzBtOdBtYLROeJKK8pzR7GEes75ffi5BSBTgBT98Qdxy68nKrOlmSDSsbND00ZApab4aM');

    useEffect(() => {
        fetchTableData(userId);

        const query = new URLSearchParams(window.location.search);

        if (query.get("invoiceId")) {
            request("PUT", `/api/invoice/${query.get("invoiceId")}`)
                .then((response) => {
                    console.log(response.data);
                    fetchTableData(userId);
                })
                .catch((error) => {
                    console.error("Eroare:", error);
                })
        }
        if (query.get("canceled")) {
            console.log("canceled");
        }
    }, [userId]);

    const fetchTableData = async (userId) => {
        setLoading(true);

        try {
            const consumer = await request("GET", `/api/consumer/${userId}`);
            const i = await request("GET", `/api/invoice/by-consumerId/unpaid/${consumer.data.consumerId}`);

            setInvoices(i.data);
            console.log("invoices: " + i.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvoice = async (amount, idFromProvider, invoiceId) => {
        const stripe = await stripePromise;
        amount = Number(amount.toString().replace(".", ""));

        request("POST", `/api/invoice/checkout/${userId}`, {
            amount: amount,
            name: "INV" + idFromProvider,
            quantity: 1,
            currency: "RON",
            invoiceId: invoiceId
        })
            .then((response) => {
                console.log("inainte de redirect: am dat redirect: " + response.data);

                stripe.redirectToCheckout({
                    sessionId: response.data.sessionId,
                }).then((res) => {

                    console.log("dupa redirect: dupa redirect: " + res.data);
                    console.log(res.data);
                });
            })
            .catch((error) => {
                console.error("Eroare:", error);
            })
    }

    const columns = [
        {
            name: "Provider",
            selector: (row) => row.subscription.provider.facilityName,
        },
        {
            name: "Amount",
            selector: (row) => row.amount + " RON",
        },
        {
            name: "Due date",
            selector: (row) => formatDate(row.dueDate),
        },
        {
            name: "Status",
            cell: (row) => (
                <PaymentStatus status={row?.status}/>
            )
        },
        {
            name: "",
            cell: (row) => (
                    <PaymentLabel status={row.status}
                        onClick={() => handleInvoice(row.amount, row.idFromProvider, row.invoiceId)}
                    />
            )
        }
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        { invoices.length > 0 &&
                            <center><h2 style={{marginBottom:"50px"}}>Your invoices</h2></center>
                        }
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
                        noDataComponent={<h3>You have no unpaid invoices</h3>}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConsumerInvoices;