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
$("#btnAddItem").on("click", function () {

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

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEventsItem() {
    $("#ItemTable>tr").click(function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#txtItemID").val(code);
        $("#txtItemName").val(name);
        $("#txtItemQty").val(qty);
        $("#txtItemPrice").val(price);

        $("#btnAddItem").attr('disabled', true);
        $("#btnDeleteItem").attr('disabled', false);

    });
}

/**
 * Table Listener double click and Click and Remove textFields
 * */
function dblRowClickEventsItem() {
    $("#ItemTable>tr").on('dblclick', function () {
        let deleteItemID = $(this).children().eq(0).text();
        yesNoAlertIDelete(deleteItemID);

    });
}

/**
 * Search id and Load Table
 * */
$("#btnSearchItem").on("keypress", function (event) {
    if (event.which === 13) {
        var resultI = items.find(({code}) => code === $("#ItemIdSearch").val());
        console.log(resultI);

        if (resultI != null) {
            $("#ItemTable").empty();
            var row = `<tr><td>${resultI.code}</td><td>${resultI.name}</td><td>${resultI.qty}</td><td>${resultI.price}</td></tr>`;
            $("#ItemTable").append(row);

            $("#txtItemID").val(resultI.code);
            $("#txtItemName").val(resultI.name);
            $("#txtItemQty").val(resultI.qty);
            $("#txtItemPrice").val(resultI.price);

            $("#btnAddItem").attr('disabled', true);
            $("#btnDeleteItem").attr('disabled', false);

        } else {
            emptyMassage();
            clearItemTextFields();
            loadAllItems();
        }
    }
});