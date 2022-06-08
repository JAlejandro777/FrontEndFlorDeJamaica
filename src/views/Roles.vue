<template>
<div style="background-color:#1B012B;">
    <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Crear Roles</h2>
      </div>
      <div class="d-flex justify-content-center" style="height: 460px">
          <div class="formulario">
              <div class="form-group">            
                  <label>Nombre:</label>
                  <input type="text" class="form-control"  placeholder="Ingrese Rol" v-model="state.rolnombre">     
              </div>
              <label v-if="v$.rolnombre.$silentErrors.length > 0" style="color:red;"> {{v$.rolnombre.$silentErrors[0].$message}}</label>     
              <div class="form-group">
                  <label>Permisos:</label>
                  <input type="text" class="form-control" placeholder="Ingrese Permisos" v-model="state.rolpermisos">
              </div>
              <label v-if="v$.rolpermisos.$silentErrors.length > 0" style="color:red;"> {{v$.rolpermisos.$silentErrors[0].$message}}</label>     
              <div class="d-flex justify-content-center" style="padding-top: 5px;">
                  <button v-on:click="CreateRol" class="btn btn-light">
                          Crear Rol
                  </button>
              </div>
          </div>
      </div>
</div>
</template>

<script>
import { reactive, onMounted } from "vue";
import useVuelidate from '@vuelidate/core'
import { required, helpers  } from '@vuelidate/validators'
import axios from 'axios';
export default {
 // eslint-disable-next-line vue/multi-word-component-names
 name: 'Roles',
 setup () {
      onMounted(() => {
          
      });

      const state = reactive({
        rolnombre : null,
        rolpermisos: null

    });
       const rules = {

      rolnombre: { required: helpers.withMessage('Nombre Rol requerido.', required)},
      rolpermisos :{ required : helpers.withMessage('Permisos Rol requerida.', required)}
  } 
    return { v$:  useVuelidate(rules, state), state
    }
  },
      methods :{
        CreateRol : function(){
            if(this.v$.$invalid){
                this.$toast.show("Ingrese los campos correctamente!", {
                type: "error",
                // all of other options may go here
                });
                return
            }
          // eslint-disable-next-line no-unused-vars
          axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/rol", this.state).then(response => {
            //console.log(response)
            this.state.rolnombre = null
            this.state.rolpermisos = null
            this.$toast.show("Rol Creado Correctamente!!", {
              type: "success",
            });
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
              //console.log(e);
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