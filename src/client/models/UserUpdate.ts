/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRoleStatus } from './UserRoleStatus';

export type UserUpdate = {
    nickname: string;
    roles: Array<UserRoleStatus>;
};

