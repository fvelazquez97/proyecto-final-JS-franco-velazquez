// ----------------------------PASO 1----------------------------

let divPadre = document.getElementById("divPadre");

let eventoEnLS = JSON.parse(localStorage.getItem("evento"));
let integrantesEnLS = JSON.parse(localStorage.getItem("integrantes"));

// ----------------------------SI HAY DATOS EN EL LOCAL STORAGE HACE ESTO----------------------------

if (eventoEnLS) {
  let contenedor = document.createElement("div");
  contenedor.innerHTML = ` 
    <section class="paso1Local">
        <div class="divPaso1Local">
            <h3>Últimno evento de gastos creado</h3>

            <p> Evento: ${eventoEnLS.evento} </p>

            <p> Descripcion del evento: ${eventoEnLS.descripcionEvento} </p>

            <p> Cantidad de integrantes: ${eventoEnLS.integrantesEvento} </p>
        </div>
    </section>
    <section id="seccion2" class="paso2Padre"></section>
    `;

  divPadre.appendChild(contenedor);

  let seccion2 = document.getElementById("seccion2");
  let titulo = document.createElement("div");

  titulo.innerHTML = `
    <div class="divPaso2Local" id="divPaso2">
      <h3> Nombre de los integrantes y sus gastos</h3>
    </div>`;
  seccion2.appendChild(titulo);

  for (const integrante of integrantesEnLS) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
        <h4> Integrante N° ${integrante.id}:</h4>
        <p> Nombre: ${integrante.nombre} <p>
        <p> Dinero puesto: $${integrante.dinero} <p>`;
    divPaso2.appendChild(contenedor);
  }
  let botonBorrar = document.createElement("div");
  botonBorrar.innerHTML = `
    <button id="botonBorrar" class="boton">Vaciar Evento</button>`;
  divPaso2.appendChild(botonBorrar);
  botonBorrar.onclick = () => {
    localStorage.clear();
    window.location.reload();
  };

  // ----------------------------SI NO HAY DATOS EN EL LOCAL STORAGE HACE ESTO----------------------------
} else {
  let contenedor = document.createElement("div");
  contenedor.innerHTML = `
              <section class="paso1Padre">
                <div class="divPaso1">
                    <h3>Paso 1 de 3: Crear el evento de los gastos</h3>
                    <input id="nombreEvento" class="campo" type="text" placeholder="Ingrese el nombre del evento" />
                    <textarea id="descripcionEvento" class="campo" name="mensaje" cols="30" rows="10"
                        placeholder="Describa el evento"></textarea>
                    <input id="integrantesEvento" class="campo" type="number" placeholder="Cuantas personas son">
                    <button id="botonContinuar" class="boton">Continuar</button>
                </div>
              </section>
              <section id="seccion2" class="paso2Padre"></section>
              <section id="seccion3" class="paso3Padre"></section>`;
  divPadre.appendChild(contenedor);

  let nombreEvento = document.getElementById("nombreEvento");
  let descripcionEvento = document.getElementById("descripcionEvento");
  let integrantesEvento = document.getElementById("integrantesEvento");
  let botonContinuar = document.getElementById("botonContinuar");
  let seccion2 = document.getElementById("seccion2");

  // ----------------------------PASO 2----------------------------

  class Integrante {
    constructor(id, nombre, dinero) {
      this.id = Number(id);
      this.nombre = nombre.toUpperCase();
      this.dinero = dinero;
    }
  }

  let integrantes = [];

  botonContinuar.addEventListener(
    "click",
    function () {
      const evento = {
        evento: nombreEvento.value,
        descripcionEvento: descripcionEvento.value,
        integrantesEvento: Number(integrantesEvento.value),
      };

      let eventoJSON = JSON.stringify(evento);
      localStorage.setItem("evento", eventoJSON);

      for (let i = 1; i <= Number(integrantesEvento.value); i++) {
        integrantes.push(new Integrante(i, "", 0));
      }

      let titulo = document.createElement("div");

      titulo.innerHTML = `
        <div class="divPaso2" id="divPaso2">
          <h3> Paso 2 de 3: Nombrar a los integrantes y sus gastos</h3>
        </div>
        `;
      seccion2.appendChild(titulo);

      let divPaso2 = document.getElementById("divPaso2");

      for (const integrante of integrantes) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
            <h4> Integrante N° ${integrante.id}:</h4>
            <input class= "campo" type= "text" id="invitado${integrante.id}" placeholder= "Nombre">
            <input class= "campo" type= "number" id="gastoInvitado${integrante.id}" placeholder= "¿Cuánto Gastó? $">`;
        divPaso2.appendChild(contenedor);
      }

      let contenedor = document.createElement("div");
      contenedor.innerHTML = `
        <button id="botonContinuar2" class="boton">Continuar</button>
        <button id="botonBorrar" class="boton">Vaciar Evento</button>
        `;
      divPaso2.appendChild(contenedor);

      let botonContinuar2 = document.getElementById("botonContinuar2");
      let botonBorrar = document.getElementById("botonBorrar");

      botonContinuar2.addEventListener(
        "click",
        function () {
          for (let i = 1; i <= Number(integrantesEvento.value); i++) {
            let nombre = document.getElementById(`invitado${i}`);
            let dinero = document.getElementById(`gastoInvitado${i}`);
            for (const obj of integrantes) {
              if (obj.id === i) {
                obj.nombre = nombre.value;
                obj.dinero = Number(dinero.value);
              }
            }
          }

          let seccion3 = document.getElementById("seccion3");
          let titulo3 = document.createElement("div");
          titulo3.innerHTML = `
                <div class="divPaso3" id="divPaso3">
                  <h3> Paso 3 de 3: ¡División de gastos!</h3>
                </div>`;
          seccion3.appendChild(titulo3);
          let integrantesJSON = JSON.stringify(integrantes);
          localStorage.setItem("integrantes", integrantesJSON);

          console.log(integrantes);
          let divPaso3 = document.getElementById("divPaso3");
          for (const integrante of integrantes) {
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `     
                <p> Nombre: ${integrante.nombre} <p>
                <p> Dinero puesto: $${integrante.dinero} <p>`;
            divPaso3.appendChild(contenedor);
          }

          let botonBorrar = document.createElement("div");
          botonBorrar.innerHTML = `
              <button id="botonBorrar" class="boton">Vaciar Evento</button>`;
          divPaso3.appendChild(botonBorrar);
          botonBorrar.onclick = () => {
            localStorage.clear();
            window.location.reload();
          };
        },
        { once: true }
      );
      botonBorrar.onclick = () => {
        localStorage.clear();
        window.location.reload();
      };
    },
    { once: true }
  );
}
