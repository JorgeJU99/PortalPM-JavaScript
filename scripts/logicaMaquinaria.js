//Codigo que se ejeucta al cargar la página
function myOnLoad() {
  cargarMaquinarias();
}

// funcion para cargar el array de maquinarias en el select
function cargarMaquinarias() {
  let maquinarias = [
    {
      codigo: "C01",
      tipo: "Tractores",
      tarifa: 100,
    },
    {
      codigo: "C02",
      tipo: "Mescladores",
      tarifa: 50,
    },
    {
      codigo: "C03",
      tipo: "Volquetas",
      tarifa: 150,
    },
    {
      codigo: "C04",
      tipo: "Tractores",
      tarifa: 100,
    },
    {
      codigo: "C05",
      tipo: "Mescladores",
      tarifa: 50,
    },
    {
      codigo: "C06",
      tipo: "Volquetas",
      tarifa: 150,
    },
  ];

  addOpciones("selectMaquinaria", maquinarias);
  rellenarTablaMaquinaria(maquinarias);
}

// Función para agregar opciones al select
function addOpciones(domElement, array) {
  let select = document.getElementsByName(domElement)[0];
  for (dato in array) {
    let opcion = document.createElement("option");
    opcion.text = array[dato].codigo;
    opcion.value = array[dato].tarifa;
    select.add(opcion);
  }
}

// Función para rellenar la tabla de maquinarias (tablaMaquinaria)
function rellenarTablaMaquinaria(array) {
  for (let index = 0; index < array.length; index++) {
    document.getElementById("tablaMaquinaria").innerHTML +=
      "<tr><th>" +
      array[index].codigo +
      "</th><th>" +
      array[index].tipo +
      "</th><th>" +
      array[index].tarifa +
      "$" +
      "</th> </tr>";
  }
}

// Función para rellenar la tabla de alquiler de maquinarias (tablaAlquiler)
function rellenarTablaAlquilerMaquinaria(array) {
  for (let index = 0; index < array.length; index++) {
    document.getElementById("tablaAlquiler").innerHTML +=
      "<tr><th>" +
      array[index].cliente +
      "</th><th>" +
      array[index].maquinaria +
      "</th><th>" +
      array[index].fechaEntrega +
      "</th><th>" +
      array[index].fechaDevolucion +
      "</th><th>" +
      array[index].tarifa +
      "$" +
      "</th><th>" +
      array[index].dias +
      " días" +
      "</th><th>" +
      array[index].importe +
      "$" +
      "</th><th>" +
      array[index].descuento +
      "$" +
      "</th><th>" +
      array[index].garantia +
      "$" +
      "</th><th>" +
      array[index].totalPagar +
      "$" +
      "</th> </tr>";
  }
}

// Función para realizar el alquiler de la maquinaria
function alquilarMaquinaria() {
  // Objeto alquiler maquinaria
  function alquiler(
    cliente,
    maquinaria,
    fechaEntrega,
    fechaDevolucion,
    tarifa,
    dias,
    importe,
    descuento,
    garantia,
    totalPagar
  ) {
    this.cliente = cliente;
    this.maquinaria = maquinaria;
    this.fechaEntrega = fechaEntrega;
    this.fechaDevolucion = fechaDevolucion;
    this.tarifa = tarifa;
    this.dias = dias;
    this.importe = importe;
    this.descuento = descuento;
    this.garantia = garantia;
    this.totalPagar = totalPagar;
  }

  let clienteInput = document.getElementById("cliente").value;
  let maquinariaInput = document.getElementById("maquinaria");
  let maquinariaTarifa =
    maquinariaInput.options[maquinariaInput.selectedIndex].value;
  let maquinariaCodigo =
    maquinariaInput.options[maquinariaInput.selectedIndex].text;
  let fechaEntregaInput = document.getElementById("fechaEntrega").value;
  let fechaDevolucionInput = document.getElementById("fechaDevolucion").value;
  let diasFechas = calcularDiasFecha(fechaEntregaInput, fechaDevolucionInput);
  let importeAlquiler = calcularImporte(diasFechas, maquinariaTarifa);
  let descuentoAlquiler = calcularDescuento(diasFechas, importeAlquiler);
  let importeTotalAlquiler = calcularImporteTotal(
    importeAlquiler,
    descuentoAlquiler
  );
  let garantiaAlquiler = calcularGarantia(importeTotalAlquiler);

  objAlquiler = new alquiler(
    clienteInput,
    maquinariaCodigo,
    fechaEntregaInput,
    fechaDevolucionInput,
    maquinariaTarifa,
    diasFechas,
    importeAlquiler,
    descuentoAlquiler,
    garantiaAlquiler,
    importeTotalAlquiler
  );

  let alquilerMaquinarias = [];

  if (diasFechas > 0) {
    alquilerMaquinarias.push(objAlquiler);
    rellenarTablaAlquilerMaquinaria(alquilerMaquinarias);
  } else {
    alert(
      "La fecha de devolución del alquiler debe ser mayor a la fecha de entrega"
    );
  }
}

// Funcion para calcular días entre la fecha de entrega y fecha de devolución
function calcularDiasFecha(fechaEntega, fechaDevolucion) {
  let fechaInicial = new Date(fechaEntega);
  let fechaFinal = new Date(fechaDevolucion);
  if (fechaFinal > fechaInicial) {
    let diferenciaFechas = fechaFinal.getTime() - fechaInicial.getTime();
    return Math.round(diferenciaFechas / (1000 * 60 * 60 * 24));
  } else if (fechaFinal != null && fechaFinal < fechaInicial) {
    return 0;
  } else if (fechaInicial == fechaFinal) {
    return 0;
  }
}

/* Funcion para calcular el importe del alquiler
Se multiplica los días por la tarifa */
function calcularImporte(dias, tarifa) {
  return dias * tarifa;
}

/* Funcion para calcular el descuento del alquiler
Si los días del alquiler son superiores a 7 días, aplicar un descuento del 10% */
function calcularDescuento(dias, importe) {
  if (dias > 7) {
    let descuento = importe * 0.1;
    return descuento;
  } else {
    return 0;
  }
}

/* Funcion para calcular el importe total del alquiler
Importe menos descuento */
function calcularImporteTotal(importe, descuento) {
  return importe - descuento;
}

/* Funcion para calcular la garantia del alquiler
Este valor será de un 10 % del valor total a pagar */
function calcularGarantia(importeTotal) {
  let garantia = importeTotal * 0.1;
  return garantia;
}
