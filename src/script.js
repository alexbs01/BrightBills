const addButton = document.getElementById("Añadir");
const list = document.getElementById("Lista");
const heating = document.getElementById("Tipo de calefaccion");
const hideableArea = document.getElementById("hideableArea");

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

function change_heating(){
	hideableArea.classList.toggle("hidden");
	if (heating.value == "No electrico") {
		hideableArea.style.maxHeight = null;
	  } else {
		hideableArea.style.maxHeight = hideableArea.scrollHeight + 'px';
	}
}

heating.addEventListener('change', function (){
	change_heating();
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

/*const url = "https://api.esios.ree.es/archives/70/download_json?date=";

function fijaToVariabol(consumos, startDate, endDate, cost) {
	var prices = [];
	var j = 0;
	for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
		fetch(url + d.toISOString().substring(0, 10))
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				response = JSON.parse(response.json()).PVPC;
				for (var i = 0; i <= 24; i++) {
					prices[j + i] = { hour: i, PCB: response[i].PCB, CYM: response[i].CYM };
				}
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
		j = j + 24;
	}

	for (var i = 0; i<= consumos.lenght(); i++){
		prices[i]= consumos[i]*prices[i];
	}


	var sumCosts = 0;
	prices.forEach(element => {
		sum = sum+element;
	});

	
}*/
