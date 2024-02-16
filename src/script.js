
function get_data(form) {
	let formList = form.getElementsByTagName("appliance");
	let peopleNumber = ;
	var houseSize;
	let hasElectricHeating = ;
	if (hasElectricHeating) {
		houseSize = ;
	}
	else {
		houseSize = 0;
	}
	let orientation = ;
	let isolation = ;
	let areaType = ;
	var applianceList = [];
	for (appliance of formList) {
		applianceList.push(appliance);
	}
	let household = ;

	return {
		size: houseSize,
		inhabitants: peopleNumber,
		electricHeating: hasElectricHeating,
		appliances: applianceList,
		orientation: orientation,
		insulation: isolation,
		zone: areaType,
		household: household
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
				houseData.zone * 116) * houseData.household ? 1 : 0.75;
	}

	consumo = consumo * ((houseData.inhabitants / 10) + 0.1);

	return consumo;
}

