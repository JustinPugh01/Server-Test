package com.testserver.http.server;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantController{
    private RestaurantRepository repository;

    public RestaurantController(RestaurantRepository repository){
        this.repository = repository; 

    }
    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurants(){ 
        return this.repository.findAll();
    }

    @PostMapping("/restaurants")
    public Restaurant createRestaurant(@RequestBody Restaurant newRestaurant){
        return repository.save(newRestaurant);
        
    }

    
        



}