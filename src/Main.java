public class Main {
    public static void main(String[] args) {

        // 1. Objects සෑදීම (වාහන පද්ධතියට ඇතුළත් කිරීම)
        // කාර් එකක් හදනවා: ID=C001, Brand=Toyota, දවසකට=5000, A/C තියෙනවා=true
        Car car1 = new Car("C001", "Toyota Premio", 5000.0, true);

        // බයික් එකක් හදනවා: ID=M001, Brand=Honda, දවසකට=2000, හෙල්මට් දෙනවා=true
        Motorcycle bike1 = new Motorcycle("M001", "Honda Hornet", 2000.0, true);

        // 2. POLYMORPHISM වල නියම මැජික් එක!
        // කාර් එකයි බයික් එකයි ජාති දෙකක් වුණාට, අපි ඒ දෙකම 'Vehicle' (වාහන) කියන පොදු ලැයිස්තුවකට දානවා.
        Vehicle[] myVehicles = {car1, bike1};

        System.out.println("--- Welcome to Smart Vehicle Rental ---");
        int daysToRent = 10; // දවස් 10කට කුලියට දෙනවා යැයි සිතමු

        // 3. ලැයිස්තුවේ තියෙන හැම වාහනයක්ම එකින් එක අරන් බලනවා
        for (Vehicle v : myVehicles) {

            v.displayDetails(); // වාහනේ විස්තර පෙන්නනවා

            // මෙතනදි අපි කතා කරන්නේ පොදුවේ 'v.calculateRent' කියලයි.
            // හැබැයි Java දන්නවා මේක කාර් එකක් නම් කාර් එකේ විදිහටත්, බයික් එකක් නම් බයික් එකේ විදිහටත් ගාණ හදන්න!
            double totalRent = v.calculateRent(daysToRent);

            System.out.println("Total Rent for " + daysToRent + " days: Rs. " + totalRent);
            System.out.println("---------------------------------------");
        }
    }
}