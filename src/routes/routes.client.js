import { BasicLayout } from "../layouts";
import { SelectTable } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
  },
];

export default routesClient;
