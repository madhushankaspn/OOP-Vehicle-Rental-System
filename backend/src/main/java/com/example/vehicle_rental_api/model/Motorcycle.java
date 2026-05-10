package com.example.vehicle_rental_api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Motorcycle extends Vehicle {

    private boolean includesHelmet;

    public Motorcycle(String vehicleId, String brand, double baseRentalPrice, boolean includesHelmet) {
        super(vehicleId, brand, baseRentalPrice);
        this.includesHelmet = includesHelmet;
    }

    @Override
    public double calculateRent(int days) {
        double total = getBaseRentalPrice() * days;
        if (includesHelmet) {
            total += 500 * days;
        }
        if (days > 7) {
            total = total * 0.9;
        }
        return total;
    }
}