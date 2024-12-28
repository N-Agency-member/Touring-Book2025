// Types
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

export interface PrismaRequestBrokerConstructorParams {
    /** Review id */
    idOfReview: string;
    /** Either **destination** or **landmark** id */
    idOfElementAssociatedWithReview: string;
    authenticationResponse: GuardedAPIResponse;
}

export interface PrismaRequestBroker extends PrismaRequestBrokerConstructorParams {
    deleteRecord: () => Promise<void>;
}
