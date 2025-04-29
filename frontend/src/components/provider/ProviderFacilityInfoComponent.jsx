//import '../../style/listOfFacilities.css';
//import '../../style/createFacility.css';
import '../../style/facilityInfo.css';
import { CSVImporter } from "csv-import-react";


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";

const ProviderFacilityInfoComponent = () => {

    const { providerId, facilityId } = useParams();

    const [provider, setProvider] = useState([]);
    const [subscription, setSubscription] = useState([]);
    const [facility, setFacility] = useState([]);
    const [facilityType, setFacilityType] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [pricePerKwh, setPricePerKwh] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData(providerId, facilityId);
    }, [providerId, facilityId]);

    const fetchData = async (providerId, facilityId) => {
        setLoading(true);

        try {
            const f = await request("GET", `/api/facility/${facilityId}`);
            setFacility(f.data);

            const p = await request("GET", `/api/provider/${providerId}`);
            setProvider(p.data);

            const response = await request("GET", `/api/${f.data.type.toLowerCase()}/by-facilityId/${facilityId}`);
            setFacilityType(response.data);

            console.log("response: " + response.data);
            console.log("provider: " + p.data);
            console.log("facility: " + f.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConsumers = async (facilityId) => {
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
                <h3>Edit facility info</h3>
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

                        <button className="open-csv-button" onClick={() => setIsOpen(true)}>Open CSV Importer</button>

                        <CSVImporter
                            modalIsOpen={isOpen}
                            modalOnCloseTriggered={() => setIsOpen(false)}
                            onComplete={(data) => console.log(data)}
                            template={{
                                columns: [
                                    {
                                        name: "First Name",
                                        key: "first_name",
                                        required: true,
                                        description: "The first name of the user",
                                        suggested_mappings: ["First", "Name"],
                                    },
                                    {
                                        name: "Age",
                                        data_type: "number",
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>

                <div className="facility-footer">
                    <button className="facility-button" onClick={() => handleConsumers(providerId, facilityId)}>
                        See subscribed consumers
                    </button>

                    <button className="facility-button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProviderFacilityInfoComponent;