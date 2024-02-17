// SPDX-FileCopyrightText: 2024 Alejandro Bezerra
// SPDX-FileCopyrightText: 2024 Anton Souto
// SPDX-FileCopyrightText: 2024 Enrique Adega
// SPDX-FileCopyrightText: 2024 Guillen Porto
//
// SPDX-License-Identifier: Apache-2.0

function init(){
	localStorage.setItem("Nevera", "0");
	localStorage.setItem("Vitroceramica", "0");
	localStorage.setItem("Microondas", "0");
	localStorage.setItem("Horno", "0");
	localStorage.setItem("Lavavajillas", "0");
	localStorage.setItem("Lavadora", "0");
	localStorage.setItem("Secadora", "0");
	localStorage.setItem("Plancha", "0");
	localStorage.setItem("Aire Acondicionado", "0");
}

init();

const addButton = document.getElementById("Añadir");
const list = document.getElementById("Lista");
const heating = document.getElementById("Tipo de calefaccion");
const hideableArea = document.getElementById("hideableArea");
const form = document.getElementById("formulario");
const formFact = document.getElementById("formFact");
const fixedButton = document.getElementById("boton-fijo");
const fixedForm = document.getElementById("Form-Fijo");
const feeButton = document.getElementById("boton-tarifa");
const feeForm = document.getElementById("Form-Factura");
const resultContainer = document.getElementById("resultContainer");
const buttonTCon = document.getElementById("BotonCDH");
const buttonTSin = document.getElementById("BotonSDH");
//const caltTarifaa = document.getElementById("calcTarifa"); // Con esta línea, Tarifa no va

formFact.addEventListener('submit', function(event){
	caltTarifaa();
	event.preventDefault();
})

var discriminante = true;
buttonTCon.addEventListener('click', function(){
	discriminante = true;
	buttonTCon.classList.add("active");
	buttonTSin.classList.remove("active");
})
buttonTSin.addEventListener('click', function(){
	discriminante = false;
	buttonTCon.classList.remove("active");
	buttonTSin.classList.add("active");
	
})


function caltTarifaa(){
    var consumo = document.getElementById("ConsumoT").value;
    var importe = document.getElementById("PrecioT").value;
    var out = dhour(Number(consumo), Number(importe), discriminante);
    var lista = document.getElementById("listaTarifas");
	lista.innerHTML='';
	out.forEach(element => {

		var li = document.createElement("li");
		li.appendChild(document.createTextNode(element));
		lista.appendChild(li);
	});

}

var amounts = {"nevera": 0, }

function addToList(){
	let appliance = document.getElementById("Electrodomesticos");
	let applianceName = appliance.options[appliance.selectedIndex].text;
	var listItem = document.createElement("li");
	var nameField = document.createElement('span');

	nameField.textContent = applianceName;
	listItem.appendChild(nameField);
	/*const labels = ["A", "B", "C", "D", "E", "F", "G"];
	var applianceLabel = document.createElement("select");
	for (var i = 0; i < labels.length; i++) {
		var option = document.createElement("option");
		option.value = (0.7 + i/10) * appliance.value;
		option.text = labels[i];
		applianceLabel.appendChild(option);
	}
	listItem.appendChild(applianceLabel);*/
	var appNum = Number(localStorage.getItem(applianceName))+1;
	appNum = appNum.toString();
	localStorage.setItem(applianceName, appNum);


	let deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerText = "\u00d7";
	deleteBtn.addEventListener("click", function(e){
		let name = e.target.parentElement.querySelector("span").textContent;
		e.target.parentElement.remove();
		localStorage.setItem(name, (Number(localStorage.getItem(name))-1).toString());

	}, false);
	listItem.appendChild(deleteBtn);
	listItem.classList.add("appliance");

	var firstItem = list.firstChild;
	list.insertBefore(listItem, firstItem);
}
addButton.addEventListener('click', function () {
    addToList();
})

function change_heating(){
	hideableArea.classList.toggle("hidden");
	houseField = document.getElementById("metros cuadrados");
	if (heating.options[heating.selectedIndex].text == "No electrico") {
		houseField.removeAttribute("required");
		hideableArea.style.display = "none";
	} else {
		hideableArea.style.display = "flex";
		houseField.setAttribute("required", true);
	}
}

heating.addEventListener('change', function (){
	change_heating();
})

function get_data(form) {
	let hasElectricHeating = Number(heating.value);
	if (hasElectricHeating) {
		houseSize = document.getElementById("metros cuadrados").value;
	}
	else {
		houseSize = 0;
	}
	//let formList = document.getElementsByClassName("appliance");
	let powerCapacity = document.getElementById("Potencia Contratada").value;
	let peopleNumber = document.getElementById("Habitantes").value;
	var houseSize;
	let orientation = document.getElementById("Orientacion").value;
	let isolation = document.getElementById("Aislamiento").value;
	let areaType = document.getElementById("Clima").value;
	var applianceList = [
		Number(localStorage.getItem("Nevera"))*300,
		Number(localStorage.getItem("Horno"))*1500,
		Number(localStorage.getItem("Miroondas"))*1200,
		Number(localStorage.getItem("Lavadora"))*2000,
		Number(localStorage.getItem("Secadora"))*270,
		Number(localStorage.getItem("Vitrocerámica"))*1500,
		Number(localStorage.getItem("Lavavajillas"))*1850,
		Number(localStorage.getItem("Plancha"))*1500,
		Number(localStorage.getItem("Aire Acondicionado"))*1450
	];
	//let prices = document.querySelectorAll("ul li select");
	/*for(var i in formList){
		//var appliance = formList[i];
		var estimateConsumption = formList[i].querySelector("select").value;
		applianceList.push(estimateConsumption);
	}*/
	/*for(var i in prices){
		applianceList.push(prices[i].v);
	}*/
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
				houseData.zone * 116) * houseData.household/25;
	}

	consumob = consumo * ((houseData.inhabitants / 10) + 0.1)/1000;
	consumoa = (consumo)/1000;

	consumoa = consumoa.toFixed(2);
	consumob = consumob.toFixed(2);

	const resultContainer = document.getElementById("resultContainer");
	resultContainer.textContent = `Consumo máximo estadístico: ${consumob} kWh\n
	Consumo máximo teórico: ${consumoa} kWh `;
	resultContainer.style.display = "flex";
	//localStorage.clear;
	//init();
}

form.addEventListener('submit', function (event){
	console.log("a");
	calc_consumption(self);
	event.preventDefault();
})


function goToFeeTab(){
	feeButton.classList.add("active");
	fixedButton.classList.remove("active");
	feeForm.style.display = "flex";
	fixedForm.style.display = "none";
}

feeButton.addEventListener('click', function (){
	goToFeeTab();
})

function goToFixedTab(){
	feeButton.classList.remove("active");
	fixedButton.classList.add("active");
	feeForm.style.display = "none";
	fixedForm.style.display = "flex";
}

fixedButton.addEventListener('click', function (){
	goToFixedTab();
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

const prices = [
	{ empresa: "Endesa", nD: 0.1, D: [0.07,0.10,0.16] },
	{ empresa: "Repsol", nD: 0.13, D: [0.8,0.12,0.15] },
	{ empresa: "Naturgy", nD: 0.11, D: [0.9,0.11,0.13] },
]

function dhour(consumo, importe, tipo) {
	var out = [];
	var pV = 0.51;
	var pL = 0.21;
	var pP = 0.28;

	if (tipo) {
		var salida = importe / consumo;
	} else {
		var salidas = [consumo * pV, consumo * pL, consumo * pP];
	}

	prices.forEach(element => {
		if (tipo) {
			if (element.nD < salida) out.push(element.empresa + ": " + (element.nD * consumo).toFixed(2).toString())
		} else {
			if ((element.D[0] * salidas[0] + element.D[1] * salidas[1] + element.D[2] * salidas[2]) < importe) {
				out.push(
					element.empresa +
					": " +
					(element.D[0] * salidas[0] + element.D[1] * salidas[1] + element.D[2] * salidas[2]).toFixed(2).toString())
			}
		}
	});

	if(out.length == 0) out.push("No disponemos de tarifas mejores")
	
	return out;
}

