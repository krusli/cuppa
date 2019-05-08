declare module UsersService {
    function getUser(req: any, res: any, username: string): Promise<any>;

    function getUserMe(req: any, res: any): Promise<any>;

    function getUsers(req: any, res: any, userIds: Array<String>): Promise<any>;
}

export = UsersService;