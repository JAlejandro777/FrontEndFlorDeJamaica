<template>
<div style="background-color:#1B012B;">

    <div class="d-flex justify-content-center" style="padding-top: 15px;">
          <h2 class="titulo2">Venta</h2>
      </div>
      <div class="d-flex justify-content-center" style="height: 850px">
          <div class="formulario4">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label>Cliente:</label>
                        <select class="form-control"  id="select1" v-model="state.vencliente">
                            <option v-for="item in clientes.cliente" :key="item.clicedula"> {{item.clinombre}}</option>
                        </select>                
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">            
                        <label>Producto:</label>
                        <select class="form-control"  id="select1" v-model="state.venproducto">
                            <option v-for="item in productos.producto" :key="item.procodigo"> {{item.pronombre}}</option>
                        </select>    
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group" >
                        <label>Unidades:</label>
                        <input type="number" class="form-control" placeholder="Unidades" v-model="state.vencantidadunidades">
                    </div>
                      <label v-if="v$.vencantidadunidades.$silentErrors.length > 0" style="color:red;"> {{v$.vencantidadunidades.$silentErrors[0].$message}}</label>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label>IVA:</label>
                        <select class="form-control" v-model="pago.ivaModel">
                            <option>Sin IVA</option>
                            <option>19%</option>
                        </select>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group" style="padding-top:35px">
                        <label>Valor:<strong> {{calculoTotalPro}}</strong></label>
                       
                    </div>
                </div>
                 <div class="col-4" style="padding-top: 30px;">                    
                      <button class="btn btn-success" v-on:click="CreateSale">
                          Agregar producto
                      </button>
                </div>
                <div class="col-12" style="padding-top:15px">
                        <table class="table table-striped table-dark" >
                            <thead>
                                <tr>
                                <th scope="col-sm">Cliente</th>
                                <th scope="col-sm">Cantidad</th>
                                <th scope="col-sm">Producto</th>
                                <th scope="col-sm">IVA</th>
                                <th scope="col-sm">Total</th>
                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in venta" :key="item.producto">
                                <td>{{item[4]}}</td>
                                <td>{{item[0]}}</td>
                                <td>{{item[3]}}</td>
                                <td>{{item[1]}}</td>
                                <td>{{item[2]}}</td>
                                </tr>
                            </tbody>
                        </table>
                   
                </div>
             
                <div class="col-4">
                    <div class="form-group" style="padding-top:35px" >
                        <label>Total: {{calculoTotal}}</label>
                    </div>
                </div>
                <div class="col-4">
                    <div v-if="!pago.tarjeta || pago.tarjeta == null" class="form-group" >
                        <label>Monto Recibido:</label>
                        <input id="dev" type="number" class="form-control" placeholder="Ingrese Monto Recibido" v-model="pago.monto" @change="validation">
                    </div>
                </div>
                <div class="col-4">
                    <div v-if="!pago.tarjeta || pago.tarjeta == null" class="form-group" style="padding-top:35px">
                        <label>Devolución: {{calculoDevolucion}}</label>
                    </div>
                </div>
                <div class="col-4" style="padding-left:45px">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="pago.tarjeta" >
                        <label class="form-check-label" for="flexCheckDefault">
                            Tarjeta
                        </label>
                    </div>
                </div>
                <div class="col-4">
                    <div style="padding-top: 10px;">                    
                          <button class="btn btn-success" v-on:click="createInvoice">
                              Generar Factura
                          </button>
                    </div>
                </div>
            </div>
           
          </div>
          <!--<pre>{{venta}}</pre>-->
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
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/producto").then(response => {
                productos.producto = response.data;
            }) 
            axios.get("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/cliente").then(response => {
                clientes.cliente = response.data;
            })
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
            ivaModel : null,
            total : null
        });

        const state = reactive({
            vencantidadunidades : null,
            veniva : null,
            venvalorpagar : null,
            venproducto : null,
            vencliente : null

        });
    
       const rules = {
            vencantidadunidades: { required: helpers.withMessage('Unidades requeridas.', required)}
          
        } 
    return { v$:  useVuelidate(rules, state), state, productos,pago,clientes}    
    },
    data(){
         return {
        venta:[],
        table:{
            vencantidadunidades : null,
            veniva : null,
            venvalorpagar : null,
            venproducto: null,
            vencliente: null
        }
         }
    },

    computed: {
        calculoTotalPro: function () {
           
           return this.calculoProduto()
        
        },
        calculoTotal: function(){
            return this.total()
        },
        calculoDevolucion: function(){
            return this.calcularDevolución()
        }
    },
    methods :{
        validation: function(){
            var x = document.getElementById("dev").value; //vacia el campo.
            //console.log(x)
            if(x == "" || x == null){
                this.$toast.show("Monto requerido.", {
                    type: "error",
                });
                return
            }
            if(x < this.pago.total ){
                this.$toast.show("Fondos insuficientes.", {
                    type: "error",
                });
                return
            }
        },
        calcularDevolución: function(){
            if(this.pago.total == "" || this.pago.total == null){
                return 0
            }
            if(this.pago.monto < this.pago.total ){
                
                return 0
            }
           
            return this.pago.devolucion = this.pago.monto - this.pago.total
        },
        calculoProduto: function(){
             if(this.pago.ivaModel == null || this.state.venproducto == null || this.state.vencantidadunidades == null){
                return;
            }
            this.productos.precioProducto = this.state.venproducto
            // eslint-disable-next-line no-unused-vars
            Object.entries(this.productos.producto).forEach(([key, value]) => {
                if(Object.values(value)[3] == this.productos.precioProducto ){
                    this.productos.precioProducto = Object.values(value)[6] 
                }
            });
            if(this.pago.ivaModel == "19%"){
                this.pago.iva = 0.19
                this.productos.precioProducto  = this.productos.precioProducto * this.state.vencantidadunidades
                this.pago.iva = this.pago.iva * this.productos.precioProducto
                this.state.veniva = this.pago.iva 
                this.productos.precioProducto = this.productos.precioProducto + this.pago.iva
                this.state.venvalorpagar =  this.productos.precioProducto
                return this.state.venvalorpagar;
            }
            else{
                this.pago.iva = 0
                this.state.veniva = this.pago.iva 
                this.productos.precioProducto  = this.productos.precioProducto * this.state.vencantidadunidades
                this.state.venvalorpagar =  this.productos.precioProducto
                return this.state.venvalorpagar;
            }
                       
        },
        total : function(){
            let suma = null;
            this.venta.forEach(function(i) {
                suma += i[2] 
            })
            this.pago.total = suma
            return this.pago.total
        },
        CreateSale : function(){
            if(this.state.venvalorpagar == null || this.state.vencantidadunidades == null || this.state.venproducto == null || this.state.vencliente  == null || this.state.veniva == null){
                this.$toast.show("Ingrese los campos correctamente!", {
                    type: "error",
                });
                return
            }
            /*if(this.pago.tarjeta == null || this.pago.tarjeta == false){
                if(this.pago.monto == "" || this.pago.devolucion.length == 0 ){
                    this.$toast.show("Ingrese los campos correctamente!", {
                        type: "error",
                    });
                    return
                }
            }*/
            // eslint-disable-next-line no-unused-vars
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/venta", this.state).then(response => {
               
                console.log(this.state)
                this.table.vencantidadunidades = this.state.vencantidadunidades
                this.table.vencliente =  this.state.vencliente
                this.table.veniva = this.state.veniva
                this.table.venproducto = this.state.venproducto
                this.table.venvalorpagar = this.state.venvalorpagar
                console.log(this.venta)
                this.venta.push(Object.values(this.table))
                console.log(this.venta)

                this.pago.ivaModel = null
                this.state.vencantidadunidades = null
                //this.state.vencliente = null
                this.state.veniva = null,
                this.state.venproducto = null,
                this.state.venvalorpagar = null,
                //this.pago.monto = null
                this.pago.devolucion = null
                this.pago.iva = null
                this.productos.precioProducto = null
                this.$toast.show("Venta Satisfactoria!!", {
                    type: "success",
                });
                /*
               
                */
            })
            // eslint-disable-next-line no-unused-vars
            .catch(e => {
                console.log(e.response.data.message);
                if(e.response.data.message == "No hay unidades!"){
                    this.$toast.show("El producto se encuentra agotado, no hay unidades disponibles!", {
                    type: "error",
                    });
                    return
                }
                if(e.response.data.message == "No hay esta cantidad!"){
                    this.$toast.show("No se encuentran todas las unidades solicitadas disponibles, intente con menor cantidad!", {
                    type: "error",
                    });
                    return
                }
                this.$toast.show("Hubo un error, vuelva a intentarlo", {
                type: "error",
                });
          })
                

     
        },
        createInvoice: function(){
            axios.post("https://backendcentronaturista.herokuapp.com/FlorDeJamaica/factura", this.venta).then(response => {
                //console.log(response.data)
                this.pago.monto = null
                const linkSource = `data:application/pdf;base64,${response.data}`;
                const downloadLink = document.createElement("a");
                const fileName = "Factura.pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
                 this.$swal.fire({
                    title: 'Factura Generada!!',
                    icon: 'success',
                })
                
            }).catch(e => {
                console.log(e.response.data.message);
                
          })
        }
    }

}
</script>

<style>

</style>