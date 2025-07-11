import DataTable from "react-data-table-component";
//import '../../style/listOfFacilities.css';
//import '../../style/createFacility.css';
import '../../style/fiberCardCSS.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";
import {
    FaBolt,
    FaCheck,
    FaGasPump,
    FaHdd,
    FaMapMarkerAlt,
    FaPhone,
    FaSignal,
    FaUserShield,
    FaWifi,
    FaDotCircle
} from "react-icons/fa";
import {PaymentStatus} from "../layout/PaymentStatus.jsx";
import PaymentLabel from "../layout/PaymentLabel.jsx";
import DownloadIcon from "@mui/icons-material/Download";
import {AmountStyle} from "../layout/AmountStyle.jsx";
import RefreshButton from "../layout/RefreshButton.jsx";
import {NoDataComponent} from "../layout/NoDataComponent.jsx";

const ConsumerSubscriptionInfo = () => {

    const { consumerId, subscriptionId } = useParams();

    const [subscription, setSubscription] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData(consumerId, subscriptionId);
    }, [consumerId, subscriptionId]);

    const fetchData = async (consumerId, subscriptionId) => {
        setLoading(true);

        try {
            const s = await request("GET", `/api/subscription/${subscriptionId}`);
            setSubscription(s.data);
            console.log("subscription: ", s.data);

            const i = await request("GET", `/api/invoice/by-subscriptionId/${subscriptionId}`);
            setInvoices(i.data);
            console.log("invoices: " + i.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePDF = async (invoiceId, idFromProvider) => {
        try {
            setLoading1(true);
            setInvoiceId(invoiceId);

            const response = await request("POST", `/api/invoice/pdf/${invoiceId}`, {}, { responseType: 'blob' });

            const url = URL.createObjectURL(response.data);
            const link = document.createElement("a");

            link.href = url;
            link.download = `INV${idFromProvider}.pdf`;
            document.body.appendChild(link); // Append the link to the DOM (necessary for some browsers)
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up after the click

            // Revoke the Blob URL after download to free up memory
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setLoading1(false);
            setInvoiceId(null);
        }
    };

    const columns = [
        {
            name: "Download",
            cell: (row) => {
                const [verif, setVerif] = useState(false);

                useEffect(() => {
                    const checkPayButton = async () => {
                        if (loading1 && (invoiceId === row.invoiceId)) {
                            setVerif(true);
                        }
                    };

                    checkPayButton().then(() => {
                        setTimeout(() => {
                            setVerif(false)
                        }, 1500);
                    });
                }, [loading1]);

                return ( verif ? (
                    <div className="spinner"></div>
                ) : (
                    <DownloadIcon className="download-button" onClick={() => handlePDF(row.invoiceId, row.idFromProvider)}
                                  size={30} style={{color: "royalblue"}}/>
                ) )
            }
        },
        {
            name: "Amount",
            cell: (row) => (
                <AmountStyle amount={row?.amount}/>
            ),
            sortable: true,
        },
        {
            name: "Status",
            cell: (row) => (
                <PaymentStatus status={row?.status}/>
            ),
            sortable: true,
        },
        {
            name: "Due date",
            selector: (row) => formatDate(row?.dueDate),
            sortable: true,
        },


    ];

    return (
        <div className="fiber-card-container">
            <div className="fiber-card">
                <div className="fiber-card-header">
                    <button onClick={() => navigate(-1)} className="fiber-card-button-back">
                        Back
                    </button>
                </div>

                <div className="fiber-card-body">
                    <h2 style={{ marginTop: "25px"}} className="fiber-card-category">{subscription?.provider?.type}</h2>

                    <div style={{ marginTop: "25px"}} className="fiber-card-title">
                        <span>{subscription?.provider?.facilityName}</span>
                    </div>

                    {/*<div className="fiber-card-price">{provider.price}</div>*/}
                    {/*<div className="fiber-card-price-label">RON/{provider.type === "INTERNET" || provider.type === "MOBILE" ? 'month' : 'kwH'}</div>*/}
                    <ul style={{ marginTop: "50px"}} className="fiber-card-features">
                        <li><FaDotCircle className="icon" size={10}/> Contract ID: {subscription?.contractId}</li>
                        <li><FaDotCircle className="icon" size={10}/> Client ID: {subscription?.clientId}</li>
                        <li><FaDotCircle className="icon" size={10}/> Price: {subscription?.provider?.price} RON/{subscription?.provider?.type === "INTERNET" || subscription?.provider?.type === "MOBILE" ? 'month' : 'kwH'}</li>
                        <li><FaDotCircle className="icon" size={10}/> Status: <PaymentStatus status={subscription?.status}/></li>
                    </ul>
                </div>
            </div>
            <div className="fiber-card">
                <div className="data-table">
                    <div className="container">
                        <div className="data-table-wrapper">
                            <div className="header">
                                <div className="header-refresh">
                                    <div className="style-header"><h4>Invoices for {subscription?.provider?.facilityName} service</h4></div>
                                    <div className="style-refresh"><RefreshButton onClick={() => fetchData(consumerId, subscriptionId)}/></div>
                                </div>
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
                                noDataComponent=<NoDataComponent styleHeader={"You have no invoices"} onClick={() => fetchData(consumerId, subscriptionId)}/>
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default ConsumerSubscriptionInfo;