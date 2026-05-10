package com.example.vehicle_rental_api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Car extends Vehicle {

    private boolean hasAirConditioning;

    public Car(String vehicleId, String brand, double baseRentalPrice, boolean hasAirConditioning) {
        super(vehicleId, brand, baseRentalPrice);
        this.hasAirConditioning = hasAirConditioning;
    }

    @Override
    public double calculateRent(int days) {
        double total = getBaseRentalPrice() * days;
        if (hasAirConditioning) {
            total += 1000 * days;
        }
        return total;
    }
}