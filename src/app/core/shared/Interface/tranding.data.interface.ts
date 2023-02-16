import { TrandingInterface } from "./tranding.interface";
export interface TrandingDataInterface {
    page: number;
    results: TrandingInterface[];
    totalPages: number;
    totalResults: number;
}