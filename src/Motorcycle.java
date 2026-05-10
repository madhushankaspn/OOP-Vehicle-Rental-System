// INHERITANCE
public class Motorcycle extends Vehicle {

    // බයික් එකට ආවේණික ලක්ෂණයක්
    private boolean includesHelmet;

    public Motorcycle(String vehicleId, String brand, double baseRentalPrice, boolean includesHelmet) {
        super(vehicleId, brand, baseRentalPrice); // Vehicle එකට දත්ත යැවීම
        this.includesHelmet = includesHelmet;
    }

    public boolean isIncludesHelmet() {
        return includesHelmet;
    }

    // POLYMORPHISM
    // බයික් එකේ කුලිය හදන විදිහ කාර් එකට වඩා වෙනස්.
    @Override
    public double calculateRent(int days) {
        double total = getBaseRentalPrice() * days;

        // හෙල්මට් එකක් දෙනවා නම් දවසකට රු. 500ක් එකතු වෙනවා
        if (includesHelmet) {
            total += 500 * days;
        }

        // දවස් 7කට වඩා ගන්නවා නම් මුළු ගාණෙන් 10%  ඩිස්කවුන්ට් එකක් දෙනවා
        if (days > 7) {
            total = total * 0.9;
        }

        return total;
    }
}