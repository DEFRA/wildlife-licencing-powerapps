function pauseClock(formContext) {
    "use strict";
    var applicationId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    Xrm.WebApi.retrieveMultipleRecords("sdds_stageduration", "?$select=activityid&$filter=(actualend eq null and _regardingobjectid_value eq " + applicationId + ")").then(
        function (results) {
            if (results.entities.length > 0) {
                openForm(results.entities[0].activityid, formContext);
            }
        }, function (error) {

        }
    );
}

function openForm(activityId, formContext) {
    "use strict";
    var formOptions = {
        pageType: 'entityrecord',
        entityName: 'sdds_stageduration',
        entityId: activityId,
        formId: '5adcfbac-314e-ec11-8f8e-000d3a0ce458'
    };
    var navOptions = {
        target: 2,
        width: { value: 60, unit: "%" },
        height: { value: 80, unit: "%" },
        position: 1,
        title: "Pause Application"
    }
    Xrm.Navigation.navigateTo(formOptions, navOptions).then(
        function (result) {
            Xrm.WebApi.retrieveRecord("sdds_stageduration", activityId, "?$select=activityid,actualend").then(
                function (result) {
                    if (result.actualend) {
                        formContext.getAttribute("sdds_oldstatus").setValue(formContext.getAttribute("statuscode").getValue());
                        formContext.getAttribute("statuscode").setValue(100000005);
                        formContext.data.entity.save();
                    }
                }, function (error) {

                });
        }, function (error) {
        }
    );
}

function resumeClock(formContext) {
    "use strict";
    debugger;
    var applicationId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    //var stageD={};
//stageD["RegardingObjectId@odata.bind"] = "/sdds_applications("+applicationId+")";
//stageD.actualstart = new Date().toISOString();
//stageD.subject = "Resumed from Paused";
    Xrm.WebApi.createRecord("sdds_stageduration", { "subject": "Resumed from Paused", "regardingobjectid_sdds_application_sdds_stageduration@odata.bind": "/sdds_applications(" + applicationId + ")", "actualstart": new Date() }).then(
        function (result) {
            formContext.getAttribute("statuscode").setValue(formContext.getAttribute("sdds_oldstatus").getValue());
            formContext.data.entity.save();
        }, function (error) {

        }
    );
}