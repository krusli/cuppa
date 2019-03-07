declare module GroupsService {
    function getGroup(req: import('express').Request, 
                      res: import('express').Response, 
                      groupId: any): Promise<any>;

    function getGroups(req: import('express').Request, 
                       res: import('express').Response): Promise<any>;

    function getGroupsMe(req: import('express').Request, 
                       res: import('express').Response): Promise<any>;

    function getMeetupsForGroup(req: import('express').Request, 
                                res: import('express').Response,
                                groupId: string): Promise<any>;

    function joinGroup(req: import('express').Request, 
                       res: import('express').Response, groupId: string): Promise<any>;
}

export = GroupsService