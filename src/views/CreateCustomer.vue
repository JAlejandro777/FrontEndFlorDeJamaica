<template>
<div style="background-color:#1B012B;">
    <div class="d-flex justify-content-center" style="padding-top: 15px;">
         <h2 class="titulo2">Cliente</h2>
     </div>
     <div class="d-flex justify-content-center" style="height: 580px">
         <div class="formulario5">
            <div class="form-group">            
                <label>Cedula:</label>
                <input type="text" class="form-control"  placeholder="Ingrese Cedula" v-model="state.clicedula">     
            </div>
            <label v-if="v$.clicedula.$silentErrors.length > 0" style="color:red;"> {{v$.clicedula.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" class="form-control" placeholder="Ingrese Nombre" v-model="state.clinombre">
            </div>
            <label v-if="v$.clinombre.$silentErrors.length > 0" style="color:red;"> {{v$.clinombre.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Celular:</label>
                <input type="text" class="form-control" placeholder="Ingrese Celular" v-model="state.clicelular">
            </div>
            <label v-if="v$.clicelular.$silentErrors.length > 0" style="color:red;"> {{v$.clicelular.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Correo:</label>
                <input type="email" class="form-control" placeholder="Ingrese Correo" v-model="state.clicorreo">
            </div>
            <label v-if="v$.clicorreo.$silentErrors.length > 0" style="color:red;"> {{v$.clicorreo.$silentErrors[0].$message}}</label>
            <div class="d-flex justify-content-center" style="padding-top: 5px;">
                <button class="btn btn-light" v-on:click="CreateCustomer">
                         Agregar Cliente
                </button>
            </div>
         </div>
     </div>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, maxLength, minLength, email} from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
export default {
    name : "CreateCustomer",
      setup(){
        onMounted(() => {       
        });
        const state = reactive({
            clicedula : null,
            clinombre: null,
            clicelular : null,
            clicorreo : null,
    });
       const rules = {
            clicedula:{ required: helpers.withMessage('Cedula requerida.', required),
                        maxLength: helpers.withMessage('Maximo 10 caracteres.', maxLength(10))
              },
            clinombre :{ required : helpers.withMessage('Nombre requerido.', required)},
            clicelular :{ required : helpers.withMessage('Celular requerido.', required),
                    maxLength: helpers.withMessage('Se requieren 10 caracteres.', maxLength(10)),
                    minLength: helpers.withMessage('Se requieren 10 caracteres.', minLength(10))
              },
            clicorreo :{ required : helpers.withMessage('Correo requerido.', required) ,
              email :  helpers.withMessage('Correo Invalido.', email)
               },
        } 
    return { v$:  useVuelidate(rules, state), state }    
    },
    methods :{
        CreateCustomer : function(){
            if(this.v$.$invalid){
                this.$toast.show("Ingrese los campos correctamente!", {
                type: "error",
                // all of other options may go here
                });
                return
            }
          // eslint-disable-next-line no-unused-vars
          axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/cliente", this.state).then(response => {
            //console.log(response)
            this.state.clicedula = null
            this.state.clinombre = null
            this.state.clicelular = null,
            this.state.clicorreo = null
            this.$toast.show("Cliente Creado Correctamente!!", {
              type: "success",
            });
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