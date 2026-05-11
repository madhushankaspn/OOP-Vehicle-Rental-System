import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [days, setDays] = useState(1);
    const [wantsAC, setWantsAC] = useState(false);
    const [wantsHelmet, setWantsHelmet] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error("දෝෂයක්:", error));
    }, []);

    const calculateTotal = () => {
        if (!selectedVehicle) return 0;
        let total = selectedVehicle.baseRentalPrice * days;

        if (selectedVehicle.hasAirConditioning !== undefined && wantsAC) {
            total += 1000 * days;
        }
        else if (selectedVehicle.includesHelmet !== undefined) {
            if (wantsHelmet) total += 500 * days;
            if (days > 7) total = total * 0.9;
        }
        return total;
    };

    const handleVehicleSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
        setWantsAC(false);
        setWantsHelmet(false);
        setDays(1);
    };

    return (
        <div className="app-container">
            <h1 className="title">Smart Vehicle Rental</h1>

            <div className="section-title">ඔබගේ වාහනය තෝරන්න</div>

            {/* Dropdown එක වෙනුවට දැන් ලස්සන Clickable Cards තියෙනවා */}
            <div className="vehicle-grid">
                {vehicles.map(v => (
                    <div
                        key={v.vehicleId}
                        className={`vehicle-card ${selectedVehicle?.vehicleId === v.vehicleId ? 'selected' : ''}`}
                        onClick={() => handleVehicleSelect(v)}
                    >
                        <h3>{v.brand}</h3>
                        <p>රු. {v.baseRentalPrice.toLocaleString()} / දවසකට</p>
                    </div>
                ))}
            </div>

            {selectedVehicle && (
                <div className="calculator-section">

                    <div className="input-group">
                        <label>කුලියට ගන්නා දවස් ගණන:</label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="days-input"
                        />
                    </div>

                    {selectedVehicle.hasAirConditioning !== undefined && (
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={wantsAC}
                                onChange={(e) => setWantsAC(e.target.checked)}
                            />
                            <span>A/C පහසුකම අවශ්‍යයි (+රු. 1000/day)</span>
                        </label>
                    )}

                    {selectedVehicle.includesHelmet !== undefined && (
                        <>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={wantsHelmet}
                                    onChange={(e) => setWantsHelmet(e.target.checked)}
                                />
                                <span>අමතර හෙල්මට් එකක් අවශ්‍යයි (+රු. 500/day)</span>
                            </label>
                            <div className="discount-text">
                                ✨ දවස් 7කට වඩා කුලියට ගන්නේ නම් 10% ක විශේෂ වට්ටමක්!
                            </div>
                        </>
                    )}

                    <div className="total-section">
                        <div className="total-label">මුළු කුලිය (Total Rent)</div>
                        <h2 className="total-amount">
                            රු. {calculateTotal().toLocaleString()}
                        </h2>
                    </div>

                </div>
            )}
        </div>
    );
}

export default App;