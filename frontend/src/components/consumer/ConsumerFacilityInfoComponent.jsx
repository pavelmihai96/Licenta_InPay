import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import '../../style/facilityInfo.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";

const ConsumerFacilityInfoComponent = () => {

    const { consumerId, facilityId } = useParams();

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
        fetchData(consumerId, facilityId);
    }, [consumerId, facilityId]);

    const fetchData = async (consumerId, facilityId) => {
        setLoading(true);

        try {
            const f = await request("GET", `/api/facility/${facilityId}`);
            setFacility(f.data);

            const p = await request("GET", `/api/provider/${f.data.provider.providerId}`);
            setProvider(p.data);

            const s = await request("GET", `/api/subscription/by-ids/${consumerId}/${facilityId}`);
            setSubscription(s.data);

            const response = await request("GET", `/api/${f.data.type.toLowerCase()}/by-facilityId/${facilityId}`);
            setFacilityType(response.data);

            console.log("response: " + response.data);
            console.log("provider: " + p.data);
            console.log("facility: " + f.data);
            console.log("subscription: " + s.data);
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
                {subscription.status === 'ACTIVE' && (
                    <div className="facility-label">You have subscribed</div>
                )}
                <h3>Facility Details</h3>
                <div className="facility-grid">
                    <div className="facility-column">
                        <label>Provider:</label>
                        <p>{provider.companyName}</p>

                        <label>Description:</label>
                        <p>{facility.facilityName}</p>

                        <label>Type:</label>
                        <p>{facility.type}</p>
                    </div>

                    <div className="facility-column">
                        <label>Price:</label>
                        <p>{facilityType.price}</p>
                    </div>
                </div>

                <div className="facility-footer">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                    {(subscription.status === 'INACTIVE' || !subscription) && (
                        <button className="facility-button" onClick={() => handleSubscription(consumerId, facilityId)}>
                            Subscribe
                        </button>
                    )}
                </div>
            </div>
        </div>
    );



}

export default ConsumerFacilityInfoComponent;