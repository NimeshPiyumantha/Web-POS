/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

$("#btnPurchase").attr('disabled', true);
$("#btnAddToCart").attr('disabled', true);

/**
 * Invoice Details
 * */

/**
 * Invoice Details
 * Order ID
 * */
function generateOrderID() {
    if (orders.length > 0) {
        let lastId = orders[orders.length - 1].oId;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "ODI-001";
    }
}

/**
 * Invoice Details
 * Customer Select Combo
 * */
function loadAllCustomersForOption() {
    $("#cmbCustomerId").empty();
    for (let cus of customers) {
        $("#cmbCustomerId").append(`<option>${cus.id}</option>`);
    }
}

$("#cmbCustomerId").click(function () {
    let rCmbC = customers.find(({id}) => id === $("#cmbCustomerId").val());
    $("#customerName").val(rCmbC.name);
    $("#customerAddress").val(rCmbC.address);
    $("#customerContact").val(rCmbC.contact);
});

/**
 * Items Details
 * Item Select Combo
 * */
function loadAllItemsForOption() {
    $("#cmbItemCode").empty();
    for (let item of items) {
        $("#cmbItemCode").append(`<option>${item.code}</option>`);
    }
}

$("#cmbItemCode").click(function () {
    let rCmbI = items.find(({code}) => code === $("#cmbItemCode").val());
    $("#itemName").val(rCmbI.name);
    $("#itemPrice").val(rCmbI.price);
    $("#qtyOnHand").val(rCmbI.qty);
});

/**
 * Items Details
 * */

let itemCode;
let itemName;
let itemPrice;
let itemQty;
let itemOrderQty;

/**
 * Order Details
 * */
let total = 0;
let discount = 0;
let subTotal = 0;