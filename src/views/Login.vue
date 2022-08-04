<template>
<div style="background-color:#1B012B;">
    <div class="d-flex justify-content-center" style="padding-top: 15px;">
            <h2 class="titulo2">Iniciar Sesión</h2>
        </div>
        <div class="d-flex justify-content-center" style="height: 460px">
            <div class="formulario">
                <div class="form-group">            
                    <label>Correo:</label>
                    <input v-model="state.correo" type="text" class="form-control"  placeholder="Ingrese Correo">     
                </div>
                <label v-if="v$.correo.$silentErrors.length > 0" style="color:red;">{{v$.correo.$silentErrors[0].$message}}</label>     
                <div class="form-group">
                    <label>Contraseña:</label>
                        <input v-if="!state.flag" v-model="state.contrasena" type="password" class="form-control" placeholder="Ingrese Contraseña">
                        <input v-if="state.flag" v-model="state.contrasena" type="text" class="form-control" placeholder="Ingrese Contraseña">
                        <i v-if="!state.flag && v$.contrasena.$silentErrors.length == 0" class="fas fa-eye" v-on:click="state.flag = true"></i>
                        <i v-if="state.flag && v$.contrasena.$silentErrors.length == 0" class="fas fa-eye-slash" v-on:click="state.flag = false"></i>
                    
                </div>
                <label v-if="v$.contrasena.$silentErrors.length > 0" style="color:red;"> {{v$.contrasena.$silentErrors[0].$message}}</label>     
                <div class="d-flex justify-content-center">
                    <button v-on:click="validar" class="btn btn-primary" style="width:350px">
                            Ingresar                       
                    </button>
                </div>
               <button @click="abrirModal" type="button" class="btn btn-link">¿Olvidaste tu contraseña?</button>
                <div class="d-flex justify-content-center" style="padding-top: 10px;">
                    <button class="btn btn-success" v-on:click="registrarse">Crear Cuenta Nueva</button>
                </div>
            </div>
        </div>
</div>
<MDBModal
    id="modal"
    tabindex="-1"
    labelledby="modalLabel"
    v-model="modal.flag"
    >
    <MDBModalHeader>
      <h2>Recuperar contraseña</h2>
    </MDBModalHeader>
    <MDBModalBody>
        <p align="start">Ingresa correo electronico de tu cuenta donde se enviara el código para restablecer la contraseña.</p>            
        <input @focus="salir" type="text" class="form-control" placeholder="Ingrese Correo" v-model="state.correo">
        <label v-if="v$.correo.$silentErrors.length > 0" style="color:red;">{{v$.correo.$silentErrors[0].$message}}</label>     
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="modal.flag = false">Cancelar</MDBBtn>
      <button  class="btn btn-secondary" @click="sendCode">Enviar</button>
    </MDBModalFooter>
</MDBModal>
<MDBModal
    id="modal2"
    tabindex="-1"
    labelledby="modalLabel2"
    v-model="modal.flag2"
    >
    <MDBModalHeader>
      <h2>Código de recuperación</h2>
    </MDBModalHeader>
    <MDBModalBody>
        <p align="start">Ingresa código de recuperación que se acaba de enviar al correo <strong>{{state.correo}}</strong>.</p>            
        <input type="text" class="form-control" placeholder="Ingrese Código" v-model="codigo.code" required minlength="1" maxlength="4">
        <label v-if="codigo.code == null || codigo.code == ''" style="color:red;padding-top:10px"> Código Requerido.</label>     
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="modal.flag2 = false">Cancelar</MDBBtn>
      <button  class="btn btn-secondary" @click="verifyCode">Enviar</button>
    </MDBModalFooter>
</MDBModal>
<MDBModal
    id="modal3"
    tabindex="-1"
    labelledby="modalLabel3"
    v-model="modal.flag3"
    >
    <MDBModalHeader>
      <h2>Nueva Contraseña</h2>
    </MDBModalHeader>
    <MDBModalBody>
        <label>Nueva Contraseña:</label>
        <div class="form-group">
            <input v-if="!modal.flagcon" type="password" class="form-control" placeholder="Ingrese Contraseña" v-model="newPassword.pass1">
            <input v-if="modal.flagcon" type="text" class="form-control" placeholder="Ingrese Contraseña" v-model="newPassword.pass1">
            <label v-if="newPassword.pass1 == null || newPassword.pass1 == ''" style="color:red;padding-top:10px">Contraseña Requerida.</label>
            <i v-if="(!modal.flagcon) && (newPassword.pass1 != null) && (newPassword.pass1 != '')" class="fas fa-eye" v-on:click="modal.flagcon = true"></i>
            <i v-if="(modal.flagcon) && (newPassword.pass1 != null) && (newPassword.pass1 != '')" class="fas fa-eye-slash" v-on:click="modal.flagcon = false"></i>
            <div v-if="(newPassword.pass1 != null) && (newPassword.pass1 != '')"></div>
            <label v-if="reqPass() == false && (newPassword.pass1 != null) && (newPassword.pass1 != '')" style="color:red;">Contraseña invalida.</label>
            <Popper v-if="reqPass() == false" :show="showPopper"  placement='top'>
                  <i  @mouseover="showPopper = true" @mouseleave="showPopper = false" class="fas fa-info-circle" style="padding-left:10px" ></i>
                  <template #content>
                    <div style="background-color:black; color:white;padding:15px; border-radius: 10px;">
                        <p >La constraseña debe tener letras mayusculas,</p>
                           <p>minusculas,
                           numeros y caracteres especiales.</p>
                    </div>
                  </template>
              </Popper>
        </div> 
        <div class="form-group">
            <label>Verficar Contraseña:</label>
            <input v-if="!modal.flagcon2" type="password" class="form-control" placeholder="Ingrese Contraseña" v-model="newPassword.pass2">
            <input v-if="modal.flagcon2" type="text" class="form-control" placeholder="Ingrese Contraseña" v-model="newPassword.pass2">
            <label v-if="newPassword.pass2 == null || newPassword.pass2 == ''" style="color:red;padding-top:10px">Contraseña Requerida.</label>
            <i v-if="(!modal.flagcon2) && (newPassword.pass2 != null) && (newPassword.pass2 != '')" class="fas fa-eye" v-on:click="modal.flagcon2 = true"></i>
            <i v-if="(modal.flagcon2) && (newPassword.pass2 != null) && (newPassword.pass2 != '')" class="fas fa-eye-slash" v-on:click="modal.flagcon2 = false"></i>
            <p v-if="(newPassword.pass1 != newPassword.pass2)&&(newPassword.pass2 != null) && (newPassword.pass2 != '')" style="color:red;padding-top:10px">Las contraseñas no coinciden.</p>
        </div>         
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="modal.flag3 = false">Cancelar</MDBBtn>
      <button  class="btn btn-secondary" @click="sendPass">Enviar</button>
    </MDBModalFooter>
</MDBModal>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import useVuelidate from '@vuelidate/core'
import { required, helpers,email  } from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
import {
    MDBModal,
    MDBModalHeader,
    //MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  } from 'mdb-vue-ui-kit';
import Popper from "vue3-popper";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
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
        // eslint-disable-next-line no-unused-vars
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuario" ).then((result) => {})
        });
        const modal = reactive({
            flag:false,
            flag2:false,
            flag3: false,
            flagcon : false,
            flagcon2: false
        });  
        const state = reactive({
            correo : null,
            contrasena: null,
            flag : null
        });
        const codigo = reactive({
            code : null
        })
        const newPassword = reactive({
            pass1:null,
            pass2:null
        })
        const rules = {

            correo: { required: helpers.withMessage('Correo requerido.', required),
              email :  helpers.withMessage('Correo Invalido.', email)
                },
            contrasena :{ required : helpers.withMessage('Contraseña requerida.', required)
        }
  } 
    return { v$:  useVuelidate(rules, state), state, modal, codigo, newPassword
    }
  },
    data() {
        return {
        showPopper: false,
        };
    },
    methods :{
        sendPass: function(){
            if(this.newPassword.pass1 == null || this.newPassword.pass1 == '' || this.newPassword.pass2 == null || this.newPassword.pass2 == ''){
                this.$toast.show("Ingrese los campos correctamente!", {
                    type: "error",
                });
                return;
            }
            if(this.reqPass() == false){
                this.$toast.show("La contraseña no cumple con los requisitos minimos.", {
                    type: "error",
                });
                return;
            }
            if(this.newPassword.pass1 != this.newPassword.pass2){
                this.$toast.show("Las contraseñas no coinciden.", {
                    type: "error",
                });
                return;
            }
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/changePass", this.newPassword).then(response => {
                //console.log(response.data.usunombre)
                let text = "Tu contraseña fue restablecida con exito " + response.data.usunombre + "."
                this.$swal.fire({
                        title: 'Contraseña Actualizada!!',
                        text: text,
                        icon: 'success',
                    })
                this.modal.flag3 = false
                this.newPassword.pass1 = null
                this.newPassword.pass2 = null
                
            // eslint-disable-next-line no-unused-vars
            }).catch(e => {
                //console.log(e.response.data)
            })
        },
        reqPass: function(){
            return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(this.newPassword.pass1)
        },
        verifyCode:  function(){
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
        
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/verifyCode", this.codigo).then(response => {
                //console.log(response.data)

                this.$toast.show(response.data, {
                    type: "success",
                });
                this.modal.flag2 = false
                this.modal.flag3 = true
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
        },
        sendCode: function(){
            this.newPassword.pass1 = null
            this.newPassword.pass2 = null
            this.codigo.code = null
            if(this.v$.correo.$silentErrors.length > 0){
                this.$toast.show("El correo que ingreso es incorrecto!", {
                        type: "error",
                }); 
            }
            //console.log(this.state.correo)
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/recoverPassword", this.state).then(response => {
                //console.log(response.data)
                this.$toast.show(response.data, {
                    type: "success",
                });
                this.modal.flag = false
                this.modal.flag2 = true
                this.state.correo = null
                this.state.contrasena = null
                
            // eslint-disable-next-line no-unused-vars
            }).catch(e => {
                //console.log(e.response.data.message);
                if(e.response.data.message == "El correo que ingreso no corresponde a ningun usuario."){
                    this.$toast.show(e.response.data.message, {
                        type: "error",
                    }); 
                }
                
          })
        },
        abrirModal: function(){
            this.modal.flag = true
        },
        registrarse : function(){
            //console.log("sign");
            this.$router.push({ name: "SignUp" });
        },
        validar : function(){
        if(this.v$.$invalid){
            this.$toast.show("Ingrese los campos correctamente!", {
              type: "error",       // all of other options may go here
            });
            return 
        }
        //console.log(this.state.contrasena)
         axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuarios", this.state ).then((result) => {
            //console.log(result.data[0]);
            if(result.data.length > 1){
                localStorage.setItem('sesion', 'activa');
                localStorage.setItem('correo', this.state.correo);
                localStorage.setItem('rol', result.data[0]);
                localStorage.setItem('nombre', result.data[1]);
                this.$emit("getData", localStorage.getItem('sesion'), localStorage.getItem('rol'), localStorage.getItem('nombre'));
                this.$toast.show("Inicio de sesión correcto", {
                    type: "success",
                });
                this.$router.push({ name: "Home" }); 
            }
        }).catch(e => {
                //console.log(e.response.data.message);
                if(e.response.data.message == "Credenciales incorrectas!"){
                    this.$toast.show(e.response.data.message, {
                        type: "error",
                    }); 
                }
                
          })
            
        }
    }
}
</script>

<style>

</style>