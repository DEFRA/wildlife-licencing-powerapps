//100,000,000 IROPI
//100,000,001 Disease Risk
//100,000,002 FCS
//100,000,003 NSA
//100,000,004 Technical


function ShowTabs(context) {
    var formContext = context.getFormContext();
    var applicationType = formContext.getAttribute("sdds_applicationtypesid").getValue()
    if (applicationType !== null && applicationType !== undefined) {
        var applicationTypeId = formContext.getAttribute("sdds_applicationtypesid").getValue()[0].id.replace('{', '').replace('}', '');

        Xrm.WebApi.retrieveRecord("sdds_applicationtypes", applicationTypeId, "?$select=sdds_assessment").then(
            function success(result) {
                //console.log("Retrieved values: Name: " + result.name + ", Revenue: " + result.revenue);
                var assessments = result.sdds_assessment.split(",");
                assessments.forEach(function (e) {
                    var el = parseInt(e)
                    ShowHideTabs(el, formContext)
                })
                // perform operations on record retrieval
            },
            function (error) {
                console.log(error.message);
                // handle error conditions
            }
        );
    }
}

function ShowHideTabs(fieldVal, formContext) {
    switch (fieldVal) {
        case 100000003:
            formContext.ui.tabs.get("nsa").setVisible(true);
            break;
        case 100000000:
            formContext.ui.tabs.get("iropi").setVisible(true);
            break;
        case 100000002:
            formContext.ui.tabs.get("fcs").setVisible(true);
            break;
        case 100000004:
            formContext.ui.tabs.get("technical_assessment").setVisible(true);
            break;
        default:
            formContext.ui.tabs.get("risk_assessment").setVisible(true);
    }

}