<template>
<div style="background-color:#1B012B;">
    <div class="d-flex justify-content-center" style="padding-top: 15px;">
            <h2 class="titulo2">Iniciar Sesión</h2>
        </div>
        <div class="d-flex justify-content-center" style="height: 460px">
            <div class="formulario">
                <div class="form-group">            
                    <label>Usuario:</label>
                    <input v-model="state.usuario" type="text" class="form-control"  placeholder="Ingrese Usuario">     
                </div>
                <label v-if="v$.usuario.$silentErrors.length > 0" style="color:red;"> {{v$.usuario.$silentErrors[0].$message}}</label>     
                <div class="form-group">
                    <label>Contraseña:</label>
                    <input v-model="state.contrasena" type="password" class="form-control" placeholder="Ingrese Contraseña">
                </div>
                <label v-if="v$.contrasena.$silentErrors.length > 0" style="color:red;"> {{v$.contrasena.$silentErrors[0].$message}}</label>     
                <div class="d-flex justify-content-center" style="padding-top: 5px;">
                    <button v-on:click="validar" class="btn btn-light">
                            Ingresar
                    </button>
                </div>
                <div class="d-flex justify-content-center" style="padding-top: 5px;">
                    <button class="btn btn-light" v-on:click="registrarse">¿No tienes cuenta?</button>
                </div>
            </div>
        </div>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import useVuelidate from '@vuelidate/core'
import { required, helpers  } from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
     setup () {
      onMounted(() => {
          axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/usuario").then(response => {
            usuarios.usuario = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
              //console.log(e);
          })
      });
        const usuarios = reactive({
            usuario : [],
            flag : false
        });

      const state = reactive({
        usuario : null,
        contrasena: null

    });
       const rules = {

      usuario: { required: helpers.withMessage('Usuario requerido.', required)
              },
      contrasena :{ required : helpers.withMessage('Contraseña requerida.', required)
      }
  } 
    return { v$:  useVuelidate(rules, state), state , usuarios
    }
  },
    methods :{
        registrarse : function(){
            //console.log("sign");
            this.$router.push({ name: "SignUp" });
        },
        validar : function(){
            //console.log(this.usuarios.usuario)
            // eslint-disable-next-line no-unused-vars
            Object.entries(this.usuarios.usuario).forEach(([key, value]) => {
                if((Object.values(value)[4] == this.state.usuario) && (Object.values(value)[5] == this.state.contrasena)){
                    this.usuarios.flag = true
              }
            });
            if(this.usuarios.flag){
                localStorage.setItem('sesion', 'activa');
                localStorage.setItem('user', this.state.usuario);
                this.$emit("getData", localStorage.getItem('sesion'));
                this.$toast.show("Inicio de sesión correcto", {
                    type: "success",
                });
                this.$router.push({ name: "Home" }); 
            }
            else{
                this.$toast.show("Credenciales incorrectas", {
                    type: "error",
                }); 
            }
        }
    }
}
</script>

<style>

</style>