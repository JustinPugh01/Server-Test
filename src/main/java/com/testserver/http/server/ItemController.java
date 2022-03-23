package com.testserver.http.server;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemController {

    private MenuRepository menuRepo;
    private ItemRepository itemRepo;

    public ItemController(MenuRepository menuRepo, ItemRepository itemRepo){
        this.menuRepo = menuRepo;
        this.itemRepo = itemRepo; 
    }

    @PostMapping("/restaurants/{restaurant_id}/menus/{menu_id}/items")
    public Item addTooMenu(@RequestBody Item itemData, @PathVariable Integer menu_id){
        Menu menu = menuRepo.findById(menu_id).get();
        itemData.setMenu(menu);
        return itemRepo.save(itemData);
    }

    //@DeleteMapping("/restaurants/{restaurant_id}/menus/{menu_id}/items/[item_id}")
   // public void delete(@PathVariable Integer id) {
   //     itemRepo.deleteById(id);
    //}
    
}
