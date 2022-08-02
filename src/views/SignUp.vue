<template>
  <div style="background-color:#1B012B;">
      <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Crear Usuario</h2>
      </div>
      <div class="d-flex justify-content-center" style="height: 840px">
          <div class="formulario2">
              <div class="form-group">
                  <label>Cargo:</label>
                 <select class="form-control" v-model="state.tblrol_rolid" id="select1">
                      <option v-for="item in roles.rol" :key="item.rolid"> {{item.rolnombre}}</option>
                  </select>
              </div>
              <label v-if="state.tblrol_rolid == null || state.tblrol_rolid == ''" style="color:red;"> Cargo Requerido.</label>     
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
                  <input v-if="!flag.flag" type="password" class="form-control" placeholder="Ingrese Contraseña" v-model="state.usucontrasena">
                  <input v-if="flag.flag" type="text" class="form-control" placeholder="Ingrese Contraseña" v-model="state.usucontrasena">              
              </div>
              <i v-if="(!flag.flag) && (state.usucontrasena != null) && (state.usucontrasena != '')" class="fas fa-eye" v-on:click="flag.flag = true"></i>
              <i v-if="(flag.flag) && (state.usucontrasena != null) && (state.usucontrasena != '')" class="fas fa-eye-slash" v-on:click="flag.flag = false"></i>
              <div v-if="(state.usucontrasena != null) && (state.usucontrasena != '')"></div>
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
                  <button class="btn btn-light" v-on:click="sendCode">
                      Registrarse
                  </button>
              </div>
             

          </div>
      </div> 
    </div>
<MDBModal
    id="modal2"
    tabindex="-1"
    labelledby="modalLabel2"
    v-model="flag.flagModal"
    >
    <MDBModalHeader>
      <h2>Código de activación</h2>
    </MDBModalHeader>
    <MDBModalBody>
        <p align="start">Ingresa código de activación que se acaba de enviar al correo <strong>{{state.usucorreo}}</strong>.</p>            
        <input type="text" class="form-control" placeholder="Ingrese Código" v-model="codigo.code" required minlength="1" maxlength="4">
        <label v-if="codigo.code == null || codigo.code == ''" style="color:red;padding-top:10px"> Código Requerido.</label>     
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="flag.flagModal = false">Cancelar</MDBBtn>
      <button  class="btn btn-secondary" @click="verifyCode">Enviar</button>
    </MDBModalFooter>
</MDBModal>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength,minLength,helpers  } from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
import Popper from "vue3-popper";
import {
    MDBModal,
    MDBModalHeader,
    //MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  } from 'mdb-vue-ui-kit';
export default {
  name: 'SignUp',
  emits: ["getData"],
    components: {
      MDBModal,
      MDBModalHeader,
      //MDBModalTitle,
      MDBModalBody,
      MDBModalFooter,
      MDBBtn,
      Popper
    },
  setup () {
      onMounted(() => {
        axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/rol").then(response => {
            roles.rol = response.data;
            //console.log(this.roles.rol);
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
              //console.log(e);
          })
            // eslint-disable-next-line no-unused-vars
          axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuario" ).then((result) => {})
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
     const flag = reactive({
        flag:false,
        flagModal:false,
        resultCorreo: false,
        resultCedula: false,
        flagCode: false
     })
     const codigo = reactive({
            code : null
        })
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
    return { v$:  useVuelidate(rules, state), state , roles, flag, codigo
    }
  },
  data() {
    return {
      showPopper: false,
    };
  },
  methods: {
      verifyCode: async function(){
        this.flag.flagCode = false
          let c = parseInt(this.codigo.code)
          //console.log(c)
          if(isNaN(c)){
              this.$toast.show("Ingrese un número.", {
                  type: "error",
              }); 
              return;
          }
          if(this.codigo.code.length < 4){
              this.$toast.show("Ingrese un número de 4 cifras.", {
                  type: "error",
              }); 
              return; 
          }
      
          await axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/verifyCodeActivate", this.codigo).then(response => {
              //console.log(response.data)
              this.flag.flagCode = true
              this.$swal.fire({
                      title: 'Usuario creado con exito!!',
                      text: response.data,
                      icon: 'success',
              })
              this.flag.flagModal = false
              this.codigo.code = null
              
          // eslint-disable-next-line no-unused-vars
          }).catch(e => {
              //console.log(e.response.data.message);
              if(e.response.data.message == "Código Incorrecto"){
                  this.$toast.show(e.response.data.message, {
                      type: "error",
                  }); 
              }
          })
          if(this.flag.flagCode){
              // eslint-disable-next-line no-unused-vars
              Object.entries(this.roles.rol).forEach(([key, value]) => {
                  let rol = Object.values(value)[1] 
                  if(rol == this.state.tblrol_rolid){
                    this.state.tblrol_rolid = Object.values(value)[0]
                  }
                  
              });

                // eslint-disable-next-line no-unused-vars
              await axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuario", this.state).then((result) => {
                //console.log(result);
                this.state.tblrol_rolid = null
                this.state.usucedula = null
                this.state.usucelular = null
                this.state.usucontrasena = null
                this.state.usucorreo = null
                this.state.usunombre = null
                this.$router.push({ name: "Login" }); 
                /*this.$toast.show("Usuario Creado Correctamente!!", {
                  type: "success",
                });
                */
            })
            // eslint-disable-next-line no-unused-vars
            .catch(e => {
              //console.log(e);
                this.$toast.show("Hubo un error, vuelva a intentarlo", {
                  type: "error",
                  // all of other options may go here
                });
            })
          }
      },
      sendCode: async function(){
        this.flag.resultCorreo = false
        this.flag.resultCedula = false
        this.codigo.code = null
        if((this.v$.$invalid) || (this.state.tblrol_rolid == null)){
          this.$toast.show("Ingrese los campos correctamente!", {
            type: "error",       // all of other options may go here
          });
          return
        }
        //console.log(this.state.usucorreo)
        await axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/existenciaCorreo", this.state).then((result) => {
          //console.log(result.data);
          if(result.data == "Correo Existente"){
            this.flag.resultCorreo = true
            this.$toast.show("El Correo pertenece a otra cuenta!", {
              type: "error",       // all of other options may go here
            });
            return
          }
        });
        //console.log(this.flag.resultCorreo)
        if(this.flag.resultCorreo){
          return
        }
        await axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/existenciaCedula", this.state).then((result) => {
          //console.log(result.data);
          if(result.data == "Cedula Existente"){
            this.flag.resultCedula = true
            this.$toast.show("La Cedula pertenece a otro usuario!", {
              type: "error",       // all of other options may go here
            });
            return
          }
        });
        if(this.flag.resultCedula){
          return
        }
        await axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/activarCuenta", this.state).then((result) => {
          //console.log(result.data);
          this.flag.resultCedula = true
          this.$toast.show(result.data, {
            type: "success",       // all of other options may go here
          });
          this.flag.flagModal = true
        });
       
       },
       

    
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