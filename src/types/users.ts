export type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
};

export type UserTypeWithPermissions = UserType & permissionsType;

export type permissionsType = { permissions: string[] };
