/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

/**
 * Customer Save
 * */

/**
 * Customer Save
 * Customer ID
 * */
function generateCustomerID() {
    if (customers.length > 0) {
        let lastId = customers[customers.length - 1].id;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "C00-001";
    }
}