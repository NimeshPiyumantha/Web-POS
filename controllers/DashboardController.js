/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

$(document).ready(function () {
    $("#HomeSection").css('display', 'block');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
    $("#OrderDetails").css('display', 'none');
});

$("#homeBtn").click(function () {
    $("#HomeSection").css('display', 'block');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
    $("#OrderDetails").css('display', 'none');
});

$("#customerBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'block');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
    $("#OrderDetails").css('display', 'none');

    $("#txtCusId").val(generateCustomerID());
});

$("#itemBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'block');
    $("#OrderSection").css('display', 'none');
    $("#OrderDetails").css('display', 'none');

    $("#txtItemID").val(generateItemID());
});

$("#orderBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'block');
    $("#OrderDetails").css('display', 'none');

    $("#orderId").val(generateOrderID());
});

$("#orderDetailsBtn").click(function () {
    $("#HomeSection").css('display', 'none');
    $("#CustomerSection").css('display', 'none');
    $("#ItemSection").css('display', 'none');
    $("#OrderSection").css('display', 'none');
    $("#OrderDetails").css('display', 'block');

    loadAllOrders();
    loadAllOrderDetails();
});
