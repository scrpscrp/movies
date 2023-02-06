import { trandingInterface } from "./tranding.interface";

export interface trandingDataInterface {
    page: number;
    results: trandingInterface[];
    totalPages: number;
    totalResults: number;
}