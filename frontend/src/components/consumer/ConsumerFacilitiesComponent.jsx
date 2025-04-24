import DataTable from "react-data-table-component";
import '../../style/listOfFacilities.css';
import '../../style/createFacility.css';


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../../axios_helper";

const ConsumerFacilitiesComponent = () => {

    // teacher id
    const { id } = useParams();

    const [facilities, setFacilities] = useState([]);
    const [facilityName, setFacilityName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [pricePerKwh, setPricePerKwh] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData(id);
    }, [id]);

    //console.log(getAuthenticationToken());

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setFacilityName('');
        setPrice('');
        setPricePerKwh('');
        setType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        try {
            const provider = await request("GET", `http://localhost:8080/api/provider/${id}`);
            const response = await request('POST', `api/facility`, {
                facilityName: facilityName,
                type: type,
                providerId: provider.data.providerId,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsDialogOpen(false);
            fetchTableData(id);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const fetchTableData = async (id) => {
        setLoading(true);

        try {
            const response = await request("GET", `/api/facility`);

            setFacilities(response.data);
            console.log("facilities: " + response.data);
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscription = async (facilityId) => {
        try {
            const consumer = await request("GET", `http://localhost:8080/api/consumer/${id}`);
            const response = await request("POST", `api/subscription`, {
                consumerId: consumer.data.consumerId,
                facilityId: facilityId,
                status: 'ACTIVE',
                createdAt: new Date().toISOString()
            })
            //navigate(`/consumer-subscriptions/${id}/${subscriptionId}`)
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.facilityId,
        },
        {
            name: "Company name",
            selector: (row) => row.provider.companyName,
        },
        {
            name: "Description",
            selector: (row) => row.facilityName,
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "Type",
            selector: (row) => row.type,
        },
        {
            name: "",
            cell: (row) => (
                <button onClick={() => handleSubscription(row.facilityId)}>
                    Subscribe
                </button>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>List of Services</h2>
                    </div>

                    <DataTable
                        columns={columns}
                        data={facilities}
                        progressPending={loading}
                        pagination
                        paginationPerPage={5}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>
            </div>
        </div>
    );
}

export default ConsumerFacilitiesComponent;