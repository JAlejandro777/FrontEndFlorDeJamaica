<template>
<div style="background-color:#1B012B;">
    <div class="d-flex justify-content-center" style="padding-top: 15px;">
        <h2 class="titulo2">Registro Producto</h2>
    </div>
    <div class="d-flex justify-content-center" style="height: 1200px">
        <div class="formulario3">
            <div class="form-group">            
                <label>Código:</label>
                <input type="number" class="form-control"  placeholder="Ingrese Código" v-model="state.procodigo">     
            </div>
            <label v-if="v$.procodigo.$silentErrors.length > 0" style="color:red;"> {{v$.procodigo.$silentErrors[0].$message}}</label>     
             <div class="form-group">
                    <label>Proveedor:</label>
                    <select class="form-control"  id="select1" v-model="proveedores.proModel" @change="proChange">
                        <option v-for="item in proveedores.proveedor" :key="item.proid"> {{item.pronombre}}</option>
                    </select>                
            </div>
            <label v-if="v$.tblproveedor_proid.$silentErrors.length > 0" style="color:red;"> {{v$.tblproveedor_proid.$silentErrors[0].$message}}</label>     
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" class="form-control" placeholder="Ingrese Nombre" v-model="state.pronombre">
            </div>
            <label v-if="v$.pronombre.$silentErrors.length > 0" style="color:red;"> {{v$.pronombre.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Caracteristica:</label>
                <input type="text" class="form-control" placeholder="Ingrese Caracteristica" v-model="state.procaracteristica">
            </div>
            <label v-if="v$.procaracteristica.$silentErrors.length > 0" style="color:red;"> {{v$.procaracteristica.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Categoria:</label>
                <input type="text" class="form-control" placeholder="Ingrese Categoria" v-model="state.procategoria">
            </div>
            <label v-if="v$.procategoria.$silentErrors.length > 0" style="color:red;"> {{v$.procategoria.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Precio Sugerido:</label>
                <input type="number" class="form-control" placeholder="Ingrese Precio Sugerido" v-model="state.propreciosugerido">
            </div>
            <label v-if="v$.propreciosugerido.$silentErrors.length > 0" style="color:red;"> {{v$.propreciosugerido.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Unidades Disponibles:</label>
                <input type="number" class="form-control" placeholder="Ingrese Unidades Disponibles" v-model="state.prounidadesdisponibles">
            </div>
            <label v-if="v$.prounidadesdisponibles.$silentErrors.length > 0" style="color:red;"> {{v$.prounidadesdisponibles.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Fecha de Ingreso:</label>
                <input type="date" class="form-control" placeholder="Ingrese Fecha Ingreso" v-model="state.profechaingreso">
            </div>
            <label v-if="v$.profechaingreso.$silentErrors.length > 0" style="color:red;"> {{v$.profechaingreso.$silentErrors[0].$message}}</label>
            <div class="form-group">
                <label>Fecha de Vencimiento:</label>
                <input type="date" class="form-control" placeholder="Ingrese Vencimiento" v-model="state.profechavencimiento">
            </div>
            <label v-if="v$.profechavencimiento.$silentErrors.length > 0" style="color:red;"> {{v$.profechavencimiento.$silentErrors[0].$message}}</label>
            
            <div class="d-flex justify-content-center" style="padding-top: 5px;">
                <button class="btn btn-light" v-on:click="CreateProduct">
                    Crear Producto
                </button>
            </div>
         
        </div>
    </div>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers  } from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
export default {
    name : "CreateProduct",
    setup(){
        onMounted(() => {
                // eslint-disable-next-line no-unused-vars
                axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/producto" ).then((result) => {})
                axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/proveedor").then(response => {
                    proveedores.proveedor = response.data;
                    //console.log(this.productos.producto);
                })
                // eslint-disable-next-line no-unused-vars
                .catch(e => {
                    //console.log(e);
                })       
        });
        const proveedores = reactive({
            proveedor:[],
            proModel: null
        });
        const state = reactive({
            procodigo : null,
            tblproveedor_proid: null,
            tblusuario_usuid : localStorage.getItem('user'),
            pronombre : null,
            procaracteristica : null,
            procategoria : null,
            propreciosugerido : null,
            prounidadesdisponibles : null,
            profechaingreso : null,
            profechavencimiento : null


    });
       const rules = {
            procodigo: { required: helpers.withMessage('Código requerido.', required)},
            tblproveedor_proid :{ required : helpers.withMessage('Proveedor requerido.', required)},
            pronombre :{ required : helpers.withMessage('Nombre requerido.', required)},
            procaracteristica :{ required : helpers.withMessage('Caracteristica requerida.', required)},
            procategoria :{ required : helpers.withMessage('Categoria requerida.', required)},
            propreciosugerido :{ required : helpers.withMessage('Precio requerido.', required)},
            prounidadesdisponibles :{ required : helpers.withMessage('Unidades requeridas.', required)},
            profechaingreso :{ required : helpers.withMessage('Fecha Ingreso requerida.', required)},
            profechavencimiento :{ required : helpers.withMessage('Fecha Vencimiento requerida.', required)},
        } 
    return { v$:  useVuelidate(rules, state), state, proveedores }    
    },
        methods :{
        proChange : function(){
            this.state.tblproveedor_proid = this.proveedores.proModel
        },
        CreateProduct : function(){
            if(this.v$.$invalid || this.proveedores.proModel == null){
                this.$toast.show("Ingrese los campos correctamente!", {
                type: "error",
                // all of other options may go here
                });
                return
            }
        // eslint-disable-next-line no-unused-vars
        Object.entries(this.proveedores.proveedor).forEach(([key, value]) => {
              if(Object.values(value)[1] == this.state.tblproveedor_proid){
                this.state.tblproveedor_proid = Object.values(value)[0]
              }
              
          });
          console.log(this.state)
          // eslint-disable-next-line no-unused-vars
          axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/producto", this.state).then(response => {
            //console.log(response)
            this.state.procodigo = null
            this.state.tblproveedor_proid = null
            this.state.pronombre = null,
            this.state.procaracteristica = null,
            this.state.procategoria = null,
            this.state.propreciosugerido = null,
            this.state.prounidadesdisponibles = null,
            this.state.profechaingreso = null,
            this.state.profechavencimiento = null,
            this.$toast.show("Producto Creado Correctamente!!", {
              type: "success",
            });
          })
          .catch(e => {
              //console.log(e.response.data.message);
              if(e.response.data.message == "Código existente!"){
                    this.$toast.show("El código del producto que ingreso ya existe, ingrese otro.", {
                        type: "error",
                    });
                    return
              }
              if(e.response.data.message == "Proveedor Incorrecto!"){
                this.$toast.show("El código del proveedor que ingreso es incorrecto, vuelva a intentarlo", {
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