declare namespace Express {

    // https://stackoverflow.com/a/51114250
    export interface Request {
        data?: {
            groups?: Array<import("../models/HydratedGroup").default>,
            group?: import("../models/HydratedGroup").default,
            users?: import("../models/UsersMap").default
        },

        params: any
    }

}

