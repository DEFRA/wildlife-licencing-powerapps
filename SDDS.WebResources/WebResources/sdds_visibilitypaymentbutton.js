var isAsyncCompleted = false;
var show = false;

function VisibilityPaymentButton(formContext) {
    if (isAsyncCompleted) {
    isAsyncCompleted = false;
        return show;
    }
    //var formContext = executionContext.getFormContext();

    var recordId = formContext.data.entity.getId().replace('{', '').replace('}', '');

    Xrm.WebApi.retrieveMultipleRecords("sdds_paymentitem", "?$filter=_sdds_applicationid_value eq " + recordId + " and statuscode eq 1").then(
        function success(result) {
            isAsyncCompleted = true;

            if (result.entities.length > 0) {
                show = true;
                formContext.ui.refreshRibbon(true);
            } else { show = false; }
            // perform additional operations on retrieved records
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    
    return false;
}
