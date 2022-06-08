 <template>
    <div style="background-color:#1B012B;">
        <div class="d-flex justify-content-center" style="padding-top: 15px;">
            <h2 class="titulo2">Informes</h2>
        </div>
        <div class="d-flex justify-content-center" style="height: 450px">
            <div class="formulario">
                <div class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeVentas">
                            Informe de Ventas
                    </button>
                </div>
                <div class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeClientes">
                            Informe de Clientes
                    </button>
                </div>
                <div class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeUsuarios">
                            Informe de Usuarios
                    </button>
                </div>
                <div class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeProductos">
                            Informe de productos
                    </button>
                </div>
            </div>
        </div>
    </div>
 </template>
 
 <script>
 import axios from 'axios';
 export default {
     // eslint-disable-next-line vue/multi-word-component-names
     name:"Reports",
     methods : {
        informeVentas : function(){
                axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/venta").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteVentas.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();

                    this.$swal.fire({
                        title: 'Reporte Generado!!',
                        icon: 'success',
                    })
                 })
                // eslint-disable-next-line no-unused-vars
                .catch(e => {
                    //console.log(e.response.data.message);
                        this.$toast.show("Hubo un error, vuelva a intentarlo", {
                        type: "error",
                        });
                })
        },
        informeClientes : function(){
             axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/clientes").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteClientes.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();

                    this.$swal.fire({
                        title: 'Reporte Generado!!',
                        icon: 'success',
                    })
                 })
                 // eslint-disable-next-line no-unused-vars
                .catch(e => {
                    //console.log(e.response.data.message);
                        this.$toast.show("Hubo un error, vuelva a intentarlo", {
                        type: "error",
                        });
                })
        },
        informeUsuarios : function(){
                axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuarios").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteUsuarios.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();

                    this.$swal.fire({
                        title: 'Reporte Generado!!',
                        icon: 'success',
                    })
                 })
                // eslint-disable-next-line no-unused-vars
                .catch(e => {
                    //console.log(e.response.data.message);
                        this.$toast.show("Hubo un error, vuelva a intentarlo", {
                        type: "error",
                        });
                })
        },
        informeProductos : function(){
               axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/productos").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteProductos.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.$swal.fire({
                        title: 'Reporte Generado!!',
                        icon: 'success',
                    })
                 })
                // eslint-disable-next-line no-unused-vars
                .catch(e => {
                    //console.log(e.response.data.message);
                        this.$toast.show("Hubo un error, vuelva a intentarlo", {
                        type: "error",
                        });
                })
        }

     }
 }
 </script>
 
 <style>
 
 </style>