package com.example.vehicle_rental_api.model; // ඔයාගේ package නම එන්න ඕනේ

import lombok.Getter;
import lombok.Setter;

// LOMBOK MAGIC: මේ වචන දෙක දැම්මම, Compile වෙද්දී ඉබේම Getters/Setters හැදෙනවා! කෝඩ් එක හරිම ක්ලීන්!
@Getter
@Setter
public abstract class Vehicle {

    private String vehicleId;
    private String brand;
    private double baseRentalPrice;
    private boolean isAvailable;

    public Vehicle(String vehicleId, String brand, double baseRentalPrice) {
        this.vehicleId = vehicleId;
        this.brand = brand;
        this.baseRentalPrice = baseRentalPrice;
        this.isAvailable = true;
    }

    // Abstraction එක එහෙම්මම තියෙනවා
    public abstract double calculateRent(int days);
}