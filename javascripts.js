document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los valores de los campos de texto
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    // Validar si los campos están vacíos
    if (username === "" || password === "") {
        // Mostrar mensaje de error
        document.getElementById('error').style.display = 'block';
    } else {
        // Ocultar mensaje de error
        document.getElementById('error').style.display = 'none';
        // Aquí puedes agregar el código para redirigir a otra página o procesar el inicio de sesión
        alert("Formulario enviado correctamente");}
    })

// parte de la api

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const contenedor = document.getElementById("contenedor");

let pagina = 1;

btnAnterior.addEventListener("click", ()=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

btnSiguiente.addEventListener("click", ()=>{
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async()=>{

   try{

    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`)
    console.log(respuesta);

    if(respuesta.status === 200){

        const datos = await respuesta.json();
        console.log(datos);

        let peliculas = [];

        datos.results.forEach(pelicula => {
            peliculas += `
            <div class="card pelicula" style="width: 20rem;">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title titulos">${pelicula.title} </h5>
                    <p class="card-text descripcion">${pelicula.overview} </p>
                </div>
            </div>
            `;            
        });

        contenedor.innerHTML = peliculas;

    }

   }

   catch(error){
    console.log(error.message);

   }

}

cargarPeliculas();