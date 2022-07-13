<template>
  <div style="background-color:#1B012B;padding:40px">

    <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Visualizar Cliente</h2>
      </div>
      <div class="tabla">
          <table class="table table-striped table-dark"  v-if="customers.customer.length > 0">
              <thead>
                <tr>
                  <th scope="col">Cedula</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Correo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in this.customers.customer" :key="item.clicedula">
                  <td>{{item.clicedula}}</td>
                  <td>{{item.clinombre}}</td>
                  <td>{{item.clicelular }}</td>
                  <td>{{item.clicorreo}}</td>
                </tr>
              </tbody>
          </table>
          <div>
                <label class="d-flex justify-content-left">Cedula Cliente:</label>
                <input type="text" class="form-control" placeholder="Cedula Cliente" style="width: 35%;" v-model="customers.input"> 
          </div>
          <div class="d-flex justify-content-initial" style="padding-top: 10px;">
              <button class="btn btn-dark" v-on:click="viewById">
                      Buscar
              </button>
          </div>
          <div class="d-flex justify-content-initial" style="padding-top:5px">
                <button id="btnall" class="btn btn-dark" v-on:click="viewAll">
                    Mostrar todos los clientes
                </button>
            </div>
      </div>
</div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted} from "vue";
export default {
    name : "ViewCustomers",
      setup (){
        onMounted(() => {

        });
        const customers = reactive({
                customer:[],
                input : null
        });
        return{customers}
    },
    methods : {
        viewAll : function(){
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/cliente").then(response => {
                this.customers.customer = response.data;
                //console.log(this.customers.customer)
            })
            // eslint-disable-next-line no-unused-vars
            .catch(e => {
              //console.log(e);
            })
        },
        viewById : function(){
            if((this.customers.input == "") || (this.customers.input == null)){
                this.$toast.show("Ingrese el campo correctamente!", {
                    type: "error",
                });
                return
            }
            //console.log(this.customers.input)
            let url = "https://backendcentronaturista.herokuapp.com/FlorDeJamaica/cliente/" + this.customers.input
            axios.get(url).then(response => {
                this.customers.customer = response.data;
                //console.log(this.customers.customer)
            })
            .catch(e => {
                  //console.log(e.response.data.message);
              if(e.response.data.message == "No se encontro el Cliente"){
                this.$toast.show("La cedula no corresponde a ninguno de nuestros clientes.", {
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