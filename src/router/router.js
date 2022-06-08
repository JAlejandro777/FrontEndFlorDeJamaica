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
    meta: { requiresAuth: true }
  }, 
  {
    path: "/createProduct",
    name: "CreateProduct",
    component: CreateProduct,
    meta: { requiresAuth: true }
  },
  {
    path: "/viewProducts",
    name: "ViewProducts",
    component: ViewProducts,
    meta: { requiresAuth: true }
  },  
  {
    path: "/createCustomer",
    name: "CreateCustomer",
    component: CreateCustomer,
    meta: { requiresAuth: true }
  }, 
  {
    path: "/viewCustomers",
    name: "ViewCustomers",
    component: ViewCustomers,
    meta: { requiresAuth: true }
  },
  {
    path: "/createSale",
    name: "CreateSale",
    component: CreateSale,
    meta: { requiresAuth: true }
  }, 
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: { requiresAuth: true }
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
  if (is_auth == to.meta.requiresAuth) return true
  if (is_auth) return { name: "Home" };

  return { name: "Login" };
})
export default router;