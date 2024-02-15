export class Roles {
  static culinary = {
    levels: {
      view: "CULINARY_LEVEL_VIEW",
      update: "CULINARY_LEVEL_UPDATE",
      delete: "CULINARY_LEVEL_DELETE",
    },
    categories: {
      view: "CULINARY_CATEGORY_VIEW",
      update: "CULINARY_CATEGORY_UPDATE",
      delete: "CULINARY_CATEGORY_DELETE",
    },
    ratings: {
      view: "CULINARY_RATING_VIEW",
      update: "CULINARY_RATING_UPDATE",
      delete: "CULINARY_RATING_DELETE",
    },
    recipes: {
      view: "CULINARY_RECIPE_VIEW",
      update: "CULINARY_RECIPE_UPDATE",
      delete: "CULINARY_RECIPE_DELETE",
    },
  };
  static institutional = {
    newsletters: {
      view: "INSTITUTIONAL_NEWSLETTER_VIEW",
      update: "INSTITUTIONAL_NEWSLETTER_UPDATE",
      delete: "INSTITUTIONAL_NEWSLETTER_DELETE",
    },
  };
  static publicity = {
    banners: {
      view: "PUBLICITY_BANNER_VIEW",
      update: "PUBLICITY_BANNER_UPDATE",
      delete: "PUBLICITY_BANNER_DELETE",
    },
    categories: {
      view: "PUBLICITY_CATEGORY_VIEW",
      update: "PUBLICITY_CATEGORY_UPDATE",
      delete: "PUBLICITY_CATEGORY_DELETE",
    },
  };
  static timesheets = {
    clients: {
      view: "TIMESHEET_CLIENT_VIEW",
      update: "TIMESHEET_CLIENT_UPDATE",
      delete: "TIMESHEET_CLIENT_DELETE",
    },
    projects: {
      view: "TIMESHEET_PROJECT_VIEW",
      update: "TIMESHEET_PROJECT_UPDATE",
      delete: "TIMESHEET_PROJECT_DELETE",
    },
    epics: {
      view: "TIMESHEET_EPIC_VIEW",
      update: "TIMESHEET_EPIC_UPDATE",
      delete: "TIMESHEET_EPIC_DELETE",
    },
    pbisStatus: {
      view: "TIMESHEET_PBISTATUS_VIEW",
      update: "TIMESHEET_PBISTATUS_UPDATE",
      delete: "TIMESHEET_PBISTATUS_DELETE",
    },
    pbis: {
      view: "TIMESHEET_PBI_VIEW",
      update: "TIMESHEET_PBI_UPDATE",
      delete: "TIMESHEET_PBI_DELETE",
    },
  };
  static webeditor = {
    companies: {
      view: "WEBEDITOR_COMPANY_VIEW",
      update: "WEBEDITOR_COMPANY_UPDATE",
      delete: "WEBEDITOR_COMPANY_DELETE",
    },
    modules: {
      view: "WEBEDITOR_MODULE_VIEW",
      update: "WEBEDITOR_MODULE_UPDATE",
      delete: "WEBEDITOR_MODULE_DELETE",
    },
    roles: {
      view: "WEBEDITOR_ROLE_VIEW",
      update: "WEBEDITOR_ROLE_UPDATE",
      delete: "WEBEDITOR_ROLE_DELETE",
    },
    users: {
      view: "WEBEDITOR_USER_VIEW",
      update: "WEBEDITOR_USER_UPDATE",
      delete: "WEBEDITOR_USER_DELETE",
    },
  };
}
