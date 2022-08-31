//100,000,000 IROPI
//100,000,001 Disease Risk
//100,000,002 FCS
//100,000,003 NSA
//100,000,004 Technical

function OnLoadEvent(context) {
    ShowTabs(context);
    OnLookUpClick(context);
}

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

// JavaScript source code
function OnLookUpClick(executionContext) {
    var formContext = executionContext.getFormContext();
    //Get all attributes on form on event.
    formContext.data.entity.attributes.forEach(function (attribute, index) {
        //For each attribute check whether the attribute type is "lookup" or not.
        var attributeType = attribute.getAttributeType();
        if (attributeType == "lookup") {
            var attrName = attribute.getName();
            //If attribute is of lookup type, add OnLookupTagClick event to field
            OpenLookupDialog(formContext, attrName);
        }
    });
}

function OpenLookupDialog(formContext, lookupField) {
    formContext.getControl(lookupField).addOnLookupTagClick(context => {
        context.getEventArgs().preventDefault();
        const lookupTagValue = context.getEventArgs().getTagValue();
        Xrm.Navigation.navigateTo(
            {
                pageType: "entityrecord",
                entityName: lookupTagValue.entityType,
                formType: 2,
                entityId: lookupTagValue.id
            },
            {
                target: 2,
                position: 1,
                width: {
                    value: 70,
                    unit: "%"
                }
            });
    });
}