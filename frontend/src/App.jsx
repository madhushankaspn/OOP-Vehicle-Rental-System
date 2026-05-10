import { useState, useEffect } from 'react';
import './App.css'; // ලස්සන කරන්න තියෙන CSS ෆයිල් එක

function App() {
  // 1. useState: මේක තමයි React වල "මතකය". Backend එකෙන් එන වාහන ටික අපි මේකේ තියාගන්නවා.
  const [vehicles, setVehicles] = useState([]);

  // 2. useEffect: පිටුව මුලින්ම ලෝඩ් වෙද්දීම කරන්න ඕනේ වැඩේ තමයි මේක අස්සේ ලියන්නේ.
  useEffect(() => {

    // 3. fetch: අපේ "වේටර්ට" (Backend API එකට) කතා කරලා දත්ත ඉල්ලනවා!
    fetch('http://localhost:8080/api/vehicles')
        .then(response => response.json()) // එන දත්ත ටික JSON වලට හරවගන්නවා
        .then(data => {
          console.log("Backend එකෙන් ආපු දත්ත:", data);
          setVehicles(data); // ඒ ආපු වාහන ටික අර "මතකයේ" (State එකේ) සේව් කරනවා
        })
        .catch(error => console.error("දත්ත ගෙනීමේ දෝෂයක්:", error));

  }, []); // මේ හිස් කොටු වරහන් වලින් කියන්නේ "මේක පිටුව ලෝඩ් වෙද්දි එක පාරක් විතරක් කරන්න" කියන එකයි.

  return (
      <div>
        <h1>Smart Vehicle Rental 🚗🏍️</h1>
        <h2>අපේ වාහන ලැයිස්තුව:</h2>

        {/* 4. අර මතකයේ සේව් කරගත්ත වාහන ලැයිස්තුව (List එක) එකින් එක අරන් තිරයේ පෙන්නනවා */}
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <ul>
            {vehicles.map(vehicle => (
                <li key={vehicle.vehicleId} style={{ fontSize: '18px', marginBottom: '10px' }}>
                  <strong>{vehicle.brand}</strong> - දවසකට රු. {vehicle.baseRentalPrice}
                  {vehicle.hasAirConditioning ? " (A/C සහිතයි ❄️)" : ""}
                  {vehicle.includesHelmet ? " (හෙල්මට් එකක් ලැබේ 🪖)" : ""}
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;