
function get_data(form) {
	let formList = form.getElementsByTagName("appliance");
	let houseSize = ;
	let peopleNumber = ;
	let hasElectricHeating = ;
	var applianceList = ;
	for (appliance of formList) {
		applianceList.append(appliance);
	}

	return {
		size: houseSize,
		inhabitants: peopleNumber,
		electricHeating: hasElectricHeating,
		appliances: applianceList,
		orientation: orintation
	}

}


function calc_consumption(button) {
	let form = button.parentNode;
	const houseData = get_data(form);

	var consumo = 0;
	houseData.appliances.forEach(element => {
		consumo = consumo + element;
	});

	if (houseData.electricHeating) {
		consumo = consumo +
			(houseData.size *
				houseData.orientation *
				houseData.insulation *
				houseData.zone * 116);
	}

	consumo = consumo * ((houseData.inhabitants / 10) + 0.1);

	return consumo;
}

