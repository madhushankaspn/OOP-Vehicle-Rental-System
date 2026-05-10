package com.example.vehicle_rental_api.controller;

import com.example.vehicle_rental_api.model.Car;
import com.example.vehicle_rental_api.model.Motorcycle;
import com.example.vehicle_rental_api.model.Vehicle;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

// 1. මේක තමයි අපේ "වේටර්" කියලා Spring Boot එකට අඳුන්වලා දෙන වචනය
@RestController
// 2. මේ වේටර් ඉන්නේ මොන මේසේ ළඟද කියන ලිපිනය
@RequestMapping("/api/vehicles")
// 3. ඉස්සරහට අපි හදන React ඇප් එකට මේකට කතා කරන්න අවසර දෙනවා (CORS Error එක නැති කරන්න)
@CrossOrigin(origins = "*")
public class VehicleController {

    // අපිට තවම Database එකක් නැති නිසා අපි තාවකාලිකව වාහන ටික List එකක දාගන්නවා
    private List<Vehicle> vehicleList = new ArrayList<>();

    // මේක Constructor එක. මේ Class එක හැදෙනකොටම අපි වාහන දෙකක් List එකට දානවා
    public VehicleController() {
        vehicleList.add(new Car("C001", "Toyota Premio", 5000.0, true));
        vehicleList.add(new Motorcycle("M001", "Honda Hornet", 2000.0, true));
    }

    // 4. පාරිභෝගිකයා "වාහන ලිස්ට් එක දෙන්න" කියලා GET Request එකක් එවපුවාම වැඩ කරන Method එක
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        // අපි මේ යවන්නේ Java List එකක් වුණාට, @RestController එක නිසා මේක ඉබේම JSON වලට හැරිලා යනවා!
        return vehicleList;
    }
}