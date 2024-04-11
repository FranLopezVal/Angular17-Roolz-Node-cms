export class MenuList {
    public id: number = 0;
    public text: string = '';
    public icon?: string = '';
    public child?: MenuList[] = [];
    public levelChild: number = 0;
    public action = () => {};
}