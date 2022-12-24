/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RoleSchema = {
    /**
     * 状态 1有效 9 删除 5选中
     */
    status?: number;
    /**
     * 角色名称
     */
    role_name: string;
    /**
     * 描述
     */
    desc?: string | null;
    /**
     * 菜单 id 列表
     */
    menu_ids: Array<number>;
};

