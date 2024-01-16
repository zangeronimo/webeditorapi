import { RecipeDto } from "@domain/dto/culinary";

export class SeoService {
  private title = "MaisReceitas";
  private canonical = process.env.MAISRECEITAS_CANONICAL_URL;
  private description = "";
  private keywords =
    "receitas, culinária, modo de preparo, ingredientes, acompanhamentos, bebidas, carnes, dietas, doces, molhos, peixes, sopas, sem glúten, vegetariana, pães, bolos, tortas, sobremesas";
  private image = "";
  private recipe?: {
    rate: number;
    rateSize: number;
    recipe: RecipeDto;
    baseUrl: string;
  };

  setTitle = (title: string): void => {
    this.title = title;
  };

  setRecipeTitle = (title: string) => {
    this.title = `Receita de ${title} | MaisReceitas`;
  };

  setCategoryTitle = (level: string, category: string) => {
    this.title = `Receitas de ${level} / ${category} | MaisReceitas`;
  };

  setCanonical = (path: string) => {
    path = path.startsWith("/") ? path : `/${path}`;
    this.canonical = `${this.canonical}${path}`;
  };

  setDescription = (value: string) => {
    const regex = /(<([^>]+)>)/gi;
    this.description = value.replace(regex, "").substring(0, 250);
  };

  setImage = (baseUrl: string, url: string) => {
    url = url.startsWith("/") ? url : `/${url}`;
    this.image = `${baseUrl}${url}`;
  };

  setRecipe = (recipe: RecipeDto) =>
    (this.recipe = {
      rate: recipe.getRate() ?? 10,
      rateSize: recipe.ratings.length ?? 1,
      recipe: recipe,
      baseUrl: process.env.API_URL!,
    });
}
