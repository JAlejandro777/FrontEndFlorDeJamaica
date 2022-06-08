<template>
<div style="background-color:#1B012B;">

    <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Venta</h2>
      </div>
      <div class="d-flex justify-content-center" style="height: 850px">
          <div class="formulario4">
              <div class="form-group">            
                  <label>Producto:</label>
                    <select v-on:click="productsSelect" class="form-control"  id="select1" v-model="state.venproducto">
                      <option v-for="item in productos.producto" :key="item.procodigo"> {{item.pronombre}}</option>
                    </select>    
              </div>
              <div class="form-group" >
                  <label>Cantidad de Unidades:</label>
                  <input type="number" class="form-control" placeholder="Ingrese Cantidad Unidades" v-model="state.vencantidadunidades">
              </div>
                <label v-if="v$.vencantidadunidades.$silentErrors.length > 0" style="color:red;"> {{v$.vencantidadunidades.$silentErrors[0].$message}}</label>
              <div class="form-group">
                  <label>IVA:</label>
                  <select class="form-control" v-model="state.veniva">
                      <option>Sin IVA</option>
                      <option>19%</option>
                  </select>
              </div>
               <div class="form-group">
                    <label>Cliente:</label>
                    <select v-on:click="clienteSelect" class="form-control"  id="select1" v-model="state.vencliente">
                        <option v-for="item in clientes.cliente" :key="item.clicedula"> {{item.clinombre}}</option>
                    </select>                
                </div>
              <div class="form-group">
                  <label>Valor a Pagar:</label>
                  <input type="number" class="form-control" placeholder="Ingrese Valor a Pagar" v-model="state.venvalorpagar" @focus="calcularTotal" readonly>
              </div>
                <label v-if="v$.venvalorpagar.$silentErrors.length > 0" style="color:red;"> {{v$.venvalorpagar.$silentErrors[0].$message}}</label>
              <div v-if="!pago.tarjeta || pago.tarjeta == null" class="form-group" >
                  <label>Monto Recibido:</label>
                  <input type="number" class="form-control" placeholder="Ingrese Monto Recibido" v-model="pago.monto">
              </div>
              <div v-if="!pago.tarjeta || pago.tarjeta == null" class="form-group">
                  <label>Devolución:</label>
                  <input type="number" class="form-control" placeholder="Ingrese Devolución" @focus="calcularDevolución" v-model="pago.devolucion" readonly>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="pago.tarjeta" >
                  <label class="form-check-label" for="flexCheckDefault">
                      Paga con Tarjeta
                  </label>
              </div>
              
              <div style="padding-top: 10px;">                    
                    <button class="btn btn-light" v-on:click="CreateSale">
                        Generar Venta y Factura
                    </button>
              </div>
           
          </div>
      </div>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { jsPDF } from "jspdf";
import useVuelidate from '@vuelidate/core'
// eslint-disable-next-line no-unused-vars
import { required, helpers  } from '@vuelidate/validators'
import axios from 'axios';
import { reactive, onMounted } from "vue";
export default {
    name : "CreateSale",
    setup(){
        onMounted(() => {       
        });
        const productos = reactive({
            producto:[],
            precioProducto : null
        });
        const clientes = reactive({
            cliente:[]
        });
        const pago = reactive({
            tarjeta:null,
            monto : "",
            iva : null,
            devolucion : "",
        });

        const state = reactive({
            vencantidadunidades : null,
            veniva : null,
            venvalorpagar : null,
            venproducto : null,
            vencliente : null

        });
       const rules = {
            vencantidadunidades: { required: helpers.withMessage('Unidades requeridas.', required)},
            venvalorpagar: { required: helpers.withMessage('Valor requerido.', required)},
        } 
    return { v$:  useVuelidate(rules, state), state, productos,pago,clientes}    
    },
    methods :{
        calcularDevolución: function(){
            if(this.state.venvalorpagar == "" || this.pago.monto == "" || this.pago.monto  == null){
                this.$toast.show("Monto requerido.", {
                    type: "error",
                });
                return
            }
            if(this.pago.monto < this.state.venvalorpagar ){
                this.$toast.show("Fondos Insuficientes.", {
                    type: "error",
                });
                return
            }
            this.pago.devolucion = this.pago.monto - this.state.venvalorpagar
        },
        calcularTotal: function(){
            if(this.state.veniva == null || this.state.venproducto == null || this.state.vencantidadunidades == null){
                return;
            }
             this.productos.precioProducto = this.state.venproducto
            // eslint-disable-next-line no-unused-vars
            Object.entries(this.productos.producto).forEach(([key, value]) => {
                if(Object.values(value)[3] == this.productos.precioProducto ){
                    this.productos.precioProducto = Object.values(value)[6] 
                }
            });
            if(this.state.veniva == "19%"){
                this.pago.iva = 0.19
                this.productos.precioProducto  = this.productos.precioProducto * this.state.vencantidadunidades
                this.pago.iva = this.pago.iva * this.productos.precioProducto
                this.productos.precioProducto = this.productos.precioProducto + this.pago.iva
                this.state.venvalorpagar =  this.productos.precioProducto
            }
            else{
                this.pago.iva = 0
                this.productos.precioProducto  = this.productos.precioProducto * this.state.vencantidadunidades
                this.state.venvalorpagar =  this.productos.precioProducto
            }
            //console.log(this.state.venvalorpagar)
            
        },
        productsSelect: function () {
          axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/producto").then(response => {
            this.productos.producto = response.data;
            //console.log(this.productos.producto);
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
              //console.log(e);
          })
        },
        clienteSelect: function () {
          axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/cliente").then(response => {
            this.clientes.cliente = response.data;
            //console.log( this.clientes.cliente);
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
              //console.log(e);
          })
        },
        CreateSale : function(){
            if(this.v$.$invalid || this.state.venproducto == null || this.state.vencliente  == null || this.state.veniva == null){
                this.$toast.show("Ingrese los campos correctamente!", {
                    type: "error",
                });
                return
            }
            if(this.pago.tarjeta == null || this.pago.tarjeta == false){
                if(this.pago.monto == "" || this.pago.devolucion.length == 0 ){
                    this.$toast.show("Ingrese los campos correctamente!", {
                        type: "error",
                    });
                    return
                }
            }
            this.state.veniva = this.pago.iva
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/venta", this.state).then(response => {
                //console.log(response.data)
                const linkSource = `data:application/pdf;base64,${response.data}`;
                const downloadLink = document.createElement("a");
                const fileName = "Factura.pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
                
                this.state.vencantidadunidades = null
                this.state.vencliente = null
                this.state.veniva = null,
                this.state.venproducto = null,
                this.state.venvalorpagar = null,
                this.pago.monto = null
                this.pago.devolucion = null
                this.pago.iva = null
                this.productos.precioProducto = null
                this.$toast.show("Venta Satisfactoria!!", {
                    type: "success",
                });
               this.$swal.fire({
                    title: 'Factura Generada!!',
                    icon: 'success',
                })
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