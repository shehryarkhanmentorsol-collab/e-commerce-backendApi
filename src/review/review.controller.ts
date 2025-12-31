import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuards } from "src/auth/guards/jwt-auth.guard";
import { ReviewsService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";

@UseGuards(JwtAuthGuards)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateReviewDto) {
    console.log('REQ.USER:', req.user);
    return this.reviewsService.createReview(req.user.id, dto);
  }
}

