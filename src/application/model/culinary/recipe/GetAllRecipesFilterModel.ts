export class GetAllRecipesFilterModel {
  public total = 10;
  public orderBy = "created_at desc";
  public levelId?: string;
  public search?: string;
}
