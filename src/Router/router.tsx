import { nanoid } from "nanoid";
import { Umumiy } from "../Pages/Umumiy";
import { BlockLangalar } from "../Pages/Block-Langalar";
import { Managerlar } from "../Pages/ManagerLar";
import { Hodimlar } from "../Pages/Hodimlar";
import { Vazifalar } from "../Pages/Vazifalar";
interface RouteType {
  component: React.FC;
  id: string;
  path?: string;
}

export const RoutersData: RouteType[] = [
  {
    id: nanoid(),
    component: Umumiy,
  },
  {
    id: nanoid(),
    component: BlockLangalar,
    path:"/app/block-langalar"
  },
  {
    id: nanoid(),
    component: Managerlar,
    path:"/app/managerlar"
  },
  {
    id: nanoid(),
    component: Hodimlar,
    path:"/app/hodimlar"
  },
  {
    id: nanoid(),
    component: Vazifalar,
    path:"/app/vazifalar"
  },
];
