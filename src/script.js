
function get_data(form){
    let formList = form.getElementsByTagName("appliance");
    let peopleNumber = ;
    var houseSize;
    let hasElectricHeating = ;
    if(hasElectricHeating){
        houseSize = ;
    }
    else{
        houseSize = 0;
    }
    let orientation = ;
    let isolation = ;
    let areaType = ;
    var applianceList = [];
    for(appliance of formList){
        applianceList.push(appliance);
    }

    return {
        size: houseSize,
        inhabitants: peopleNumber,
        electricHeating: hasElectricHeating,
        appliances: applianceList,
        orientation: orientation,
        insulation: isolation,
        zone: areaType
    }
}


function calc_consumption(button) {
    let form = button.parentNode;
    const houseData = get_data(form);

}

