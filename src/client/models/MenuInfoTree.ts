/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MenuInfoTree = {
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
     * 名称
     */
    name?: string | null;
    /**
     * 菜单图标
     */
    icon?: string | null;
    /**
     * 菜单url
     */
    path?: string | null;
    /**
     * 菜单类型 0目录 1组件 2按钮 3数据
     */
    type: number;
    /**
     * 组件地址
     */
    component?: string | null;
    /**
     * 父id
     */
    pid?: number | null;
    /**
     * 权限标识 user:add
     */
    identifier?: string | null;
    /**
     * 接口地址
     */
    api?: string | null;
    /**
     * 接口请求方式
     */
    method?: string | null;
    children?: Array<MenuInfoTree>;
};

