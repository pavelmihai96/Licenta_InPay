import RefreshButton from "./RefreshButton.jsx";
import '../../style/RefreshButton.css';

export const NoDataComponent = ({styleHeader, onClick}) => {
    return (
        <div className="header">
            <div className="header-refresh">
                <div className="style-header"><h3>{styleHeader}</h3></div>
                <div className="style-refresh"><RefreshButton onClick={onClick}/></div>
            </div>
        </div>
    );
}