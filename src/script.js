const addButton = document.getElementById("Añadir");
const list = document.getElementById("Lista");
const heating = document.getElementById("Tipo de calefaccion");
const hideableArea = document.getElementById("hideableArea");
const submitButton = document.getElementById("Calcular");

function addToList(){
	let appliance = document.getElementById("Electrodomesticos");
	let applianceName = appliance.options[appliance.selectedIndex].text;
	var listItem = document.createElement("li");
	var nameField = document.createElement('span');

	nameField.textContent = applianceName;
	listItem.appendChild(nameField);
	const labels = ["A", "B", "C", "D", "E", "F", "G"];
	var applianceLabel = document.createElement("select");
	for (var i = 0; i < labels.length; i++) {
		var option = document.createElement("option");
		option.value = 0.7 + i/10;
		option.text = labels[i];
		applianceLabel.appendChild(option);
	}
	listItem.appendChild(applianceLabel);

	let deleteBtn = document.createElement("button");
	deleteBtn.classList.add('delete');
	deleteBtn.innerText = "\u00d7";
	deleteBtn.addEventListener("click", function(e){
		e.target.parentElement.remove();
	}, false);
	listItem.appendChild(deleteBtn);
	

	var firstItem = list.firstChild;
	list.insertBefore(listItem, firstItem);
}
addButton.addEventListener('click', function () {
    addToList();
})

function change_heating(){
	hideableArea.classList.toggle("hidden");
	if (heating.value == "No electrico") {
		//hideableArea.style.maxHeight = null;
		hideableArea.style.display = "none";
	  } else {
		//hideableArea.style.maxHeight = hideableArea.scrollHeight + 'px';
		hideableArea.style.display = "flex";
	}
}

heating.addEventListener('change', function (){
	change_heating();
})

function get_data(form) {
	let formList = document.getElementsByTagName("appliance");
	let powerCapacity = document.getElementById("Potencia contratada");
	let peopleNumber = document.getElementById("Habitantes").value;
	var houseSize;
	let hasElectricHeating = heating.value;
	if (hasElectricHeating) {
		houseSize = document.getElementById("metros cuadrados").value;
	}
	else {
		houseSize = 0;
	}
	let orientation = document.getElementById("Orientacion").value;
	let isolation = document.getElementById("Aislamiento").value;
	let areaType = document.getElementById("Clima").value;
	var applianceList = [];
	for (appliance of formList) {
		applianceList.push(appliance);
	}
	let household = document.getElementById("CasaPiso").value;

	return {
		power: powerCapacity,
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


function calc_consumption(form) {
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

submitButton.addEventListener('click', function (){
	calc_consumption(self.parentElement.parentElement);
})

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
