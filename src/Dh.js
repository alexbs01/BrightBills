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
			if (element.nD < salida) out.push(element.empresa + ": " + (element.nD * consumo).toString)
		} else {
			if ((element.D[0] * salidas[0] + element.D[1] * salidas[1] + element.D[2] * salidas[2]) < importe) {
				out.push(
					element.empresa +
					": " +
					(element.D[0] * salidas[0] + element.D[1] * salidas[1] + element.D[2] * salidas[2]).toString)
			}
		}
	});

	return out;
}
