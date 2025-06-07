import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import '../../style/facilityInfo.css';


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

const ConsumerSubscriptionInfo = () => {

    const { consumerId, subscriptionId } = useParams();

    const [readingValue, setReadingValue] = useState('');
    const [subscription, setSubscription] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [facility, setFacility] = useState([]);
    const [facilityType, setFacilityType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validMessage, setValidMessage] = useState('');
    const [createdIndex, setCreatedIndex] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [pricePerKwh, setPricePerKwh] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => "#" + row?.idFromProvider,
        },
        {
            name: "Amount",
            cell: (row) => (
                <AmountStyle amount={row?.amount}/>
            )
        },
        {
            name: "Due date",
            selector: (row) => formatDate(row?.dueDate),
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
                <DownloadIcon className="download-button" onClick={() => handlePDF(row.invoiceId, row.idFromProvider)} size={30} style={{ color: "royalblue" }}/>
            )
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
                                <h4>Invoices for {subscription?.provider?.facilityName} service</h4>
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
                                noDataComponent={<h3>You have no invoices</h3>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default ConsumerSubscriptionInfo;