// JavaScript source code

function updateRecord(context) {
    var formContext = context.getFormContext();
    var recordId = formContext.data.entity.getId().replace('{', '').replace('}', '');
    formContext.data.process.addOnStageChange(onStageChange(recordId));
}

function onStageChange(id) {

    var activeStage = formContext.data.process.getActiveStage();
    var name = activeStage.getName();
    if (name == "Complete Initial Checks") {
        UpdateRecordStatus(100000000, id);
    } else if (name == "Allocate For Assessment") {
        UpdateRecordStatus(100000001, id);
    } else if (name == "Assessment ") {
        UpdateRecordStatus(100000002, id);
    } else if (name == "Decision") {
        UpdateRecordStatus(100000003, id);
    } else if (name == "Issue") {
        UpdateRecordStatus(100000004, id);
    }else return;
}


function UpdateRecordStatus(code,id) {
    // define the data to update a record
    var data =
    {
        "statecode": 0,
        "statuscode": code
    };
    // update the record
    Xrm.WebApi.updateRecord("sdds_application", id, data).then(
        function success(result) {
            console.log("SDDS updated");
            // perform operations on record update
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

}
