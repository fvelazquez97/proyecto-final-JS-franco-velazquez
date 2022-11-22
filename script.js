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

            <button id="botonBorrar1" class="boton">Vaciar Evento</button>
        </div>

    </section>
    <section id="seccion2" class="paso2Padre"></section>
    `;

  divPadre.appendChild(contenedor);

  let botonBorrar1 = document.getElementById("botonBorrar1");

  botonBorrar1.onclick = () => {
    localStorage.clear();
    window.location.reload();
  };

  let seccion2 = document.getElementById("seccion2");
  let titulo = document.createElement("div");

  titulo.innerHTML = `
    <div class="divPaso2Local" id="divPaso2">
      <h3> Nombre de los integrantes y cuanto dinero debe poner cada uno</h3>
    </div>`;
  seccion2.appendChild(titulo);

  for (const integrante of integrantesEnLS) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
        <p> Nombre: ${integrante.nombre} <p>
        <p> ${integrante.resultado} <p>`;
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
  Swal.fire({
    icon: "info",
    title: "¡Instrucciones de Uso!",
    html: "Paso 1: Crear el evento de los gastos. <br/><br/>  Paso 2: Nombrar a los integrantes y el dinero que pusieron. <br/><br/> Paso 3: ¡Ver cuanto dinero debe poner cada uno!.",
    showCloseButton: true,
    confirmButtonText: "¡Vamos a usarla!",
  });
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
    constructor(id, nombre, dinero, resultado) {
      this.id = Number(id);
      this.nombre = nombre.toUpperCase();
      this.dinero = dinero;
      this.resultado = resultado;
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
      let integrantes = [];
      for (let i = 1; i <= Number(integrantesEvento.value); i++) {
        integrantes.push(new Integrante(i, "", 0, 0));
      }

      let titulo = document.createElement("div");
      seccion2.innerHTML = "";
      titulo.innerHTML = `
          <div class=divPaso22>
          <h3> Paso 2 de 3: Nombrar a los integrantes y el dinero que pusieron</h3>
          </div>
          <div class="divPaso2" id="divPaso2">

          </div>
        `;
      seccion2.append(titulo);

      let divPaso2 = document.getElementById("divPaso2");
      divPaso2.innerHTML = "";

      for (const integrante of integrantes) {
        let contenedor = document.createElement("div");

        contenedor.innerHTML = `
            <h4> Integrante N° ${integrante.id}:</h4>
            <input class= "campo" type= "text" id="invitado${integrante.id}" placeholder= "Nombre">
            <input class= "campo" type= "number" id="gastoInvitado${integrante.id}" placeholder= "¿Cuánto Gastó? $">`;
        divPaso2.append(contenedor);
      }

      let contenedor = document.createElement("div");
      contenedor.innerHTML = `
        <button id="botonContinuar2" class="boton">Continuar</button>
        <button id="botonBorrar" class="boton">Vaciar Evento</button>
        `;
      divPaso2.append(contenedor);

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

          const dineroTotal = integrantes
            .map((integrantes) => integrantes.dinero)
            .reduce((acumulador, elemento) => acumulador + elemento, 0);

          let seccion3 = document.getElementById("seccion3");
          let titulo3 = document.createElement("div");
          titulo3.innerHTML = `
                <div class="divPaso3" id="divPaso3">
                  <h3> Paso 3 de 3: ¡División de gastos!</h3>
                </div>`;
          seccion3.append(titulo3);

          let divPaso3 = document.getElementById("divPaso3");

          for (const integrante of integrantes) {
            let dineroPoner = Number(
              dineroTotal / integrantes.length - integrante.dinero
            );
            let resultado;
            if (dineroPoner < 0) {
              resultado = `Le deben $${Math.abs(dineroPoner)}`;
            } else if (dineroPoner == 0) {
              resultado = `No tiene que poner dinero`;
            } else {
              resultado = `Tiene que poner $${Math.abs(dineroPoner)}`;
            }

            integrante.resultado = resultado;


            let contenedor = document.createElement("div");
            contenedor.innerHTML = `     
                <p> ${integrante.nombre} <p>
                <p> ${resultado} <p>`;
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
          let integrantesJSON = JSON.stringify(integrantes);
          localStorage.setItem("integrantes", integrantesJSON);
        },
        { once: true }
      );
      botonBorrar.onclick = () => {
        localStorage.clear();
        window.location.reload();
      };
    },
  );
}
