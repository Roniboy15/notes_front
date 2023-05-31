import React, { useEffect, useState } from 'react';
import './loadingButton.css'; // import any required CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingButton = ({ isLoading, Type }) => {

    return (
        <>
            <button className="submit-button btn btn-outline-dark">
                {isLoading  ? <FontAwesomeIcon icon={faSpinner} className="spin" /> : Type}
            </button>
        </>
    );
};

export default LoadingButton;