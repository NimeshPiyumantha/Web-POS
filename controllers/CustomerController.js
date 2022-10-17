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

/**
 * Button Add New Customer
 * */
$("#btnSaveCustomer").on( "click", function() {

    //create object
    let CustomerArray = new customerDTO(
        $("#txtCusId").val(),
        $("#txtCusName").val(),
        $("#txtCusAddress").val(),
        $("#txtContactNumber").val());

    clearCusTextFields();

    //Alert Save
    saveUpdateAlert("Customer", "saved.");

    //Add the customer object to the array
    customers.push(CustomerArray);

    /* console.log(customers);*/
    $("#txtCusId").val(generateCustomerID());
    loadAllCustomers();
});

/**
 * clear input fields Values Method
 * */
function clearCusTextFields() {
    txtCusId.value = '';
    txtCusName.value = '';
    txtCusAddress.value = '';
    txtContactNumber.value = '';
    $("#txtCusId").focus();
}

/**
 * load all customers Method
 * */
function loadAllCustomers() {

    //remove all the table body content before adding data
    $("#customerTable").empty();

    // get all customer records from the array
    for (var customer of customers) {
        console.log(customer);// customer object

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;

        //then add it to the table body of customer table
        $("#customerTable").append(row);
    }
    blindClickEvents();
    dblRowClickEventsCus();
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#customerTable>tr").on( "click", function() {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();
        console.log(id, name, address, contact);

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtContactNumber").val(contact);

    });
}


/**
 * Table Listener double click and Click and Remove textFields
 * */
function dblRowClickEventsCus() {
    $("#customerTable>tr").on('dbClick', function () {
        let deleteCusID = $(this).children().eq(0).text();
        yesNoAlertDelete(deleteCusID);
    });
}

/**
 * Search id and Load Table
 * */
$("#searchCusId").on( "keypress", function(event) {
    if (event.which === 13) {
        var result = customers.find(({id}) => id === $("#searchCusId").val());
        console.log(result);

        if (result != null) {
            $("#customerTable").empty();
            var row = `<tr><td>${result.id}</td><td>${result.name}</td><td>${result.address}</td><td>${result.contact}</td></tr>`;
            $("#customerTable").append(row);

            $("#txtCusId").val(result.id);
            $("#txtCusName").val(result.name);
            $("#txtCusAddress").val(result.address);
            $("#txtContactNumber").val(result.contact);

        } else {
            emptyMassage();
            clearCusTextFields();
            $("#txtCusId").val(generateCustomerID());
            loadAllCustomers();
        }
    }
});