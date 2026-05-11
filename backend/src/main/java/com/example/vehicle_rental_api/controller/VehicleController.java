package com.example.vehicle_rental_api.controller;

import com.example.vehicle_rental_api.model.Vehicle;
import com.example.vehicle_rental_api.model.Car;
import com.example.vehicle_rental_api.model.Motorcycle;
import com.example.vehicle_rental_api.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*") // React එකට අවසර දීම
public class VehicleController {

    // මැජික් එක! අපි හදපු Repository එක මෙතනට සම්බන්ධ කරනවා
    @Autowired
    private VehicleRepository vehicleRepository;

    // 1. READ (GET) - Database එකේ තියෙන වාහන ඔක්කොම ගන්න
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        // Database එකෙන් ඔක්කොම වාහන ටික අදිනවා
        List<Vehicle> vehicles = vehicleRepository.findAll();

        // ඔයාගේ අලුත් Database එක තාම හිස් නිසා, මුලින්ම වාහන දෙකක් ඉබේම Save වෙන්න මම පොඩි කෑල්ලක් දැම්මා.
        if (vehicles.isEmpty()) {
            Car car = new Car("V001", "Toyota Premio", 5000.0, true);
            Motorcycle bike = new Motorcycle("V002", "Honda Hornet", 2000.0, true);

            vehicleRepository.save(car);
            vehicleRepository.save(bike);

            // Save කළාට පස්සේ ආයෙත් Database එකෙන් දත්ත ටික ගන්නවා
            vehicles = vehicleRepository.findAll();
        }

        return vehicles;
    }

    // 2. CREATE (POST) - අලුත් කාර් එකක් Database එකට දාන්න
    @PostMapping("/car")
    public Vehicle addCar(@RequestBody Car car) {
        return vehicleRepository.save(car);
    }

    // අලුත් යතුරුපැදියක් Database එකට දාන්න
    @PostMapping("/motorcycle")
    public Vehicle addMotorcycle(@RequestBody Motorcycle motorcycle) {
        return vehicleRepository.save(motorcycle);
    }

    // 3. DELETE - වාහනයක් Database එකෙන් මකන්න
    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable String id) {
        vehicleRepository.deleteById(id);
        return "වාහනය සාර්ථකව මකා දැමුවා!";
    }
}