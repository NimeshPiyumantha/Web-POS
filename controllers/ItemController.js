/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

/**
 * Item Save
 * */

$("#btnAddItem").attr('disabled', true);
$("#btnUpdateItem").attr('disabled', true);
$("#btnDeleteItem").attr('disabled', true);

/**
 * Item Save
 * Item ID
 * */
function generateItemID() {
    if (items.length > 0) {
        let lastId = items[items.length - 1].code;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "I00-001";
    }
}

/**
 * Button Add New Item
 * */
$("#btnAddItem").on( "click", function() {

    //create object
    let itemsArray = new itemDTO(
        $("#txtItemID").val(),
        $("#txtItemName").val(),
        $("#txtItemQty").val(),
        $("#txtItemPrice").val());

    clearItemTextFields();

    //Alert Save
    saveUpdateAlert("Items", "saved.");

    //Add the customer object to the array
    items.push(itemsArray);

    /* console.log(customers);*/
    $("#txtItemID").val(generateItemID());
    loadAllItems();
});

/**
 * clear input fields Values Method
 * */
function clearItemTextFields() {
    txtItemID.value = '';
    txtItemName.value = '';
    txtItemQty.value = '';
    txtItemPrice.value = '';
    $("#txtItemName").focus();

    $("#btnAddItem").attr('disabled', true);
    $("#btnUpdateItem").attr('disabled', true);
    $("#btnDeleteItem").attr('disabled', true);
}

/**
 * load all Item Method
 * */
function loadAllItems() {

    //remove all the table body content before adding data
    $("#ItemTable").empty();


    // get all items records from the array
    for (var item of items) {
        console.log(item);// items object

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;

        //then add it to the table body of items table
        $("#ItemTable").append(row);
    }
    blindClickEventsItem();
    dblRowClickEventsItem();
    $("#txtItemID").val(generateItemID());
}


