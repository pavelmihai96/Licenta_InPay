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

    const [provider, setProvider] = useState([]);
    const [subscription, setSubscription] = useState([]);
    const [facility, setFacility] = useState([]);
    const [facilityType, setFacilityType] = useState('');
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

            //const p = await request("GET", `/api/provider/${f.data.provider.providerId}`);
            //setProvider(p.data);

            const response = await request("GET", `/api/${f.data.type.toLowerCase()}/by-facilityId/${s.data.facility.facilityId}`);
            setFacilityType(response.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscription = async (consumerId, facilityId) => {
        try {
            request("POST", `api/subscription`, {
                consumerId: consumerId,
                facilityId: facilityId,
                status: 'ACTIVE',
                createdAt: new Date().toISOString()
            })
                .then((response) => {
                    console.log(response.data);
                    fetchData(consumerId, facilityId);
                })
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    }

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

                        <label>Monthly price:</label>
                        <p>{facilityType.price}</p>
                    </div>

                    {(facility.type === 'GAS' || facility.type === 'ELECTRICITY') && (
                        <div className="facility-column">
                            <div className="index-input-group">
                                <input
                                    type="text"
                                    placeholder="Enter index value"
                                    className="index-input"
                                />
                                <button className="facility-button">
                                    Send Index
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="facility-footer">
                    <button className="facility-button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );



}

export default ConsumerSubscriptionInfoComponent;