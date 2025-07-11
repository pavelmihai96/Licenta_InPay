import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';
import '../../style/facilityInfo.css';
import '/src/style/providerpage.css';
import '/src/style/dialog.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";
import {FaGlobe, FaHdd, FaShoppingCart, FaTachometerAlt, FaUserShield, FaWifi, FaPhone , FaSignal, FaCheck, FaBolt, FaGasPump, FaMapMarkerAlt } from "react-icons/fa";

const ConsumerFacilityInfo = () => {

    const { consumerId, contractId } = useParams();

    const [provider, setProvider] = useState([]);
    const [subscription, setSubscription] = useState([]);
    const [clientId, setClientId] = useState('');
    const [email, setEmail] = useState('');

    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleCheckClientInfo = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setClientId('');
        setEmail('');
        setIsDialogOpen(false);
    };

    useEffect(() => {
        fetchData(consumerId, contractId);
    }, [consumerId, contractId]);

    const fetchData = async (consumerId, contractId) => {

        try {
            const p = await request("GET", `/api/provider/by-contractId/${contractId}`);
            setProvider(p.data);

            const s = await request("GET", `/api/subscription/by-ids/${consumerId}/${p.data.providerId}`);
            setSubscription(s.data);

            console.log("provider: " + p.data);
            console.log("subscription: " + s.data);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const handleAddSubscription = async (e) => {
        e.preventDefault();
        setLoading(true);

        request("POST", `/api/clientinfo/${contractId}`, {
            clientId: clientId,
            email: email,
        })
            .then((response) => {
                console.log(response.data);
                request("POST", `/api/subscription`, {
                    consumerId: consumerId,
                    providerId: provider.providerId,
                    contractId: contractId,
                    clientId: clientId,
                    status: 'ACTIVE',
                    createdAt: new Date().toISOString()
                }).then((response) => {
                        console.log(response.data);
                        handleCloseDialog();
                        setMessage(response.data);
                        setTimeout(() => {
                            setMessage('');
                        }, 2000);
                        fetchData(consumerId, contractId);
                }).catch((error) => {
                        console.error("Eroare:", error);
                        if (error.response && error.response.data && error.response.data.error) {
                            setErrorMessage(error.response.data.error);
                            setTimeout(() => {
                                setErrorMessage('');
                            }, 3000);
                        } else {
                            setErrorMessage('Unexpected error occurred.');
                            setTimeout(() => {
                                setErrorMessage('');
                            }, 3000);
                        }
                }).finally(() => {setLoading(false)});
            }).catch((error) => {
                console.error("Eroare:", error);
            })
    }

    return (
        <div className="fiber-card-container">
        <div className="fiber-card">
            <div className="fiber-card-header">
                <button onClick={() => navigate(-1)} className="fiber-card-button-back">
                    Back
                </button>
                <div>
                    {message && (
                        <div className="message-class">{message}</div>
                    )}
                </div>
            </div>

            <div className="fiber-card-body">
                <h2 className="fiber-card-category">{provider.type}</h2>

                <div className="fiber-card-title">
                    <span>{provider.facilityName}</span>
                </div>

                <div className="fiber-card-price">{provider.price}</div>
                <div className="fiber-card-price-label">RON/{provider.type === "INTERNET" || provider.type === "MOBILE" ? 'month' : 'kwH'}</div>
                { provider.type === "INTERNET" && (
                    <ul className="fiber-card-features">
                        {provider.wifi != null ? <li><FaWifi className="icon" /> {provider.wifi}</li> : null}
                        {provider.hdd != null ? <li><FaHdd className="icon" /> {provider.hdd}</li> : null}
                        {provider.parental != null ? <li><FaUserShield className="icon" />{provider.parental}</li> : null}
                        <li><FaMapMarkerAlt className="icon" /> {provider.serviceArea}</li>
                    </ul>
                )}
                { provider.type === "MOBILE" && (
                    <ul className="fiber-card-features">
                        {provider.phone != null ? <li><FaPhone className="icon" />{provider.phone}</li> : null}
                        {provider.signal != null ? <li><FaSignal className="icon" />{provider.signal}</li> : null}
                        <li><FaMapMarkerAlt className="icon" /> {provider.serviceArea}</li>
                    </ul>
                )}
                { provider.type === "GAS" && (
                    <ul className="fiber-card-features">
                        {provider.discount != null ? <li><FaCheck className="icon" /> {provider.discount}</li> : null}
                        {provider.pump != null ? <li><FaGasPump  className="icon" /> {provider.pump}</li> : null}
                        <li><FaMapMarkerAlt className="icon" /> {provider.serviceArea}</li>
                    </ul>
                )}
                { provider.type === "ELECTRICITY" && (
                    <ul className="fiber-card-features">
                        {provider.discount != null ? <li><FaCheck className="icon" /> {provider.discount}</li> : null}
                        {provider.bolt != null ? <li><FaBolt  className="icon" /> {provider.bolt}</li> : null}
                        <li><FaMapMarkerAlt className="icon" /> {provider.serviceArea}</li>
                    </ul>
                )}
                {(subscription.status === 'INACTIVE' || !subscription) ? (
                    <button onClick={() => handleCheckClientInfo()} className="fiber-card-button">
                        Add subscription
                    </button>
                ) : (
                    <div className="message-class-bottom">
                        <span>Subscription was added.</span>
                    </div>
                )}

                <dialog open={isDialogOpen} className="subscription-dialog">
                    <form onSubmit={handleAddSubscription} className="dialog-form">
                        <h3 className="dialog-title">Check your contract details</h3>

                        {errorMessage && (
                            <label className="dialog-error">{errorMessage}</label>
                        )}

                        <label htmlFor="clientId" className="dialog-label">Client ID:</label>
                        <input
                            type="text"
                            id="clientId"
                            name="clientId"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            required
                            className="dialog-input"
                        />

                        <label htmlFor="email" className="dialog-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="dialog-input"
                        />

                        <div className="dialog-buttons">
                            <button type="button" onClick={handleCloseDialog} className="dialog-button cancel">
                                Cancel
                            </button>
                            {loading ? (
                                <div className="spinner"></div>
                            ) : (
                                <button type="submit" className="dialog-button submit">
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </dialog>

            </div>
        </div>
        </div>
    );


}

export default ConsumerFacilityInfo;