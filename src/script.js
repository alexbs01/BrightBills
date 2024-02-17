const addButton = document.getElementById("Añadir");
const list = document.getElementById("Lista");

function addToList(){
	let appliance = document.getElementById("Electrodomesticos");
	let applianceName = appliance.value;
	var listItem = document.createElement("li");
	var nameField = document.createElement('span');
	nameField.textContent = applianceName;
	listItem.appendChild(nameField);
	if(!appliance.classList.contains("special")){
		const labels = ["A", "B", "C", "D", "E", "F", "G"];
		var applianceLabel = document.createElement("select");
		for (var i = 0; i < labels.length; i++) {
			var option = document.createElement("option");
			option.value = labels[i];
			option.text = labels[i];
			applianceLabel.appendChild(option);
		}
		listItem.appendChild(applianceLabel);
	}
	list.appendChild(listItem);
}
addButton.addEventListener('click', function () {
    addToList();
})


/*function get_data(form) {
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
}*/

