
function get_data(form){
    let formList = form.getElementsByTagName("appliance");
    let houseSize = ;
    let peopleNumber = ;
    let hasElectricHeating = ;
    var applianceList = ;
    for(appliance of formList){
        applianceList.append(appliance);
    }

    return {size: houseSize, inhabitants: peopleNumber, electricHeating: hasElectricHeating, appliances: applianceList}
    
}


function calc_consumption(button) {
    let form = button.parentNode;
    const houseData = get_data(form);

}

