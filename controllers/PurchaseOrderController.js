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

/**
 * Logics
 * Place order
 * */
let tableRow = [];
$("#btnAddToCart").on( "click", function() {
    let duplicate = false;
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        if ($("#cmbItemCode option:selected").text() === $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;

        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#buyQty").val());
        calcTotal($("#buyQty").val() * $("#itemPrice").val());
    }else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(4)').text($("#buyQty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#buyQty").val() * $("#itemPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val() * $("#itemPrice").val());

    }

    /**
     * Logics
     * Place order
     * Table Add logic
     * */
    $("#tblAddToCart>tr").click('click', function () {

        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        $("#cmbItemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemPrice").val(unitPrice);
        $("#buyQty").val(qty);
        $("#txtTotal").val(total);

    });
});

/**
 * Logics
 * Place order
 * Reduce QtyOnHand
 * */
function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

/**
 * Logics
 * Place order
 * Calculate Total
 * */

function calcTotal(amount) {
    total += amount;
    $("#txtTotal").val(total);
}

/**
 * Logics
 * Place order
 * Manage Available Qty
 * */
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyOnHand").val(avaQty);
}

/**
 * Logics
 * Place order
 * Manage Total
 * */

function manageTotal(preTotal, nowTotal) {
    total -= preTotal;
    total += nowTotal;

    $("#txtTotal").val(total);
}


/**
 * Logics
 * Place order
 * Table Load
 * */
$("#tblAddToCart").empty();

function loadCartTableDetail() {
    itemCode = $("#cmbItemCode").val();
    itemName = $("#itemName").val();
    itemPrice = $("#itemPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();

    let total = itemPrice * itemOrderQty;
    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;

    $("#tblAddToCart").append(row);
}

/**
 * Logics
 * Place order
 * Enter BuyQty and Check Qty On Hand
 * */

$(document).on("change keyup blur", "#buyQty", function () {
    let qtyOnHand = $("#qtyOnHand").val();
    let buyQty = $("#buyQty").val();
    let buyOnHand = qtyOnHand - buyQty;
    if (buyOnHand < 0) {
        $("#lblCheckQty").parent().children('strong').text(qtyOnHand + " : Empty On Stock..!!");
        $("#btnAddToCart").attr('disabled', true);
    } else {
        $("#lblCheckQty").parent().children('strong').text("");
        $("#btnAddToCart").attr('disabled', false);
    }
});