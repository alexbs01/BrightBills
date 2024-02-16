
function get_data(){
    let formList = 
    let houseSize = ;
    let peopleNumber = ;
    let hasElectricHeating = ;
    var applianceList = ;
    for(appliance of formList){
        applianceList.append(appliance);
    }

    return {size: houseSize, inhabitants: peopleNumber, electricHeating: hasElectricHeating, appliances: applianceList}
}


function calc_consumption() {
    const houseData = get_data();

}

