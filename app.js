(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

var bought=null;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy=this;

  //toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getShoppingItems();
  toBuy.toBuyMessage=false;

  toBuy.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();
  bought.boughtMessage=true;
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var shoppingList = [ 
                       {name:"Boxes of Cereal", quantity:"10"}, 
                       {name:"Broccoli",        quantity:"5"},
                       {name:"Licorice Sticks", quantity:"100"},
                       {name:"Avocados",        quantity:"7"},
                       {name:"Boxes of Tofu",   quantity:"3"}
                      ];
  // List of bought shopping items
  var boughtList = [];

  service.removeItem = function (itemIndex) {
    boughtList[boughtList.length]=shoppingList[itemIndex];
    shoppingList.splice(itemIndex, 1);      // remove 1 item at position itemIndex
    if (shoppingList.length === 0)          // manage list messages
      toBuy.toBuyMessage=true;
    else
      bought.boughtMessage=false;
  };

  service.getShoppingItems = function () {
    return shoppingList;
  };

  service.getBoughtItems = function (boughtObj) {
    return boughtList;
  }
}

})();