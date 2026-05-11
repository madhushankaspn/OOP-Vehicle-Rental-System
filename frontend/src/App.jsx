import { useState, useEffect } from 'react';
import './App.css';

function App() {
    // 1. Backend එකෙන් එන වාහන ටික තියාගන්න State එක
    const [vehicles, setVehicles] = useState([]);

    // 2. පාරිභෝගිකයා තෝරන දේවල් මතක තියාගන්න හදන States
    const [selectedVehicle, setSelectedVehicle] = useState(null); // තෝරාගත් වාහනය
    const [days, setDays] = useState(1); // දවස් ගණන (මුලින්ම 1යි කියලා දෙනවා)
    const [wantsAC, setWantsAC] = useState(false); // A/C ඕනෙද?
    const [wantsHelmet, setWantsHelmet] = useState(false); // හෙල්මට් ඕනෙද?

    // පිටුව ලෝඩ් වෙද්දී Backend එකෙන් දත්ත ගේනවා
    useEffect(() => {
        fetch('http://localhost:8080/api/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error("දෝෂයක්:", error));
    }, []);

    // 3. කුලිය ගණනය කරන ලොජික් එක (අපි Java වල ලියපු එකමයි!)
    const calculateTotal = () => {
        if (!selectedVehicle) return 0; // වාහනයක් තෝරලා නැත්නම් 0යි

        let total = selectedVehicle.baseRentalPrice * days;

        // කාර් එකක් නම් (hasAirConditioning කියන එක තියෙනවද බලනවා)
        if (selectedVehicle.hasAirConditioning !== undefined) {
            if (wantsAC) total += 1000 * days;
        }
        // බයික් එකක් නම්
        else if (selectedVehicle.includesHelmet !== undefined) {
            if (wantsHelmet) total += 500 * days;
            if (days > 7) total = total * 0.9; // දවස් 7ට වැඩි නම් 10% ක වට්ටමක්
        }

        return total;
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
            <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Smart Vehicle Rental 🚗🏍️</h1>

            {/* 4. වාහනයක් තෝරන්න Dropdown එකක් */}
            <div style={{ marginBottom: '20px' }}>
                <label><b>වාහනය තෝරන්න: </b></label>
                <select
                    style={{ padding: '10px', width: '100%', marginTop: '10px' }}
                    onChange={(e) => {
                        // තෝරන වාහනය හොයාගෙන State එකට දානවා
                        const vehicle = vehicles.find(v => v.vehicleId === e.target.value);
                        setSelectedVehicle(vehicle);
                        // අලුත් වාහනයක් තෝරද්දී පරණ टिक (checkboxes) අයින් කරනවා
                        setWantsAC(false);
                        setWantsHelmet(false);
                    }}
                >
                    <option value="">-- වාහනයක් තෝරන්න --</option>
                    {vehicles.map(v => (
                        <option key={v.vehicleId} value={v.vehicleId}>
                            {v.brand} (රු. {v.baseRentalPrice}/day)
                        </option>
                    ))}
                </select>
            </div>

            {/* වාහනයක් තෝරලා තියෙනවා නම් විතරක් යට ටික පෙන්නනවා */}
            {selectedVehicle && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>

                    <div style={{ marginBottom: '15px' }}>
                        <label><b>දවස් ගණන: </b></label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            style={{ padding: '5px', width: '60px', marginLeft: '10px' }}
                        />
                    </div>

                    {/* කාර් එකක් නම් A/C අහනවා */}
                    {selectedVehicle.hasAirConditioning !== undefined && (
                        <div style={{ marginBottom: '15px' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={wantsAC}
                                    onChange={(e) => setWantsAC(e.target.checked)}
                                /> A/C පහසුකම අවශ්‍යයි (+රු. 1000/day)
                            </label>
                        </div>
                    )}

                    {/* බයික් එකක් නම් හෙල්මට් අහනවා */}
                    {selectedVehicle.includesHelmet !== undefined && (
                        <div style={{ marginBottom: '15px' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={wantsHelmet}
                                    onChange={(e) => setWantsHelmet(e.target.checked)}
                                /> අමතර හෙල්මට් එකක් අවශ්‍යයි (+රු. 500/day)
                            </label>
                            <p style={{ color: 'green', fontSize: '14px' }}>* දවස් 7කට වඩා කුලියට ගන්නේ නම් 10% ක විශේෂ වට්ටමක්!</p>
                        </div>
                    )}

                    <hr />

                    <h2 style={{ color: '#e74c3c' }}>
                        මුළු කුලිය: රු. {calculateTotal().toLocaleString()}
                    </h2>
                </div>
            )}
        </div>
    );
}

export default App;