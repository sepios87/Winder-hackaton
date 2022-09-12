import { Directus } from "@directus/sdk";
import {environment} from "../environments/environment";

export const directus: Directus<any> = new Directus<any>(environment.apiURL, {
    auth: {
        staticToken: environment.staticToken
    }
});
