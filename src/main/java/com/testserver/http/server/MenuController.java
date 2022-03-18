package com.testserver.http.server;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController {
    private MenuRepository repo;
    private RestaurantRepository restaurantRepo;

    public MenuController(MenuRepository repo, RestaurantRepository restaurantRepo) {
        this.repo = repo;
        this.restaurantRepo = restaurantRepo;
    }

    @PostMapping("/restaurants/{restaurant_id}/menus")
    public Menu addMenu(@RequestBody Menu menuData, @PathVariable Integer restaurant_id) {
        Restaurant restaurant = restaurantRepo.findById(restaurant_id).get();
        menuData.setRestaurant(restaurant);
        return repo.save(menuData);

    }   
    @DeleteMapping("/restaurants/{restaurant_id}/menus/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }

}
