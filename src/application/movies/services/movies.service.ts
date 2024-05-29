import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Movie } from "src/domain/entities/movie.entity";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
    ) {}

    async getAllMovies(){
        let data = []
        try {
            data = await this.moviesRepository.find();
        } catch (error) {
            console.log(error);
        }
        return data;
    }

    async search(
        title: string,
        page: number = 1,
        limit: number = 10,
    ) {
        const skip = (page - 1) * limit;

        const [movies, total] = await this.moviesRepository.findAndCount({
            where: { title: ILike(`%${title}%`) },
            take: limit,
            skip,
        });

        console.log(`Found ${total} movies`);
        console.log(movies);
        

        const totalPages = Math.ceil(total / limit);

        return {
            movies,
            totalRecords: total,
            totalPages,
        };
    }
}
