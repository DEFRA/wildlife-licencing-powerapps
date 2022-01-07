function onload(context){
    "use strict";
    var formContext = context.getFormContext();
    if(formContext.getAttribute("actualstart").getValue()){
        formContext.getAttribute("actualend").setValue(new Date());
        formContext.getAttribute("sdds_reasonforpause").setRequiredLevel("required"); 
    }
}