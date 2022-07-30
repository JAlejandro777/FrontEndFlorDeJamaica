 <template>
    <div style="background-color:#1B012B;">
        <div class="d-flex justify-content-center" style="padding-top: 15px;">
            <h2 class="titulo2">Informes</h2>
        </div>
        <div class="d-flex justify-content-center" style="height: 450px">
            <div style=" padding: 30px;
                width: 400px;
                height: 400px;
                border: 5px solid rgb(255, 255, 255);
                border-radius: 20px;
                background-color: rgb(52, 58, 60);
                color: #efefef;">
                <div v-if="reporte!='ventas'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeVentas">
                            Informe de Ventas
                    </button>
                </div>
                <div v-if="reporte=='ventas'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light">
                        <span class="spinner-border spinner-border-sm"></span>
                        Informe de Ventas
                    </button>
                </div>
                <div v-if="reporte!='clientes'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeClientes">
                            Informe de Clientes
                    </button>
                </div>
                <div v-if="reporte=='clientes'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light">
                        <span class="spinner-border spinner-border-sm"></span>
                        Informe de Clientes
                    </button>
                </div>
                <div v-if="reporte!='usuarios'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeUsuarios">
                        Informe de Usuarios
                    </button>
                </div>
                <div v-if="reporte=='usuarios'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light">
                        <span class="spinner-border spinner-border-sm"></span>
                        Informe de Usuarios
                    </button>
                </div>
                <div v-if="reporte!='productos'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light" v-on:click="informeProductos">
                            Informe de productos
                    </button>
                </div>
                <div v-if="reporte=='productos'" class="d-flex justify-content-center" style="padding-top: 20px;">
                    <button class="btn btn-light">
                        <span class="spinner-border spinner-border-sm"></span>
                        Informe de productos
                    </button>
                </div>
            </div>
        </div>
    </div>
 </template>
 <script>
 import axios from 'axios';
 import {  onMounted} from "vue";
 export default {
     // eslint-disable-next-line vue/multi-word-component-names
     name:"Reports",
       setup(){
        onMounted(() => {       
            // eslint-disable-next-line no-unused-vars
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/ventasAll" ).then((result) => {})
            // eslint-disable-next-line no-unused-vars
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/cliente" ).then((result) => {})
            // eslint-disable-next-line no-unused-vars
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/productoView" ).then((result) => {})
            // eslint-disable-next-line no-unused-vars
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuario" ).then((result) => {})


        });
  
    },
    data: function () {
        return {
        reporte: null
        }
    },
     methods : {
        informeVentas : function(){
            this.reporte = "ventas";
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/venta").then(response => {
                    //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteVentas.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.reporte = null;
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
            this.reporte = "clientes";
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/clientes").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteClientes.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.reporte = null;
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
            this.reporte = "usuarios";
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuarios").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteUsuarios.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.reporte = null;
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
            this.reporte = "productos";
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/productos").then(response => {
                //console.log(response.data)
                    const linkSource = `data:application/pdf;base64,${response.data}`;
                    const downloadLink = document.createElement("a");
                    const fileName = "ReporteProductos.pdf";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    this.reporte = null;
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