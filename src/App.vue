<template>
<div class="d-flex justify-content-center" style="background-color:#1B012B;">

<nav style="border-radius:10px" class="navbar navbar-expand-lg navbar-dark bg-dark"  :key="menu.sesion"  v-if="menu.sesion  != 'activa'">
  <a class="navbar-brand" href="#">Menu</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a v-on:click="loadSingUp" id="txtBt" class="btn btn-dark btn-lg" href="#">Crear Usuario <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a v-on:click="loadLogin" id="txtBt" class="btn btn-dark btn-lg" href="#">Iniciar Sesión <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>

<div v-if="menu.sesion == 'activa'" id="txtBt" style="background-color:black;padding:20px;border-top-left-radius:10px;border-bottom-left-radius:10px;color:white">
    {{menu.rol}}
</div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="menu.sesion == 'activa'" :key="menu.sesion">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a v-on:click="loadHome" id="txtBt" class="btn btn-dark btn-lg" href="#">Home<span class="sr-only">(current)</span></a>
      </li>
      <li v-if="menu.rol == 'Administrador'" class="nav-item active">
        <a v-on:click="loadRoles" id="txtBt" class="btn btn-dark btn-lg" href="#">Crear Roles<span class="sr-only">(current)</span></a>
      </li>
      <li v-if="menu.rol == 'Administrador' || menu.rol == 'Almacenista'"  class="nav-item dropdown">
        <a id="txtBt" class="btn btn-dark btn-lg dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Ingreso y control
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a id="txtBt" v-on:click="loadCreateProduct" class="dropdown-item" href="#">Registrar Producto</a>
          <a id="txtBt" v-on:click="loadViewProducts" class="dropdown-item" href="#">Ver Productos</a>
        </div>
      </li>
      <li v-if="menu.rol == 'Administrador' || menu.rol == 'Cajero'"  class="nav-item dropdown">
        <a id="txtBt" class="btn btn-dark btn-lg dropdown-toggle" href="#"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Ventas y seguimiento
        </a> 
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a id="txtBt" class="dropdown-item" v-on:click="loadCreateCustomer">Registrar Cliente</a>
            <a id="txtBt" class="dropdown-item" v-on:click="loadViewCustomers">Visualizar Clientes</a>
            <a id="txtBt" class="dropdown-item" v-on:click="loadCreateSale">Registrar Venta</a>
        </div>
      </li>
      <li v-if="menu.rol == 'Administrador'"  class="nav-item active">
        <a v-on:click="loadReports" id="txtBt" class="btn btn-dark btn-lg" href="#">Informes<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a v-on:click="cerrarSesion" id="txtBt" class="btn btn-dark btn-lg" href="#">Cerrar Sesión<span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
<div v-if="menu.sesion == 'activa'" id="txtBt" style="background-color:black;padding:20px;border-top-right-radius:10px;border-bottom-right-radius:10px;color:white">
    {{menu.nombreUsu}}
    <i style="padding-left:5px" class="fas fa-user-circle"></i>
</div>
</div>
<router-view v-on:getData="getData">
</router-view>
</template>

<script>
import Login from "./views/Login.vue";
import { reactive, onMounted } from "vue";
export default {
  name: 'App',
  setup(){  
     onMounted(() => {
        //menu.rol  = localStorage.getItem('rol')
        });
      const menu = reactive({
            sesion : localStorage.getItem('sesion'),
            rol : localStorage.getItem('rol'),
            nombreUsu : localStorage.getItem('nombre')
        });
        return { menu }
  },
  methods: {
  
    loadHome: function () {
       this.$router.push({ name: "Home" });
    },
    loadSingUp: function(){
      this.$router.push({ name: "SignUp" });
    },
    loadLogin: function(){
      this.$router.push({ name: "Login" });
    },
    loadRoles: function(){
      this.$router.push({ name: "Roles" });
    },
    loadCreateProduct: function(){
      this.$router.push({ name: "CreateProduct" });
    },
    loadViewProducts: function(){
      this.$router.push({ name: "ViewProducts" });
    },
    loadCreateCustomer: function(){
      this.$router.push({ name: "CreateCustomer" });
    },
    loadViewCustomers: function(){
      this.$router.push({ name: "ViewCustomers" });
    },
    loadCreateSale: function(){
      this.$router.push({ name: "CreateSale" });
    },
    loadReports: function(){
      this.$router.push({ name: "Reports" });
    },    
    cerrarSesion: function(){
      localStorage.setItem('sesion', 'inactiva');
      this.menu.sesion = localStorage.getItem('sesion')
      localStorage.setItem('user', "null");
      localStorage.setItem('rol', "null");
      localStorage.setItem('data', "null");
      localStorage.setItem('cliente', "null");
      this.$toast.show("Sesión cerrada", {
                type: "error",
                });
      this.$router.push({ name: "Login" })
     
    },
    getData : function(data, data2, data3){
        this.menu.sesion = data
        this.menu.rol = data2
        this.menu.nombreUsu = data3
    },
    

  },
  
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
