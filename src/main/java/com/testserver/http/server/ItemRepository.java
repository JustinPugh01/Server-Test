package com.testserver.http.server;

import org.springframework.data.jpa.repository.JpaRepository;

interface ItemRepository extends JpaRepository <Item, Integer> {

}
