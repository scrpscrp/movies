import { formsInterface } from "./form.interface";

export interface TvDetailsInterface {
adult: boolean;
backdrop_path: string;
created_by: object;
episode_run_time: object;
first_air_date: string;
genres: formsInterface[];
homepage: string;
id: number;
in_production: boolean;
languages: object;
last_air_date: string;
last_episode_to_air: object;
name: string;
networks: object;
next_episode_to_air: object;
number_of_episodes: number;
number_of_seasons: number;
origin_country: object;
original_language: string;
original_name: string;
overview: string;
popularity: number;
poster_path: string;
production_companies: object;
production_countries: object;
seasons: object;
spoken_languages: object;
status: string;
tagline: string;
type: string;
vote_average: number;
vote_count: number;
}