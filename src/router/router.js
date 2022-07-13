import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Roles from "../views/Roles.vue";
import CreateProduct from "../views/CreateProduct.vue";
import ViewProducts from "../views/ViewProducts.vue";
import CreateCustomer from "../views/CreateCustomer.vue";
import ViewCustomers from "../views/ViewCustomers.vue";
import CreateSale from "../views/CreateSale.vue";
import Reports from "../views/Reports.vue";
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: "/roles",
    name: "Roles",
    component: Roles,
    meta: { requiresAuth: true },
     // eslint-disable-next-line no-unused-vars
     beforeEnter: (to, from) => {
      if(to.meta.rol != "Administrador"){
        return { name: "Home" }
      }
    },
  }, 
  {
    path: "/createProduct",
    name: "CreateProduct",
    component: CreateProduct,
    meta: { requiresAuth: true },
     // eslint-disable-next-line no-unused-vars
     beforeEnter: (to, from) => {
      if(to.meta.rol != "Administrador" && to.meta.rol != "Almacenista"){
        return { name: "Home" }
      }

    },
  },
  {
    path: "/viewProducts",
    name: "ViewProducts",
    component: ViewProducts,
    meta: { requiresAuth: true },
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from) => {
      if(to.meta.rol != "Administrador" && to.meta.rol != "Almacenista"){
        return { name: "Home" }
      }
    },
  },  
  {
    path: "/createCustomer",
    name: "CreateCustomer",
    component: CreateCustomer,
    meta: { requiresAuth: true },
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from) => {
      //console.log(to.meta.rol)
      if((to.meta.rol != "Administrador") && (to.meta.rol != 'Cajero')){
        return { name: "Home" }
      }
    },
  }, 
  {
    path: "/viewCustomers",
    name: "ViewCustomers",
    component: ViewCustomers,
    meta: { requiresAuth: true },
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from) => {
      //console.log(to.meta.rol)
      if((to.meta.rol != "Administrador") && (to.meta.rol != 'Cajero')){
        return { name: "Home" }
      }
    },
  },
  {
    path: "/createSale",
    name: "CreateSale",
    component: CreateSale,
    meta: { requiresAuth: true },
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from) => {
      //console.log(to.meta.rol)
      if((to.meta.rol != "Administrador") && (to.meta.rol != 'Cajero')){
        return { name: "Home" }
      }
    },
  }, 
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: { requiresAuth: true },
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from) => {
      //console.log(to.meta.rol)
      if(to.meta.rol != "Administrador" ){
        return { name: "Home" }
      }
    },
  },     

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
async function isAuth() {
  if (localStorage.getItem("sesion") == 'activa'){
    return true
  }
  return false
}
// eslint-disable-next-line no-unused-vars
router.beforeEach(async(to, from) => {
  var is_auth = await isAuth();
  //console.log(to.meta.rol)
  var roles =  localStorage.getItem("rol");
  //console.log(roles)
  to.meta.rol = roles
  //console.log(to.meta.rol)
  if (is_auth == to.meta.requiresAuth) return true
  if (is_auth) {
    //console.log("Entro")
    return { name: "Home" };
  }

  return { name: "Login" };
})
export default router;