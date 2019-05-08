declare module ActivityService {
    function getActivityForGroup(req: any, res: any, groupId: string): Promise<any>;
    function newActivity(req: any, res: any, activity: any): Promise<any>;
}

export = ActivityService