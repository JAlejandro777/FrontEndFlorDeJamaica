<template>
<div style="background-color:#1B012B;padding:40px">

    <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Visualizar Productos</h2>
      </div>
      <div class="tabla">
          <table class="table table-striped table-dark"  v-if="products.product.length > 0">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Caracteristicas</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Precio Sugerido</th>
                  <th scope="col">Unidades Disponibles</th>
                  <th scope="col">Fecha de Ingreso</th>
                  <th scope="col">Fecha de Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products.product" :key="item.procodigo">
                  <td>{{item.procodigo}}</td>
                  <td>{{item.tblproveedor_proid}}</td>
                  <td>{{item.pronombre }}</td>
                  <td>{{item.procaracteristica}}</td>
                  <td>{{item.procategoria }}</td>
                  <td>{{item.propreciosugerido }}</td>
                  <td>{{item.prounidadesdisponibles }}</td>
                  <td>{{item.profechaingreso }}</td>
                  <td>{{item.profechavencimiento}}</td> 
                </tr>
              </tbody>
          </table>
          <div>
                <label class="d-flex justify-content-left">Código Producto:</label>
                <input type="text" class="form-control" placeholder="Código del Producto" style="width: 35%;" v-model="products.input"> 
          </div>
          <div class="d-flex justify-content-initial" style="padding-top: 10px;">
              <button class="btn btn-dark" v-on:click="viewById">
                      Buscar
              </button>
          </div>
          <div class="d-flex justify-content-initial" style="padding-top:5px">
                <button id="btnall" class="btn btn-dark" v-on:click="viewAll">
                    Mostrar todos los productos
                </button>
            </div>
      </div>
</div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted} from "vue";
export default {
    name : "ViewProducts",
    setup (){
        onMounted(() => {

        });
        const products = reactive({
                product:[],
                input : null
        });
        return{products}
    },
    methods : {
        viewAll : function(){
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/productoView").then(response => {
                this.products.product = response.data;
                //console.log(this.products.product)
            })
            // eslint-disable-next-line no-unused-vars
            .catch(e => {
              //console.log(e);
            })
        },
        viewById : function(){
            if((this.products.input == "") || (this.products.input == null)){
                this.$toast.show("Ingrese el campo correctamente!", {
                    type: "error",
                });
                return
            }
            //console.log(this.products.input)
            let url = "https://backendcentronaturista.herokuapp.com/FlorDeJamaica/producto/" + this.products.input
            axios.get(url).then(response => {
                this.products.product = response.data;
                //console.log(this.products.product)
            })
            .catch(e => {
                  //console.log(e.response.data.message);
              if(e.response.data.message == "No se encontro El producto"){
                this.$toast.show("El código del producto que ingreso es incorrecto, vuelva a intentarlo", {
                    type: "error",
                });
                return
              }
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