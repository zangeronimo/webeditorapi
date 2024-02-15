import { Roles } from "@application/messages/Roles";
import { HasRole } from "@application/usecase/webeditor";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class SidebarRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  hasRole = container.resolve(HasRole);

  constructor() {
    super();
    this.router.get("/", this.authorize.isAutenticated, this.getSidebar);
  }

  private getSidebar = async (req: Request, res: Response) => {
    const { id: userId, company } = req.user;
    const allItems: any[] = [
      {
        id: 1,
        name: "Página Inicial",
        icon: "home",
        url: "/",
        subItems: [],
      },
      {
        id: 2,
        name: "TimeSheet",
        icon: "list-check",
        subItems: [
          {
            id: 2.1,
            name: "Clientes",
            url: "/timesheet/clients",
            role: Roles.timesheets.clients.view,
          },
          {
            id: 2.2,
            name: "Projetos",
            url: "/timesheet/projects",
            role: Roles.timesheets.projects.view,
          },
          {
            id: 2.3,
            name: "Épicos",
            url: "/timesheet/epics",
            role: Roles.timesheets.epics.view,
          },
          {
            id: 2.4,
            name: "Board",
            url: "/timesheet/board",
            role: Roles.timesheets.pbis.view,
          },
          {
            id: 2.5,
            name: "PBI Status",
            url: "/timesheet/pbi-status",
            role: Roles.timesheets.pbisStatus.view,
          },
        ],
      },
      {
        id: 3,
        name: "Culinária",
        icon: "mortar-pestle",
        subItems: [
          {
            id: 3.1,
            name: "Levels",
            url: "/culinary/levels",
            role: Roles.culinary.levels.view,
          },
          {
            id: 3.2,
            name: "Categorias",
            url: "/culinary/categories",
            role: Roles.culinary.categories.view,
          },
          {
            id: 3.3,
            name: "Receitas",
            url: "/culinary/recipes",
            role: Roles.culinary.recipes.view,
          },
          {
            id: 3.4,
            name: "Avaliações",
            url: "/culinary/ratings",
            role: Roles.culinary.ratings.view,
          },
        ],
      },
      {
        id: 4,
        name: "Institucional",
        icon: "building-columns",
        subItems: [
          {
            id: 4.1,
            name: "Newsletters",
            url: "/institutional/newsletters",
            role: Roles.institutional.newsletters.view,
          },
        ],
      },
      {
        id: 5,
        name: "Publicidade",
        icon: "rectangle-ad",
        subItems: [
          {
            id: 5.1,
            name: "Banners",
            url: "/publicity/banners",
            role: Roles.publicity.banners.view,
          },
          {
            id: 5.2,
            name: "Categorias",
            url: "/publicity/categories",
            role: Roles.publicity.categories.view,
          },
        ],
      },
      {
        id: 90,
        name: "WEBEditor",
        icon: "linux",
        subItems: [
          {
            id: 90.1,
            name: "Usuários",
            url: "/webeditor/users",
            role: Roles.webeditor.users.view,
          },
        ],
      },
      {
        id: 91,
        name: "Administrador",
        icon: "gear",
        subItems: [
          {
            id: 91.1,
            name: "Empresas",
            url: "/administrator/companies",
            role: Roles.webeditor.companies.view,
          },
          {
            id: 91.2,
            name: "Módulos",
            url: "/administrator/modules",
            role: Roles.webeditor.modules.view,
          },
          {
            id: 91.3,
            name: "Regras",
            url: "/administrator/roles",
            role: Roles.webeditor.roles.view,
          },
        ],
      },
    ];

    const validatedItems: any[] = [];

    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      const show = !item.role && !item.subItems.length;
      if (show) {
        validatedItems.push(item);
        continue;
      }
      const validatedSubItems: any[] = [];
      for (let y = 0; y < item.subItems.length; y++) {
        const subItem = item.subItems[y];
        if (!subItem.role) {
          validatedSubItems.push(subItem);
          continue;
        }
        if (await this.hasRole.executeAsync(userId, company, subItem.role)) {
          validatedSubItems.push(subItem);
          continue;
        }
      }
      item.subItems = validatedSubItems;
      if (item.role) {
        if (await this.hasRole.executeAsync(userId, company, item.role)) {
          validatedItems.push(item);
        }
        continue;
      }
      if (item.subItems.length) validatedItems.push(item);
    }
    return res.json(validatedItems);
  };
}
