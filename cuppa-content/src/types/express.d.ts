/**
 * Declaration file to extend Express's Request type
 * to handle additional properties added by our middleware.
 */

declare namespace Express {

    // https://stackoverflow.com/a/51114250
    interface Request {
        data?: {
            groups?: Array<import("../models/HydratedGroup").default>,
            group?: import("../models/HydratedGroup").default,
            // users?: import("../models/UsersMap").default
            users?: import('../models/User').default[]
        },

        body: any,
        params: any
    }

}