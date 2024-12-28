// Tools
import { prisma } from "@/prisma/db";
import CircumstancesValidator from "../../_abstracts/CircumstancesValidator";
// Types
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker } from "../@types";

export default class LandmarkReviewBroker extends CircumstancesValidator implements PrismaRequestBroker {
    public constructor(params: PrismaRequestBrokerConstructorParams) {
        super({
            modelType: "landmark",
            idOfReview: params.idOfReview,
            authenticationResponse: params.authenticationResponse,
            idOfElementAssociatedWithReview: params.idOfElementAssociatedWithReview,
            allowAdminsToDoThis: true,
        });
    }

    public async deleteRecord(): Promise<void> {
        await this.ensureThatRecordExistsAndUserIsEntitledToDoIndendedAction();
        await prisma.landmarkReview.deleteMany({
            where: {
                id: this.idOfReview,
                landmarkId: this.idOfElementAssociatedWithReview,
            },
        });
    }
}
