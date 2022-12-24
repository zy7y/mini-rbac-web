/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRoleStatus } from './UserRoleStatus';

export type UserSchema = {
    /**
     * 状态 1有效 9 删除 5选中
     */
    status?: number;
    /**
     * 账号
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 昵称
     */
    nickname: string;
    roles: Array<UserRoleStatus>;
};

