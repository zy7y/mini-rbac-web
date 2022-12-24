/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserOut = {
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
     * 账号
     */
    username: string;
    /**
     * 昵称
     */
    nickname: string;
};

