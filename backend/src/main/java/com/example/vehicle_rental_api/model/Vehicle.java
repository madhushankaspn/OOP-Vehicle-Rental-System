package com.example.vehicle_rental_api.model; // ඔයාගේ package නම එන්න ඕනේ

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

// LOMBOK MAGIC: මේ වචන දෙක දැම්මම, Compile වෙද්දී ඉබේම Getters/Setters හැදෙනවා! කෝඩ් එක හරිම ක්ලීන්!
@Getter
@Setter
@Document(collection = "smart_vehicles")
public abstract class Vehicle {
    @Id
    private String vehicleId;
    private String brand;
    private double baseRentalPrice;
    private boolean isAvailable;

    // 👇 මෙන්න මෙතනට තමයි මේ අලුත් හිස් Constructor එක එන්න ඕනේ 👇
    public Vehicle() {}

    public Vehicle(String vehicleId, String brand, double baseRentalPrice) {
        this.vehicleId = vehicleId;
        this.brand = brand;
        this.baseRentalPrice = baseRentalPrice;
        this.isAvailable = true;
    }

    // Abstraction එක එහෙම්මම තියෙනවා
    public abstract double calculateRent(int days);
}