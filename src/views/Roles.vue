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
                  <button v-on:click="testFields" class="btn btn-light">
                          Crear Rol
                  </button>
              </div>
  <!-- Button trigger modal -->
          </div>
    </div>
  <MDBModal
    id="modal"
    tabindex="-1"
    labelledby="modalLabel"
    v-model="modal.flag"
  >
    <MDBModalHeader>
      <h2>Contraseña super usuario</h2>
    </MDBModalHeader>
    <MDBModalBody>                  
      <input v-if="(!modal.flagcon)" type="password" class="form-control" placeholder="Ingrese Contraseña" v-model="contraseña.contraseña">
      <input v-if="(modal.flagcon)" type="text" class="form-control" placeholder="Ingrese Contraseña" v-model="contraseña.contraseña">
      <label v-if="contraseña.contraseña == null || contraseña.contraseña == ''" style="color:red;padding-top:10px"> Contraseña Requerida.</label>     
      <i v-if="(!modal.flagcon) && (contraseña.contraseña != null) && (contraseña.contraseña != '')" class="fas fa-eye" v-on:click="modal.flagcon = true"></i>
      <i v-if="(modal.flagcon) && (contraseña.contraseña != null) && (contraseña.contraseña != '')" class="fas fa-eye-slash" v-on:click="modal.flagcon = false"></i>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="exampleModal.flag = false">Close</MDBBtn>
      <button  class="btn btn-secondary" @click="verifyPass">Enviar</button>
    </MDBModalFooter>
  </MDBModal>
</div>

</template>

<script>
import { reactive, onMounted } from "vue";
import useVuelidate from '@vuelidate/core'
import { required, helpers  } from '@vuelidate/validators'
import axios from 'axios';
import {
    MDBModal,
    MDBModalHeader,
    //MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  } from 'mdb-vue-ui-kit';
export default {
 // eslint-disable-next-line vue/multi-word-component-names
 name: 'Roles',
  components: {
      MDBModal,
      MDBModalHeader,
      //MDBModalTitle,
      MDBModalBody,
      MDBModalFooter,
      MDBBtn,
    },
 setup () {
      onMounted(() => {
          //console.log(exampleModal.flag)
      });
      const modal = reactive({
        flag:false,
        flagcon: false

      });  
      const state = reactive({
        rolnombre : null,
        rolpermisos: null
      });
      const contraseña = reactive({
        contraseña:null
      });  
       const rules = {

      rolnombre: { required: helpers.withMessage('Nombre Rol requerido.', required)},
      rolpermisos :{ required : helpers.withMessage('Permisos Rol requerida.', required)}
  } 
    return { v$:  useVuelidate(rules, state), state, modal,contraseña}
  },
    methods :{
        verifyPass:function(){
            if(this.contraseña.contraseña == null || this.contraseña.contraseña == ''){
              this.$toast.show("Ingrese el campo correctamente!", {
                type: "error",
                // all of other options may go here
                });
                return
            }
            // eslint-disable-next-line no-unused-vars
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/superUsuarios", this.contraseña).then(response => {
              if(response.data == "OK"){
                this.$toast.show("Constraseña Correcta!", {
                  type: "success",
                });
                this.CreateRol()
                this.modal.flag = false
                this.contraseña.contraseña = null
              }
              else{
                this.$toast.show("Constraseña Incorrecta!", {
                  type: "error",
                });
              }
            // eslint-disable-next-line no-unused-vars
            }).catch(e => {
                //console.log(e);
                this.$toast.show("Hubo un error, vuelva a intentarlo", {
                type: "error",
                });
          })

        },
       testFields : function(){
           if(this.v$.$invalid){
                this.$toast.show("Ingrese los campos correctamente!", {
                type: "error",
                // all of other options may go here
                });
                return
            }
            this.modal.flag = true

        },
        CreateRol : function(){
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