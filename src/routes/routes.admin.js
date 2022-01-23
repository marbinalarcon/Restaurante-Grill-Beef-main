import { AdminLayout } from "../layouts";
import {
  OrdersAdmin,
  UserAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TablesAdmin,
  TableDetailsAdmin,
  PaymentsHistory,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: OrdersAdmin,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UserAdmin,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductAdmin,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TablesAdmin,
  },
  {
    path: "/admin/table/:id",
    layout: AdminLayout,
    component: TableDetailsAdmin,
  },
  {
    path: "/admin/payments-history",
    layout: AdminLayout,
    component: PaymentsHistory,
  },
];

export default routesAdmin;
