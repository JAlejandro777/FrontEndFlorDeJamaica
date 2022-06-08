<template>
<div class="d-flex justify-content-center" style="background-color:#1B012B;">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark"  :key="menu.flag"  v-if="menu.flag  != 'activa'">
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


<nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="menu.flag == 'activa'" :key="menu.flag">
  <a class="navbar-brand" href="#">Menu</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a v-on:click="loadHome" id="txtBt" class="btn btn-dark btn-lg" href="#">Home<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a v-on:click="loadRoles" id="txtBt" class="btn btn-dark btn-lg" href="#">Gestionar Roles<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item dropdown">
        <a id="txtBt" class="btn btn-dark btn-lg dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Ingreso y control
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a id="txtBt" v-on:click="loadCreateProduct" class="dropdown-item" href="#">Registrar Producto</a>
          <a id="txtBt" v-on:click="loadViewProducts" class="dropdown-item" href="#">Ver Productos</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a id="txtBt" class="btn btn-dark btn-lg dropdown-toggle" href="#"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Ventas y seguimiento
        </a> 
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a id="txtBt" class="dropdown-item" v-on:click="loadCreateCustomer">Registrar Cliente</a>
            <a id="txtBt" class="dropdown-item" v-on:click="loadViewCustomers">Visualizar Clientes</a>
            <a id="txtBt" class="dropdown-item" v-on:click="loadCreateSale">Registrar Venta</a>
        </div>
      </li>
      <li class="nav-item active">
        <a v-on:click="loadReports" id="txtBt" class="btn btn-dark btn-lg" href="#">Informes<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a v-on:click="cerrarSesion" id="txtBt" class="btn btn-dark btn-lg" href="#">Cerrar Sesión<span class="sr-only">(current)</span></a>
      </li>

    </ul>
  </div>
</nav>
</div>
<router-view v-on:getData="getData">
</router-view>
<!--<Login @getData="getData"/>-->
</template>

<script>
import Login from "./views/Login.vue";
import { reactive, onMounted } from "vue";
export default {
  name: 'App',
  setup(){  
     onMounted(() => {
        //console.log(menu.flag)
        });
      const menu = reactive({
            flag : localStorage.getItem('sesion')
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
      this.menu.flag = localStorage.getItem('sesion')
      this.$toast.show("Sesión cerrada", {
                type: "error",
                });
      this.$router.push({ name: "Login" })
     
    },
    getData : function(data){
        this.menu.flag = data
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
