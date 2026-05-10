// 1. ABSTRACTION: අපි මේකට abstract කියන වචනය පාවිච්චි කරනවා.
// ඒ කියන්නේ මේක "අදහසක්" විතරයි. පාරේ යන්නේ "වාහන" නෙවෙයි, "කාර්" හෝ "බයික්".
// ඒ නිසා කාටවත් බෑ Vehicle class එකෙන් කෙලින්ම Object එකක් හදන්න.
public abstract class Vehicle {

    // 2. ENCAPSULATION: අපි මේ variables 'private' කරනවා.
    // එතකොට පිටින් එන කෙනෙක්ට මේවා හිතූ මනාපයට වෙනස් කරන්න බෑ. 
    // දත්ත ආරක්ෂා කිරීම (Data Hiding) තමයි මෙතන වෙන්නේ.
    private String vehicleId;
    private String brand;
    private double baseRentalPrice;
    private boolean isAvailable;

    // Constructor: Object එකක් මුලින්ම හදද්දී දත්ත ඇතුළත් කරන තැන.
    public Vehicle(String vehicleId, String brand, double baseRentalPrice) {
        this.vehicleId = vehicleId;
        this.brand = brand;
        this.baseRentalPrice = baseRentalPrice;
        this.isAvailable = true; // මුලින්ම වාහනයක් පද්ධතියට එද්දී ඒක කුලියට දීමට තිබේ (Available).
    }

    // ENCAPSULATION (Getters & Setters): 
    // Private කරපු දත්ත බලන්න සහ පාලනයකින් යුතුව වෙනස් කරන්න දෙන ක්‍රම.
    public String getVehicleId() {
        return vehicleId; }

    public String getBrand() {
        return brand; }
    public double getBaseRentalPrice() {
        return baseRentalPrice; }

    public boolean isAvailable() {
        return isAvailable; }

    public void setAvailable(boolean available) {
        this.isAvailable = available;
    }

    // ABSTRACTION: මේක Abstract Method එකක්.
    // වාහනයක් වුණාම ඒකට කුලියක් (Rent) තියෙන්න ඕනේ. හැබැයි ඒක ගණනය කරන විදිහ
    // කාර් එකකටයි, බයික් එකකටයි වෙනස්. ඒ නිසා අපි මෙතන ලොජික් එක ලියන්නේ නෑ.
    // මේක පාවිච්චි කරන කෙනාට (Subclasses) අපි බල කරනවා මේක ලියන්න කියලා.
    public abstract double calculateRent(int days);

    // පොදු ක්‍රියාවක් (Method)
    public void displayDetails() {
        System.out.println("ID: " + vehicleId + " | Brand: " + brand + " | Available: " + isAvailable);
    }
}