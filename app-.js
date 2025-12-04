// cronometro
let segundos = 0;
let intervalo;

function actualizarCronometro() {
  const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
  const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
  const secs = String(segundos % 60).padStart(2, "0");

  document.getElementById("cronometro").textContent = `${hrs}:${mins}:${secs}`;
}

document.getElementById("iniciar").addEventListener("click", () => {
  if (!intervalo) {
    intervalo = setInterval(() => {
      segundos++;
      actualizarCronometro();

      
      if (segundos % 60 === 0) {
        const sonido = document.getElementById("sonido");
        sonido.play();

        const crono = document.getElementById("cronometro");
        crono.classList.add("animacion-alerta");
        setTimeout(() => crono.classList.remove("animacion-alerta"), 500);
      }

    }, 1000);
  }
});

document.getElementById("pausar").addEventListener("click", () => {
  clearInterval(intervalo);
  intervalo = null;
});

document.getElementById("reiniciar").addEventListener("click", () => {
  segundos = 0;
  actualizarCronometro();
  clearInterval(intervalo);
  intervalo = null;
});


// API del clima

const apiKey = "c5dba7b153308e7055a2f8f548742c05";

document.getElementById("buscarClima").addEventListener("click", async () => {
  const ciudad = document.getElementById("ciudad").value.trim();
  const resBox = document.getElementById("resultadoClima");

  if (!ciudad) return alert("Ingrese una ciudad");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      resBox.innerHTML = "❌ Ciudad no encontrada";
      return;
    }

    resBox.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temp: ${data.main.temp}°C</p>
      <p>💨 Viento: ${data.wind.speed} km/h</p>
      <p>🌦 Clima: ${data.weather[0].description}</p>
    `;

  } catch (error) {
    resBox.innerHTML = "⚠️ Error al conectar con la API";
  }
});


// API usuario github

document.getElementById("buscarGit").addEventListener("click", () => {
  const user = document.getElementById("usuario").value.trim();
  const resultado = document.getElementById("resultadoGit");

  if (!user) return alert("Ingresa un usuario de GitHub");

  resultado.innerHTML = "🔎 Buscando...";

  fetch(`https://api.github.com/users/${user}`)
    .then(res => {
      if (!res.ok) throw new Error("Usuario no encontrado");
      return res.json();
    })
    .then(data => {

      resultado.innerHTML = `
        <img src="${data.avatar_url}" width="120">
        <h2>${data.login}</h2>
        <p>👥 Seguidores: ${data.followers}</p>
        <p>📦 Repos públicos: ${data.public_repos}</p>
        <p>🌍 Ubicación: ${data.location ?? "No disponible"}</p>
        <p>👤 Nombre completo: ${data.name ?? "No disponible"}</p>
        <h3>🗂 Últimos Repositorios:</h3>
        <ul id="repos"></ul>
      `;

      return fetch(`https://api.github.com/users/${user}/repos?sort=created&per_page=5`);
    })
    .then(res => res.json())
    .then(repos => {
      const lista = document.getElementById("repos");

      if (repos.length === 0) {
        lista.innerHTML = "<li>No tiene repos públicos.</li>";
        return;
      }

      repos.forEach(repo => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        lista.appendChild(li);
      });
    })
    .catch(err => {
      resultado.innerHTML = `❌ ${err.message}`;
    });
});
//API pokemon 
document.getElementById("BuscarPokemon").addEventListener("click", async () => {
  const pokemon = document.getElementById("pokemonInput").value.toLowerCase().trim();
  const box = document.getElementById("resultadoPokemon");

  if (!pokemon) return (box.innerHTML = "⚠️ Escribe un Pokémon.");

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");

    const data = await res.json();

    box.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}">
      <p>Altura: ${data.height}</p>
      <p>Peso: ${data.weight}</p>
      <p>Tipo: ${data.types.map(t => t.type.name).join(", ")}</p>
    `;
  } catch {
    box.innerHTML = "⚠️ Pokémon no encontrado.";
  }
});


// api perro
document.getElementById("BuscarRaza").addEventListener("click", async () => {
  const razaInput = document.getElementById("razaInput").value.trim().toLowerCase();
  const box = document.getElementById("resultadoPerro");

  if (!razaInput) return (box.innerHTML = "⚠️ Escribe una raza");

  const partes = razaInput.split(" ");
  let url = "";

  if (partes.length === 1) url = `https://dog.ceo/api/breed/${partes[0]}/images/random`;
  else url = `https://dog.ceo/api/breed/${partes[1]}/${partes[0]}/images/random`; // subraza + raza

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "success") {
      box.innerHTML = `
        <h2>🐶 ${razaInput}</h2>
        <img src="${data.message}" width="300">
      `;
    } else {
      box.innerHTML = "⚠️ Raza no encontrada.";
    }
  } catch {
    box.innerHTML = "⚠️ Error al conectar con la API";
  }
});
//notas 
const listaNotas = document.getElementById("listaNotas");
let notas = JSON.parse(localStorage.getItem("notas")) || [];


function mostrarNotas() {
  listaNotas.innerHTML = "";
  notas.forEach((nota, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${nota.texto}</strong><br>
      <small>${nota.fecha}</small><br>
      <button onclick="borrarNota(${i})">🗑️ Borrar</button>
    `;
    listaNotas.appendChild(li);
  });
}

document.getElementById("guardar").addEventListener("click", () => {
  const texto = document.getElementById("nota").value.trim();
  if (texto) {
    const nuevaNota = {
      texto,
      fecha: new Date().toLocaleString()
    };
    notas.push(nuevaNota);
    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();
    document.getElementById("nota").value = "";
  }
});


document.getElementById("borrarTodo").addEventListener("click", () => {
  if (confirm("¿Seguro que querés borrar todas las notas?")) {
    localStorage.removeItem("notas");
    notas = [];
    mostrarNotas();
  }
});


function borrarNota(index) {
  notas.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  mostrarNotas();
}
mostrarNotas();
//clase 5 pruducto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    mostrarInfo() {
        console.log(`${this.nombre}: $${this.precio}`);
    }
}
const prod1 = new Producto("Mouse", 5000);
const prod2 = new Producto("Teclado", 10000);
const prod3 = new Producto("Monitor", 85000);
const prod4 = new Producto("Auriculares", 15000);
prod1.mostrarInfo();
prod2.mostrarInfo();
prod3.mostrarInfo();
prod4.mostrarInfo();
//libreria 
class Autor {
    constructor(nombre) {
        this.nombre = nombre;
        this.cantidadDeLibros = 0;
    }
}
class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        autor.cantidadDeLibros++;
    }
    mostrar() {
        console.log(`${this.titulo} - ${this.autor.nombre}`);
    }
}
class Biblioteca {
    constructor() {
        this.libros = [];
    }
    agregarLibro(libro) {
        this.libros.push(libro);
    }
    listarLibros() {
        console.log("📚 Lista de libros:");
        this.libros.forEach(l => l.mostrar());
    }
    buscarPorAutor(nombreAutor) {
        return this.libros.filter(l => l.autor.nombre === nombreAutor);
    }
}
const autor1 = new Autor("Borges");
const autor2 = new Autor("Cortázar");
const libro1 = new Libro("Ficciones", autor1);
const libro2 = new Libro("El Aleph", autor1);
const libro3 = new Libro("Rayuela", autor2);
const biblioteca = new Biblioteca();
biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);
biblioteca.agregarLibro(libro3);
biblioteca.listarLibros();
const resultado = biblioteca.buscarPorAutor("Borges");
console.log("🔍 Libros de Borges:");
resultado.forEach(l => l.mostrar());
//libreria dos 
//App de tarjetas con React
function Tarjeta(props) {
  return React.createElement(
    "div",
    { className: "tarjeta" },
    React.createElement("img", { src: props.imagen }),
    React.createElement("h2", null, props.titulo),
    React.createElement("p", null, props.texto)
  );
}

const tarjetas = React.createElement(
  React.Fragment,
  null,
  React.createElement(Tarjeta, {
    titulo: "Montaña",
    imagen: "https://picsum.photos/300/200?random=1",
    texto: "Naturaleza y aire puro."
  }),
  React.createElement(Tarjeta, {
    titulo: "Ciudad",
    imagen: "https://picsum.photos/300/200?random=2",
    texto: "Luces y edificios altos."
  }),
  React.createElement(Tarjeta, {
    titulo: "Playa",
    imagen: "https://picsum.photos/300/200?random=3",
    texto: "Relajación asegurada."
  })
);

ReactDOM.createRoot(document.getElementById("root")).render(tarjetas);
//Script para leer y escribir JSON

const fs = require("fs");


const data = fs.readFileSync("data.json", "utf-8");


const obj = JSON.parse(data);


obj.edad += 1;
obj.ciudad = "Buenos Aires";
obj.nuevoDato = "Clase 20";


fs.writeFileSync("nuevo.json", JSON.stringify(obj, null, 2));

console.log("Archivo nuevo.json creado!");