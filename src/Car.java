// 1. INHERITANCE: 'extends' කෑල්ලෙන් කියන්නේ Car එක Vehicle එකේ ලක්ෂණ "උරුම" කරගන්නවා කියන එකයි.
public class Car extends Vehicle {

    // කාර් එකටම ආවේණික වූ විශේෂ ලක්ෂණයක් (Encapsulation)
    private boolean hasAirConditioning;

    // Constructor එක
    public Car(String vehicleId, String brand, double baseRentalPrice, boolean hasAirConditioning) {
        // 'super' කියන්නේ "මගේ දෙමව්පියන්ට (Vehicle) මේ දත්ත ටික දෙන්න" කියන එකයි.
        // වාහනේ ID එක, Brand එක අපි ආයේ මුල ඉඳන් හදන්නේ නෑ, Vehicle එකටම භාර දෙනවා.
        super(vehicleId, brand, baseRentalPrice);
        this.hasAirConditioning = hasAirConditioning;
    }

    public boolean isHasAirConditioning() {
        return hasAirConditioning;
    }

    // 2. POLYMORPHISM: මේක තමයි බහුරූපීතාව. 
    // Vehicle එකේ තිබුණ 'calculateRent' කියන Method එක කාර් එකට ගැලපෙන විදිහට මෙතන වෙනස් (Override) කරනවා.
    @Override
    public double calculateRent(int days) {
        double total = getBaseRentalPrice() * days;

        // A/C තියෙනවා නම් දවසකට තව රු. 1000ක් එකතු වෙනවා
        if (hasAirConditioning) {
            total += 1000 * days;
        }
        return total;
    }
}