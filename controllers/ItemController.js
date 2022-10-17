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