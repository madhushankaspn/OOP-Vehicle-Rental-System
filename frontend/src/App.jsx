import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [days, setDays] = useState(1);
    const [wantsAC, setWantsAC] = useState(false);
    const [wantsHelmet, setWantsHelmet] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    // අලුත් Admin States
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [newBrand, setNewBrand] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newType, setNewType] = useState('car');

    // Database එකෙන් දත්ත ගන්න Function එක වෙනම හැදුවා (ආයෙත් කෝල් කරන්න ලේසි වෙන්න)
    const fetchVehicles = () => {
        fetch('http://localhost:8080/api/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const calculateTotal = () => {
        if (!selectedVehicle) return 0;
        let total = selectedVehicle.baseRentalPrice * days;

        // React එකට කාර් ද බයික් ද කියලා අඳුනගන්න පුළුවන් ක්‍රමය (Backend එකෙන් එන දත්ත අනුව)
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
        setIsConfirmed(false);
    };

    const handleBack = () => {
        setSelectedVehicle(null);
        setIsConfirmed(false);
        setIsAdminMode(false);
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    // අලුත් වාහනයක් Database එකට යවන (POST) Function එක
    const handleAddVehicle = (e) => {
        e.preventDefault(); // Page එක රීෆ්‍රෙෂ් වෙන එක නවත්තනවා

        // Type එක අනුව Endpoint එක වෙනස් වෙනවා
        const endpoint = newType === 'car' ? '/api/vehicles/car' : '/api/vehicles/motorcycle';

        const vehicleData = {
            brand: newBrand,
            baseRentalPrice: parseFloat(newPrice),
            // Database එකට යවද්දී මේවත් යවනවා
            hasAirConditioning: newType === 'car' ? true : undefined,
            includesHelmet: newType === 'motorcycle' ? true : undefined
        };

        fetch(`http://localhost:8080${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicleData)
        })
            .then(response => response.json())
            .then(() => {
                alert("වාහනය සාර්ථකව Database එකට එකතු කළා! 🎉");
                setNewBrand('');
                setNewPrice('');
                setIsAdminMode(false);
                fetchVehicles(); // අලුත් වාහනය පෙන්නන්න Database එක ආයෙත් ලෝඩ් කරනවා
            })
            .catch(error => console.error("Error saving:", error));
    };

    return (
        <div className="app-container">
            <h1 className="title">Smart Vehicle Rental</h1>

            {/* --- Main Menu / Vehicle Grid --- */}
            {!selectedVehicle && !isAdminMode && (
                <>
                    <div className="admin-header">
                        <div className="section-title">Select Your Vehicle</div>
                        <button className="btn btn-admin" onClick={() => setIsAdminMode(true)}>
                            + Add Vehicle (Admin)
                        </button>
                    </div>

                    <div className="vehicle-grid">
                        {vehicles.map(v => (
                            <div
                                key={v.vehicleId}
                                className="vehicle-card"
                                onClick={() => handleVehicleSelect(v)}
                            >
                                <h3>{v.brand}</h3>
                                <p>Rs. {v.baseRentalPrice.toLocaleString()} / day</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* --- Admin View (අලුත් වාහන දාන ෆෝම් එක) --- */}
            {isAdminMode && (
                <div className="admin-form">
                    <div className="calc-header">
                        <button className="btn btn-back" onClick={handleBack}>← Back</button>
                        <div className="section-title" style={{color: '#c084fc'}}>Admin: Add New Vehicle</div>
                    </div>

                    <form onSubmit={handleAddVehicle}>
                        <div className="form-control">
                            <label>Vehicle Type</label>
                            <select value={newType} onChange={(e) => setNewType(e.target.value)}>
                                <option value="car">Car (with A/C option)</option>
                                <option value="motorcycle">Motorcycle (with Helmet option)</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label>Brand Name (e.g. Suzuki Alto)</label>
                            <input
                                type="text"
                                required
                                value={newBrand}
                                onChange={(e) => setNewBrand(e.target.value)}
                                placeholder="Enter brand name"
                            />
                        </div>

                        <div className="form-control">
                            <label>Base Rental Price per Day (Rs.)</label>
                            <input
                                type="number"
                                required
                                min="100"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                placeholder="e.g. 4500"
                            />
                        </div>

                        <button type="submit" className="btn btn-submit">Save to Database</button>
                    </form>
                </div>
            )}

            {/* --- Calculator View (පැරණි එකමයි) --- */}
            {selectedVehicle && !isConfirmed && (
                <div className="calculator-section">
                    <div className="calc-header">
                        <button className="btn btn-back" onClick={handleBack}>← Back</button>
                        <div className="section-title">Rent {selectedVehicle.brand}</div>
                    </div>

                    <div className="input-group">
                        <label>Number of Days:</label>
                        <input
                            type="number" min="1" value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="days-input"
                        />
                    </div>

                    {selectedVehicle.hasAirConditioning !== undefined && (
                        <label className="checkbox-label">
                            <input type="checkbox" checked={wantsAC} onChange={(e) => setWantsAC(e.target.checked)} />
                            <span>Add A/C Facility (+Rs. 1000/day)</span>
                        </label>
                    )}

                    {selectedVehicle.includesHelmet !== undefined && (
                        <>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={wantsHelmet} onChange={(e) => setWantsHelmet(e.target.checked)} />
                                <span>Add Extra Helmet (+Rs. 500/day)</span>
                            </label>
                            <div className="discount-text">✨ 10% Special Discount for rentals over 7 days!</div>
                        </>
                    )}

                    <div className="total-section">
                        <div className="total-label">Total Rent</div>
                        <h2 className="total-amount">Rs. {calculateTotal().toLocaleString()}</h2>
                    </div>

                    <div className="button-group">
                        <button className="btn btn-confirm" onClick={handleConfirm}>Confirm Booking ✔</button>
                    </div>
                </div>
            )}

            {/* --- Confirmation View --- */}
            {selectedVehicle && isConfirmed && (
                <div className="calculator-section" style={{textAlign: 'center'}}>
                    <div className="calc-header">
                        <button className="btn btn-back" onClick={handleBack}>← Main Menu</button>
                    </div>
                    <div className="confirmation-box">
                        🎉 Thank you! Your booking for {selectedVehicle.brand} for {days} days is complete.
                    </div>
                </div>
            )}

        </div>
    );
}

export default App;