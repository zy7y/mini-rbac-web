/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { MenuIn } from '../models/MenuIn';
import type { R } from '../models/R';
import type { R_List_schemas_menu_MenuInfoTree__ } from '../models/R_List_schemas_menu_MenuInfoTree__';
import type { R_MenuOut_ } from '../models/R_MenuOut_';
import type { R_PageResult_List_abc_RoleOut___ } from '../models/R_PageResult_List_abc_RoleOut___';
import type { R_PageResult_List_abc_UserOut___ } from '../models/R_PageResult_List_abc_UserOut___';
import type { R_RoleInfo_ } from '../models/R_RoleInfo_';
import type { R_Union_Token__NoneType__ } from '../models/R_Union_Token__NoneType__';
import type { R_Union_UserDetail__NoneType__ } from '../models/R_Union_UserDetail__NoneType__';
import type { ResetPass } from '../models/ResetPass';
import type { RoleSchema } from '../models/RoleSchema';
import type { UserSchema } from '../models/UserSchema';
import type { UserUpdate } from '../models/UserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class Service {

    /**
     * θεπ²
     * θεεθ‘¨-tree
     * :return:
     * @returns R_List_schemas_menu_MenuInfoTree__ Successful Response
     * @throws ApiError
     */
    public static queryMenuMenuGet(): CancelablePromise<R_List_schemas_menu_MenuInfoTree__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/menu',
        });
    }

    /**
     * εε»Ίθε
     * ζ°ε’θε
     * :param menu_schema:
     * :return:
     * @param requestBody
     * @returns R_MenuOut_ Successful Response
     * @throws ApiError
     */
    public static addMenuMenuPost(
        requestBody: MenuIn,
    ): CancelablePromise<R_MenuOut_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/menu',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ζ΄ζ°θε
     * ζ΄ζ°θε
     * :param id:
     * :param menu_schema:
     * :return:
     * @param id
     * @param requestBody
     * @returns R_MenuOut_ Successful Response
     * @throws ApiError
     */
    public static editMenuMenuIdPut(
        id: number,
        requestBody: MenuIn,
    ): CancelablePromise<R_MenuOut_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/menu/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ε ι€θε
     * ε ι€θε
     * :param id:
     * :return:
     * ι»θΎε ι€ δΏ?ζΉηΆζ
     * @param id
     * @returns R Successful Response
     * @throws ApiError
     */
    public static delMenuMenuIdDelete(
        id: number,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/menu/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * θ§θ²εθ‘¨
     * @param offset
     * @param limit
     * @param status
     * @param ordering
     * @param name
     * @returns R_PageResult_List_abc_RoleOut___ Successful Response
     * @throws ApiError
     */
    public static queryRoleRoleGet(
        offset: number = 1,
        limit: number = 10,
        status: number = 1,
        ordering: string = '-created',
        name: string = '',
    ): CancelablePromise<R_PageResult_List_abc_RoleOut___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/role',
            query: {
                'offset': offset,
                'limit': limit,
                'status': status,
                'ordering': ordering,
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ζ°ε’θ§θ²
     * @param requestBody
     * @returns R Successful Response
     * @throws ApiError
     */
    public static addRoleRolePost(
        requestBody: RoleSchema,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/role',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * θ§θ²δΏ‘ζ―οΌζιοΌ
     * @param id
     * @returns R_RoleInfo_ Successful Response
     * @throws ApiError
     */
    public static getRoleRoleIdGet(
        id: number,
    ): CancelablePromise<R_RoleInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/role/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ηΌθΎθ§θ²
     * @param id
     * @param requestBody
     * @returns R Successful Response
     * @throws ApiError
     */
    public static editRoleRoleIdPut(
        id: number,
        requestBody: RoleSchema,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/role/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ε ι€θ§θ²
     * @param id
     * @returns R Successful Response
     * @throws ApiError
     */
    public static delRoleRoleIdDelete(
        id: number,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/role/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * η¨ζ·εθ‘¨
     * @param offset
     * @param limit
     * @param status
     * @param ordering
     * @param username
     * @param nickname
     * @returns R_PageResult_List_abc_UserOut___ Successful Response
     * @throws ApiError
     */
    public static queryUserUserGet(
        offset: number = 1,
        limit: number = 10,
        status: number = 1,
        ordering: string = '-created',
        username: string = '',
        nickname: string = '',
    ): CancelablePromise<R_PageResult_List_abc_UserOut___> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            query: {
                'offset': offset,
                'limit': limit,
                'status': status,
                'ordering': ordering,
                'username': username,
                'nickname': nickname,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * η¨ζ·ζ°ε’
     * @param requestBody
     * @returns R Successful Response
     * @throws ApiError
     */
    public static addUserUserPost(
        requestBody: UserSchema,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * η¨ζ·δΏ‘ζ―
     * @param id
     * @returns R_Union_UserDetail__NoneType__ Successful Response
     * @throws ApiError
     */
    public static getUserUserIdGet(
        id: number,
    ): CancelablePromise<R_Union_UserDetail__NoneType__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * η¨ζ·ζ΄ζ°
     * @param id
     * @param requestBody
     * @returns R Successful Response
     * @throws ApiError
     */
    public static editUserUserIdPut(
        id: number,
        requestBody: UserUpdate,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ε ι€η¨ζ·
     * @param id
     * @returns R Successful Response
     * @throws ApiError
     */
    public static delUserUserIdDelete(
        id: number,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * εζ’θ§θ²
     * @param id
     * @returns R Successful Response
     * @throws ApiError
     */
    public static changeRoleUserRoleIdPatch(
        id: number,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/role/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * ιη½?ε―η 
     * @param requestBody
     * @returns R Successful Response
     * @throws ApiError
     */
    public static resetPasswordUserResetPatch(
        requestBody: ResetPass,
    ): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/reset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * η»ε½
     * @param requestBody
     * @returns R_Union_Token__NoneType__ Successful Response
     * @throws ApiError
     */
    public static loginLoginPost(
        requestBody: Login,
    ): CancelablePromise<R_Union_Token__NoneType__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
