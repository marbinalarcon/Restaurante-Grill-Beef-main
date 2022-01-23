import { BasicLayout, ClientLayouts } from "../layouts";
import { SelectTable, Categories, Products, Carts } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
  },

  {
    path: "/client/:tableNumber",
    layout: ClientLayouts,
    component: Categories,
  },

  {
    path: "/client/:tableNumber/cart",
    layout: ClientLayouts,
    component: Carts,
  },

  {
    path: "/client/:tableNumber/:idCategory",
    layout: ClientLayouts,
    component: Products,
  },
 
];

export default routesClient;
