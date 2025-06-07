import React from "react";
import PaymentIcon from "@mui/icons-material/Payment"; // Example icon
import "../../style/paymentstatus.css";

const PaymentLabel = ({ status, onClick }) => {
    if (status === 'PAID') {
        return null
    }

    return (
        <div className="pay-button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PaymentIcon size={25} style={{ fontSize: "18px", color: "black" }} />
            <span style={{ fontSize: "13px", color: "black" }}>Pay Now</span>
        </div>
    );
};

export default PaymentLabel;