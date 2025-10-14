import type {FormInputType} from "@/types/form-input.ts";

export const loginFormInputs: FormInputType[] = [
    {
        type: "email",
        kind: "email",
        name: "email",
        placeholder: "Enter email or username",
    },
    {
        type: "password",
        name: "password",
        kind: "password",
        placeholder: "Enter your password",
    }
];