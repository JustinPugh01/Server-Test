package com.testserver.http.server;

import org.springframework.data.jpa.repository.JpaRepository;

interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
}
