<template>
  <div style="background-color:#1B012B;">
      <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Crear Usuario</h2>
      </div>
      <div class="d-flex justify-content-center" style="height: 800px">
          <div class="formulario2">
              <div class="form-group">
                  <label>Cargo:</label>
                 <select v-on:click="rolesSelect" class="form-control" v-model="state.tblrol_rolid" id="select1">
                      <option v-for="item in roles.rol" :key="item.rolid"> {{item.rolnombre}}</option>
                  </select>
              </div>
              <div class="form-group">            
                  <label>Nombre:</label>
                  <input type="text" class="form-control"  placeholder="Ingrese Nombre" v-model="state.usunombre">
              </div>
              <label v-if="v$.usunombre.$silentErrors.length > 0" style="color:red;"> {{v$.usunombre.$silentErrors[0].$message}}</label>     
              <div class="form-group">
                  <label>Cedula:</label>
                  <input type="text" class="form-control" placeholder="Ingrese Cedula" v-model="state.usucedula">
              </div>
              <label v-if="v$.usucedula.$silentErrors.length > 0" style="color:red;"> {{v$.usucedula.$silentErrors[0].$message}}</label>     
              <div class="form-group">
                  <label>Correo:</label>
                  <input type="email" class="form-control" placeholder="Ingrese Correo" v-model="state.usucorreo">
              </div>
              <label v-if="v$.usucorreo.$silentErrors.length > 0" style="color:red;"> {{v$.usucorreo.$silentErrors[0].$message}}</label>     
              <div class="form-group">
                  <label>Celular:</label>
                  <input type="text" class="form-control" placeholder="Ingrese Celular" v-model="state.usucelular">
              </div>
              <label v-if="v$.usucelular.$silentErrors.length > 0" style="color:red;"> {{v$.usucelular.$silentErrors[0].$message}}</label>     
              <div class="form-group">
                  <label>Constraseña:</label>
                  <input type="password" class="form-control" placeholder="Ingrese Contraseña" v-model="state.usucontrasena">
              </div>

              <label v-if="v$.usucontrasena.$silentErrors.length > 0" style="color:red;"> {{v$.usucontrasena.$silentErrors[0].$message}}</label>     
              <Popper v-if="v$.usucontrasena.$silentErrors.length > 0" :show="showPopper"  placement='top'>
                  <i  @mouseover="showPopper = true" @mouseleave="showPopper = false" class="fas fa-info-circle" style="padding-left:10px" ></i>
                  <template #content>
                    <p>La constraseña debe tener letras mayusculas,</p>
                       <p>minusculas,
                       numeros y caracteres especiales.</p>
                  </template>
              </Popper>

              <div class="d-flex justify-content-center" style="padding-top: 5px;">
                  <button class="btn btn-light" v-on:click="createUser">
                      Registrarse
                  </button>
              </div>
             

          </div>
      </div> 
    </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength,minLength,helpers  } from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
import Popper from "vue3-popper";

export default {
  name: 'SignUp',
  setup () {
      onMounted(() => {
       
      });
      const roles = reactive({
         rol:[]
      });

      const state = reactive({
        tblrol_rolid : null,
        usucedula: "",
        usunombre: "",
        usucelular : "",
        usucorreo: "",
        usucontrasena: ""

    });
       const rules = {

      usucedula: { required: helpers.withMessage('Cedula requerida.', required),
                maxLength: helpers.withMessage('Maximo 10 caracteres.', maxLength(10))
              },
      usunombre: { required: helpers.withMessage('Nombre requerido.', required)}, // Matches this.firstName
      usucelular: { required : helpers.withMessage('Celular requerido.', required),
                    maxLength: helpers.withMessage('Se requieren 10 caracteres.', maxLength(10)),
                    minLength: helpers.withMessage('Se requieren 10 caracteres.', minLength(10))
              },
      usucorreo: { required : helpers.withMessage('Correo requerido.', required) ,
              email :  helpers.withMessage('Correo Invalido.', email)
               },
      usucontrasena :{ required : helpers.withMessage('Contraseña requerida.', required),
                  containsPasswordRequirement: helpers.withMessage(
                    () => 'Constraseña invalida.', 
                    (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)
                  ), 
      }
  } 
    return { v$:  useVuelidate(rules, state), state , roles
    }
  },
  data() {
    return {
      showPopper: false,
    };
  },
  methods: {
       rolesSelect: function () {
          axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/rol").then(response => {
            this.roles.rol = response.data;
            //console.log(this.roles.rol);
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
              //console.log(e);
          })
       },
       createUser: function(){
         if((this.v$.$invalid) || (this.state.tblrol_rolid == null)){
            this.$toast.show("Ingrese los campos correctamente!", {
              type: "error",       // all of other options may go here
            });
            return
         }
          // eslint-disable-next-line no-unused-vars
          Object.entries(this.roles.rol).forEach(([key, value]) => {
              let rol = Object.values(value)[1] 
              if(rol == this.state.tblrol_rolid){
                this.state.tblrol_rolid = Object.values(value)[0]
              }
              
          });

          // eslint-disable-next-line no-unused-vars
          axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuario", this.state).then((result) => {
            //console.log(result);
            this.state.tblrol_rolid = null
            this.state.usucedula = null
            this.state.usucelular = null
            this.state.usucontrasena = null
            this.state.usucorreo = null
            this.state.usunombre = null
            this.$toast.show("Usuario Creado Correctamente!!", {
              type: "success",
            });
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => {
          //console.log(e);
           this.$toast.show("Hubo un error, vuelva a intentarlo", {
              type: "error",
              // all of other options may go here
            });
        })
    
       },
       

    
  },
  components: {
      Popper,
    },
}
</script>

<style scoped>
  :deep(.popper) {
    background: #000000;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }

  :deep(.popper #arrow::before) {
    background: #000000;
  }

  :deep(.popper:hover),
  :deep(.popper:hover > #arrow::before) {
    background: #000000;
  }
</style>