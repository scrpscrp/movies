import { formsInterface } from "./form.interface";
export interface KnownForInterface {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: formsInterface[];
    id: number;
    media_type: string;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    title: string;
}