import { IRatingRecipesRepository } from "@application/interface/repository/culinary/IRatingRecipesRepository";
import { IRatingDelete } from "@application/interface/usecase/culinary/ratingRecipes";
import { Messages } from "@application/messages/Messages";
import { RatingRecipesDto } from "@domain/dto/culinary/RatingRecipesDto";
import { inject, injectable } from "tsyringe";

@injectable()
export class RatingDelete implements IRatingDelete {
  constructor(
    @inject("IRatingRecipesRepository")
    readonly _ratingRepository: IRatingRecipesRepository
  ) {}

  async executeAsync(id: string, company: string) {
    const rating = await this._ratingRepository.getByIdAsync(id, company)!;
    if (rating === null) {
      throw new Error(Messages.notFound("Rating"));
    }
    await this._ratingRepository.deleteAsync(rating, new Date());
    return new RatingRecipesDto(rating);
  }
}
