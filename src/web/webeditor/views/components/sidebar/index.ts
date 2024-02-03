import { Pug } from "@web/webeditor/models/Pug";

export class SideBar extends Pug {
  render = async () => {
    const items: any[] = [
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
          },
          {
            id: 2.2,
            name: "Projetos",
            url: "/timesheet/projects",
          },
          {
            id: 2.3,
            name: "Épicos",
            url: "/timesheet/epics",
          },
          {
            id: 2.4,
            name: "Board",
            url: "/timesheet/board",
          },
          {
            id: 2.5,
            name: "PBI Status",
            url: "/timesheet/pbi-status",
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
          },
          {
            id: 3.2,
            name: "Categorias",
            url: "/culinary/categories",
          },
          {
            id: 3.3,
            name: "Receitas",
            url: "/culinary/recipes",
          },
          {
            id: 3.4,
            name: "Avaliações",
            url: "/culinary/ratings",
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
          },
          {
            id: 91.2,
            name: "Módulos",
            url: "/administrator/modules",
          },
          {
            id: 91.3,
            name: "Regras",
            url: "/administrator/roles",
          },
        ],
      },
    ];
    return () => this.renderFile("components/sidebar", { items });
  };
}
