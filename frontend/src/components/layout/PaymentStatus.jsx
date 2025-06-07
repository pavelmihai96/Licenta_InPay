import React from "react";
import '/src/style/paymentstatus.css';

export const PaymentStatus = ({ status }) => {
    const labelClass = status === 'PAID' || status === 'ACTIVE' ? 'status-label status-paid' : 'status-label status-unpaid';
    return <span className={labelClass}>{status}</span>;
};


