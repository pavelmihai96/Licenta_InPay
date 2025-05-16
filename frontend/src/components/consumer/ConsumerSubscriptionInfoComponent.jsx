import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import '../../style/facilityInfo.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {formatDate} from "../../functions.js";

const ConsumerSubscriptionInfoComponent = () => {

    const { consumerId, subscriptionId } = useParams();

    const [readingValue, setReadingValue] = useState('');
    const [subscription, setSubscription] = useState([]);
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

            const f = await request("GET", `/api/facility/${s.data.facility.facilityId}`);
            setFacility(f.data);

            const response = await request("GET", `/api/${f.data.type.toLowerCase()}/by-facilityId/${s.data.facility.facilityId}`);
            setFacilityType(response.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendIndex = async (subscriptionId) => {
        setLoading(true);
        try {
            if (readingValue === '') {
                setErrorMessage('Please type an index value.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);

                return;
            }

            const response = await request("POST", `api/index`, {
                subscriptionId: subscriptionId,
                readingValue: readingValue,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setReadingValue('');
            setErrorMessage('');

            setValidMessage('Index added successfully!');
            setTimeout(() => {
                setValidMessage('');
            }, 2000);

            fetchData(consumerId, subscriptionId);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            } else {
                setErrorMessage('Unexpected error occurred.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="facility-page">
            <div className="facility-container">
                <h3>Subscription Details</h3>
                <div className="facility-grid">
                    <div className="facility-column">
                        <label>Description:</label>
                        <p>{facility.facilityName}</p>

                        <label>Status:</label>
                        <p>{subscription.status}</p>

                        <label>Subscribed in:</label>
                        <p>{subscription.createdAt}</p>

                        <label>Type:</label>
                        <p>{facility.type}</p>

                        <label>{(facility.type === 'GAS' || facility.type === 'ELECTRICITY') ? 'Price per Kwh' : 'Monthly price'}</label>
                        <p>{facilityType.price}</p>
                    </div>

                    {((facility.type === 'GAS' || facility.type === 'ELECTRICITY')) && (
                        <div className="facility-column">
                            <div className="index-input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter index value"
                                        className="index-input"
                                        value={readingValue}
                                        onChange={(e) => setReadingValue(e.target.value)}
                                    />
                                    <button className="facility-button" type="submit" onClick={() => handleSendIndex(subscriptionId)}>
                                        Send Index
                                    </button>
                            </div>
                            {errorMessage && (
                                <label className="message-class">{errorMessage}</label>
                            )}
                            {validMessage && (
                                <label className="message-class-v">{validMessage}</label>
                            )}
                        </div>
                    )}
                </div>

                <div className="facility-footer">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );



}

export default ConsumerSubscriptionInfoComponent;