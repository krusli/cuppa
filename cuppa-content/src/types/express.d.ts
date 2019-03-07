declare module 'express' {

    // https://stackoverflow.com/a/51114250
    export interface Request {
        data?: {
            groups?: Array<import("../models/HydratedGroup").default>,
            group?: import("../models/HydratedGroup").default,
            users?: import("../models/UsersMap").default
        },

        body: any,
        params: any
    }

}