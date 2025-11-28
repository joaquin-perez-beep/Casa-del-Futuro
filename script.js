//ejercicio uno calculadora el usuario puede ingresar numeros 
function ejerciciocalculadora() {
  let numero1 = parseFloat(prompt("Ingrese el primer número:"));
  while (isNaN(numero1)) {
    numero1 = parseFloat(prompt("Tenés que ingresar un número, no una letra 😡"));
  }

  let numero2 = parseFloat(prompt("Ingrese el segundo número:"));
  while (isNaN(numero2)) {
    numero2 = parseFloat(prompt("Tenés que ingresar un número, no una letra 😡"));
  }

  let operacion = prompt("Ingrese la operación (+, -, *, /):");
  while (operacion !== "+" && operacion !== "-" && operacion !== "*" && operacion !== "/") {
    operacion = prompt("Tenés que ingresar solamente +, -, *, / 🤬");
  }

  let resultado;

  if (operacion === "+") {
    resultado = numero1 + numero2;
  } else if (operacion === "-") {
    resultado = numero1 - numero2;
  } else if (operacion === "*") {
    resultado = numero1 * numero2;
  } else if (operacion === "/") {
    resultado = numero2 !== 0 ? numero1 / numero2 : "No se puede dividir por cero";
  } else {
    resultado = "Operación no válida";
  }

  console.log(`El resultado es: ${resultado}`);
}
//ejerciciocalculadora();


//ejercicio dos
function ejercicioadivinaelnumero() {
const numeroMin = parseInt(prompt("Ingrese el número mínimo del rango (entero):"), 10);
const numeroMax = parseInt(prompt("Ingrese el número máximo del rango (entero):"), 10);

if (Number.isNaN(numeroMin) || Number.isNaN(numeroMax) || numeroMin >= numeroMax) {
    console.log("Rango inválido. Asegúrate de ingresar dos enteros y que el mínimo sea menor que el máximo.");
} else {
    const numeroSecreto = Math.floor(Math.random() * (numeroMax - numeroMin + 1)) + numeroMin;
    let intentos = 3; 
    let adivinado = false;

    while (intentos > 0 && !adivinado) {
        const entrada = prompt(`Adivina el número entre ${numeroMin} y ${numeroMax}. Intentos restantes: ${intentos}`);
        const numero = entrada === null ? NaN : parseInt(entrada, 10);

        if (Number.isNaN(numero)) {
            console.log("Entrada inválida. Ingresa un número entero.");
        } else if (numero === numeroSecreto) {
            console.log("¡Adivinaste el número!");
            adivinado = true;
        } else if (numero > numeroSecreto) {
            console.log("El número secreto es menor.");
        } else {
            console.log("El número secreto es mayor.");
        }

        intentos--;
    }

    if (!adivinado) {
        console.log(`Lo siento, el número secreto era: ${numeroSecreto}`);
    }
}

}

//ejercicio 3 tabla de multiplicar con array
function tablaDeMultiplicar(){
const numero = parseInt(prompt("ingrese el numero para multiplicar"));
const limite = parseInt(prompt("ingrese hasta qué número multiplicar"));
const resultados = [];

for (let i = 1; i <= limite; i++) {
    resultados.push({
        multiplicador: i,
        resultado: numero * i
    });
}
console.log(`Tabla de multiplicar del ${numero}:`);
for (const item of resultados) {
    console.log(`${numero} x ${item.multiplicador} = ${item.resultado}`);
}
}
//ejercicio 4
function ConverciondeTemperatura(){
function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;

}
const fahrenheitAcelsius=(fahrenheit)=>((fahrenheit-32)*5)/9;
let opcion = prompt("elige una opcion:\n1.°c-->°f\n2.°F-->°C\n3.k-->°c");
if (opcion==="1") {
    let celcius=parseFloat(prompt("ingrese la temperatura en°c "))
    console.log(`${celcius}°C= ${celsiusAFahrenheit(celcius).toFixed(2)}°F`);
} else if (opcion==="2") {
    let fahrenheit=parseFloat(prompt())
    console.log(`${fahrenheit}°F= ${fahrenheitAcelsius(fahrenheit).toFixed(2)}°C`);

}else if (opcion==="3"){
  let kelvin=parseFloat(prompt("ingrese la temperatura en K "))
    console.log(`${kelvin}K= ${ (kelvin - 273.15).toFixed(2)}°C`);
}else{
    console.log("opcion invalida");
}
}
//ejercicio 5 lista de compras
function Productos(){
let listaCompras = [
  { nombre: "leche", precio: 1200, cantidad: 2 },
  { nombre: "huevos", precio: 1000, cantidad: 1 },
  { nombre: "pan", precio: 3000, cantidad: 1 },
  { nombre: "cafe", precio: 3100, cantidad: 1 },
];

function listar() {
  console.clear();
  console.log("Lista de compras:");
  listaCompras.forEach((item, i) => {
    console.log(`${i}. ${item.nombre} (x${item.cantidad}) - $${item.precio}`);
  });
}
function agregar() {
  const nombre = prompt("Nombre del producto:")?.trim();
  if (!nombre) {
    console.log("Nombre inválido.");
    return;
  }
  const precio = parseFloat(prompt("Precio (número):"));
  if (Number.isNaN(precio) || precio < 0) {
    console.log("Precio inválido.");
    return;
  }
  const cantidad = parseInt(prompt("Cantidad (entero):"), 10);
  if (Number.isNaN(cantidad) || cantidad <= 0) {
    console.log("Cantidad inválida.");
    return;
  }

  listaCompras.push({ nombre, precio, cantidad });
  console.log(`${nombre} agregado.`);
}
function eliminar() {
  listar();
  const idx = parseInt(prompt("Ingrese el índice del producto a eliminar:"), 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= listaCompras.length) {
    console.log("Índice inválido.");
    return;
  }
  const eliminado = listaCompras.splice(idx, 1)[0]; 
  console.log(`${eliminado.nombre} eliminado.`);
}
function buscar() {
  const texto = prompt("Nombre a buscar:") ?? "";
  const encontrado = listaCompras.find(item => item.nombre.toLowerCase() === texto.toLowerCase());
  if (encontrado) {
    console.log(`Encontrado: ${encontrado.nombre} - $${encontrado.precio} (x${encontrado.cantidad})`);
  } else {
    console.log("Producto no encontrado.");
  }
}
function menu() {
  let opcion;
  do {
    opcion = prompt(
      "Elige una opción:\n" +
      "1 - Listar productos\n" +
      "2 - Agregar producto\n" +
      "3 - Eliminar producto\n" +
      "4 - Buscar producto\n" +
      "5 - Salir"
    );
    switch (opcion) {
      case "1":
        listar();
        break;
      case "2":
        agregar();
        break;
      case "3":
        eliminar();
        break;
      case "4":
        buscar();
        break;
      case "5":
        console.log("Saliendo...");
        break;
      default:
        console.log("Opción inválida.");
    }
  } while (opcion !== "5");
}
menu();
}
//ejercicio 6 
function Agenda(){
let agenda = JSON.parse(localStorage.getItem('agenda')) || []; 

function guardarEnLocalStorage() {
    localStorage.setItem('agenda', JSON.stringify(agenda));
}

function agregarContactos(nombre, telefono, email) {
    const contacto = { nombre, telefono, email };
    agenda.push(contacto); 
    console.log(`Contacto agregado: ${nombre}`); 
    guardarEnLocalStorage(); 
}
function mostrarAgenda() {
    console.log("Lista de contactos:");
    agenda.forEach(({ nombre, telefono, email }, i) => {
        console.log(`${i + 1}. ${nombre} - ${telefono} - ${email}`); 
    });
}
function buscarContacto(nombre) {
    const contacto = agenda.find(
        (c) => c.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (contacto) {
        console.log(`Encontrado: ${contacto.nombre} - ${contacto.telefono}`);
    } else {
        console.log("Contacto no encontrado");
    }
}
function exportarAgenda() {
    const json = JSON.stringify(agenda, null, 2);
    console.log("Agenda en formato JSON:\n", json);
}
function eliminarContacto(nombre) {
    const longitudAnterior = agenda.length;
    agenda = agenda.filter(
        (c) => c.nombre.toLowerCase() !== nombre.toLowerCase()
    );
    
    if (agenda.length < longitudAnterior) {
        console.log(`Contacto eliminado: ${nombre}`); 
        guardarEnLocalStorage(); 
    } else {
        console.log("Contacto no encontrado");
    }
}
function probarAgenda() {
    agregarContactos("Juan", "2612345678", "juan@email.com");
    agregarContactos("Maria", "2698765432", "maria@email.com");
    mostrarAgenda();
    
    console.log("\nBuscando a Juan:");
    buscarContacto("Juan");
    
    console.log("\nEliminando a Maria:");
    eliminarContacto("Maria");
    
    console.log("\nMostrando agenda actualizada:");
    mostrarAgenda();
}
probarAgenda();
}

// ejercico 7
function actualizarReloj(){
  const ahora=new Date();
  const horas=String(ahora.getHours()).padStart(2,"0");
  const minutos=String(ahora.getMinutes()).padStart(2,"0");
  const segundos=String(ahora.getSeconds()).padStart(2,"0");
  const reloj= document.getElementById("reloj");
  reloj.innerHTML=`${horas}:${minutos}:${segundos}`;
 const hora = parseInt(horas);
    reloj.classList.remove('amanecer', 'manana', 'mediodia', 'tarde', 'atardecer', 'noche');
    if (hora >= 5 && hora < 8) {
        reloj.classList.add('amanecer');
    } else if (hora >= 8 && hora < 12) {
        reloj.classList.add('manana');
    } else if (hora >= 12 && hora < 16) {
        reloj.classList.add('mediodia');
    } else if (hora >= 16 && hora < 19) {
        reloj.classList.add('tarde');
    } else if (hora >= 19 && hora < 21) {
        reloj.classList.add('atardecer');
    } else {
        reloj.classList.add('noche');
    }
}
setInterval(actualizarReloj,1000);
actualizarReloj();
//ejercico8
const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("button");
botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        if (valor === "C") {
            pantalla.value = ""; 
        } else if (valor === "=") {
            try {
                pantalla.value = eval(pantalla.value);
            } catch {
                pantalla.value = "Error";
            }
        } else {
            pantalla.value += valor;
        }
    });
});
//ejrcicio 9
const input = document.getElementById("tarea");
const boton = document.getElementById("agregar");
const lista = document.getElementById("lista");
document.addEventListener("DOMContentLoaded", cargarTareas);
boton.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto === "") return;
  agregarTarea(texto);
  guardarTareas();
  input.value = "";
});
function agregarTarea(texto) {
  const li = document.createElement("li");
  li.textContent = texto;

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "❌";
  btnBorrar.addEventListener("click", () => {
    li.remove();
    guardarTareas();
  });

  li.appendChild(btnBorrar);
  lista.appendChild(li);
}
function guardarTareas() {
  const tareas = [];
  lista.querySelectorAll("li").forEach(li => {
    tareas.push(li.firstChild.textContent);
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
function cargarTareas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasGuardadas.forEach(agregarTarea);
}
//ejercicio 10
const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!nombre || !email || !password) {
    mensaje.textContent = "⚠️ Todos los campos son obligatorios.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    mensaje.textContent = "❌ El correo no es válido.";
    return;
  }

  if (password.length < 6) {
    mensaje.textContent = "🔒 La contraseña debe tener al menos 6 caracteres.";
    return;
  }
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("email", email);
  mensaje.style.color = "green";
  mensaje.textContent = "✅ Registro exitoso.";
  form.reset();
  alert(`¡Bienvenido ${nombre}! te registraste bien echo master.`);
});
