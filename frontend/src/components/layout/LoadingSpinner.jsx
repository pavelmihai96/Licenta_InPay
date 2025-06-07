import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <CircularProgress color="primary" />
        </div>
    );
};

export default LoadingSpinner;