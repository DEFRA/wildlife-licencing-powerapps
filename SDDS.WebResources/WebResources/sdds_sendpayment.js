function SendPayment(formContext) {
    var recordId = formContext.data.entity.getId().replace('{', '').replace('}', '');
    var params = JSON.stringify({ guid: recordId })

    var pth = "https://prod-03.uksouth.logic.azure.com:443/workflows/c89ce031dd734cc3a896b4d9ed9bb2ab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tHbnow3jTLlov4oNovlC_CcBDUMzeYfKx78OuTJb01g";
    var payMentXhr = new XMLHttpRequest();
    debugger;
    payMentXhr.open("POST", pth, true);
    payMentXhr.setRequestHeader("Accept", "*/*,application/json,text/javascript");
    payMentXhr.setRequestHeader("Content-Type", "application/json");
    payMentXhr.responseType = "text";
    payMentXhr.onloadstart = function () { Xrm.Utility.showProgressIndicator("Processing Charge Request...."); }
    //payMentXhr.onloadend = function () { Xrm.Utility.closeProgressIndicator();}
    payMentXhr.onreadystatechange = function () {
        if (payMentXhr.readyState === 4) {
            if (payMentXhr.status === 200) {
                Xrm.Utility.closeProgressIndicator();
                console.log(payMentXhr.response);
                if (payMentXhr.responseText == "successful" || payMentXhr.response == "successful") {
                    var alertStrings = { confirmButtonLabel: "OK", text: "Charge request was successfully processed", title: "Charge Summary" };
                    var alertOptions = { height: 120, width: 260 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                        function (success) {
                            formContext.ui.refreshRibbon();
                            formContext.getControl("payment").refresh();
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );
                }
            }


        }
    }
    payMentXhr.onerror = function () {
        Xrm.Navigation.openErrorDialog({ errorCode: 1234 });
    }
    payMentXhr.send(params);
}

function RefreshRibbon(execontext){
     var formContext = execontext.getFormContext();
     var gridContext = formContext.getControl("payment");
      gridContext.addOnLoad(function(){
      formContext.ui.refreshRibbon();
     });
     
}