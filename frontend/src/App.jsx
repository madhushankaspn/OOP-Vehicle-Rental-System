import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [days, setDays] = useState(1);
    const [wantsAC, setWantsAC] = useState(false);
    const [wantsHelmet, setWantsHelmet] = useState(false);

    // 1. Confirm කළාද කියලා මතක තියාගන්න අලුත් State එකක්
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error("Error fetching data:", error));
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
        setIsConfirmed(false); // අලුත් වාහනයක් තෝරද්දී confirm state එක අයින් කරනවා
    };

    // 2. Back button එක එබුවම වාහන grid එකට යන function එක
    const handleBack = () => {
        setSelectedVehicle(null);
        setIsConfirmed(false);
    };

    // 3. Confirm button එක එබුවම confirm message එක පෙන්නන function එක
    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    return (
        <div className="app-container">
            {/* class name change for better visibility */}
            <h1 className="title">Smart Vehicle Rental</h1>

            {/* වාහනයක් තෝරලා නැත්නම් විතරක් Grid එක පෙන්නනවා */}
            {!selectedVehicle && (
                <>
                    <div className="section-title">Select Your Vehicle</div>
                    <div className="vehicle-grid">
                        {vehicles.map(v => (
                            <div
                                key={v.vehicleId}
                                className={`vehicle-card ${selectedVehicle?.vehicleId === v.vehicleId ? 'selected' : ''}`}
                                onClick={() => handleVehicleSelect(v)}
                            >
                                <h3>{v.brand}</h3>
                                <p>Rs. {v.baseRentalPrice.toLocaleString()} / day</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* වාහනයක් තෝරලා තියෙනවා නම් සහ Confirm කරලා නැත්නම් Calculator එක පෙන්නනවා */}
            {selectedVehicle && !isConfirmed && (
                <div className="calculator-section">

                    {/* Back button එක ඇතුළත් header එක */}
                    <div className="calc-header">
                        <button className="btn btn-back" onClick={handleBack}>← Back</button>
                        <div className="section-title">Rent {selectedVehicle.brand}</div>
                    </div>

                    <div className="input-group">
                        <label>Number of Days:</label>
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
                            <span>Add A/C Facility (+Rs. 1000/day)</span>
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
                                <span>Add Extra Helmet (+Rs. 500/day)</span>
                            </label>
                            <div className="discount-text">
                                ✨ 10% Special Discount for rentals over 7 days!
                            </div>
                        </>
                    )}

                    <div className="total-section">
                        <div className="total-label">Total Rent</div>
                        <h2 className="total-amount">
                            Rs. {calculateTotal().toLocaleString()}
                        </h2>
                    </div>

                    {/* Confirm Button */}
                    <div className="button-group">
                        <button className="btn btn-confirm" onClick={handleConfirm}>Confirm Booking ✔</button>
                    </div>

                </div>
            )}

            {/* 4. Confirm කළාට පස්සේ පෙන්නන සාර්ථක මැසේජ් එක (Confirmation View) */}
            {selectedVehicle && isConfirmed && (
                <div className="calculator-section" style={{textAlign: 'center'}}>
                    <div className="calc-header">
                        <button className="btn btn-back" onClick={handleBack}>← Main Menu</button>
                    </div>
                    <div className="confirmation-box">
                        🎉 Thank you for your choice! Your booking for {selectedVehicle.brand} for {days} days is complete.
                    </div>
                    <p style={{marginTop: '20px', color: '#94a3b8'}}>Please contact our staff for payment instructions.</p>
                </div>
            )}

        </div>
    );
}

export default App;