//import { FiRefreshCcw } from 'react-icons/fi'; // Feather refresh icon
import { MdRefresh } from 'react-icons/md'; // Material Design icon
import '../../style/RefreshButton.css'; // Optional styling

const RefreshButton = ({ onClick }) => {
    return (
        <button className="refresh-button" onClick={onClick} aria-label="Refresh Page">
            <MdRefresh size={24} />
        </button>
    );
};

export default RefreshButton;
