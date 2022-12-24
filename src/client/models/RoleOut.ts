/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RoleOut = {
    /**
     * 主键
     */
    id: number;
    /**
     * 状态 1有效 9 删除 5选中
     */
    status?: number;
    /**
     * 创建时间
     */
    readonly created?: string | null;
    /**
     * 更新时间
     */
    readonly modified?: string | null;
    /**
     * 角色名称
     */
    role_name: string;
    /**
     * 描述
     */
    desc?: string | null;
};

