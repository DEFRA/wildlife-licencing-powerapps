// JavaScript source code
ApplyBusinessProcessFlowLogic = function (execontext) {
    formContext = execontext.getFormContext();
    //add filter on Case Lead lookup in Business Process Flows
    if (formContext.getControl('header_process_sdds_advisormanager') != null) {
        FilterManger(formContext);
        //FilterAdvisors(formContext);
    }
}

FilterManger = function (formContext) {
    try {
        //build fetch query filter for case leads on user entity
        var fetchQuery;
        fetchQuery = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>"+
                        "<entity name='systemuser'>"+
                        "<attribute name='fullname'/>"+
                        "<attribute name='businessunitid'/>"+
                        "<attribute name='title'/>"+
                        "<attribute name='address1_telephone1'/>"+
                        "<attribute name='positionid'/>"+
                        "<attribute name='systemuserid'/>"+
                        "<order attribute='fullname' descending='false'/>"+
                        "<filter type='and'>" +
                            "<condition attribute='sdds_teamlead' operator='eq' value='1'/>"+
                        "</filter>" +
                        "<link-entity name='teammembership' from='systemuserid' to='systemuserid' visible='false' intersect='true'>" +
                          "<link-entity name='team' from='teamid' to='teamid' alias='aa'>" +
                            "<filter type='and'>" +
                              "<condition attribute='teamid' operator='eq' uiname='Assessors' uitype='team' value='A3E42F5C-2651-EC11-8F8E-000D3A0CE458'/>" +
                            "</filter>" +
                          "</link-entity>" +
                          "</link-entity>" +
                         "</entity></fetch>"

        var layOutXml =  "<grid name='resultset' jump='fullname' select='1' icon='1' preview='1'>"+
                                "<row name='result' id='systemuserid'>"+
                                    "<cell name='fullname' width='300' />"+
                                "</row>"+
                          "</grid>"

        formContext.getControl("header_process_sdds_advisormanager").addCustomView("{00000000-0000-0000-0000-000000000002}", "systemuser", "Manager view", fetchQuery, layOutXml,true);
    } catch (e) {
        Xrm.Utility.alertDialog("addFilter Error: " + (e.description || e.message));
    }
}


FilterAdvisors = function (formContext) {
    try {
        //build fetch query filter for case leads on user entity
        var fetchQuery;
        fetchQuery = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
            "<entity name='systemuser'>" +
            "<attribute name='fullname'/>" +
            "<attribute name='businessunitid'/>" +
            "<attribute name='title'/>" +
            "<attribute name='address1_telephone1'/>" +
            "<attribute name='positionid'/>" +
            "<attribute name='systemuserid'/>" +
            "<order attribute='fullname' descending='false'/>" +
            "<link-entity name='teammembership' from='systemuserid' to='systemuserid' visible='false' intersect='true'>" +
            "<link-entity name='team' from='teamid' to='teamid' alias='aa'>" +
            "<filter type='and'>" +
            "<condition attribute='teamid' operator='eq' uiname='Assessors' uitype='team' value='A3E42F5C-2651-EC11-8F8E-000D3A0CE458'/>" +
            "</filter>" +
            "</link-entity>" +
            "</link-entity>" +
            "</entity></fetch>"

        var layOutXml = "<grid name='resultset' jump='fullname' select='1' icon='1' preview='1'>" +
            "<row name='result' id='systemuserid'>" +
            "<cell name='fullname' width='300' />" +
            "</row>" +
            "</grid>"
        //add custom filter to the lookup
        var viewId = formContext.getControl("sdds_assessorid").getDefaultView();
        formContext.getControl("header_process_sdds_leadadvisor").addCustomView("{00000000-0000-0000-0000-000000000003}", "systemuser", "Lead Advisor view", fetchQuery, layOutXml, true);
        formContext.getControl("header_process_sdds_assessorid").addCustomView(viewId, "systemuser", "Advisor view", fetchQuery, layOutXml, true);
    } catch (e) {
        Xrm.Utility.alertDialog("addFilter Error: " + (e.description || e.message));
    }
}



    