import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'movies'})
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column()
    releaseYear: number;

    @Column({nullable: true})
    director: string;

    @Column({ nullable: true })
    rating: string;
}