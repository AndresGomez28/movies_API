import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { MoviesService } from "../services/movies.service";
import { ApiQuery } from "@nestjs/swagger";

@Controller('api/movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get('getAll')
    async getAllMovies() {
        return this.moviesService.getAllMovies();
    }
    
    @Get()
    @ApiQuery({ name: 'title', required: true, description: 'Search query' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'limit', required: false, description: 'Results per page', type: Number })    async searchMovies(
        @Query('title') title: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        if (!title) {
            throw new BadRequestException('Query parameter "title" is required');
        }

        return this.moviesService.search(title, page, limit);
    }
}
