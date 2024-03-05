import { Authenticator } from "remix-auth";
import { sessionStorage } from "./sessions.server";
import { User } from "./types";
import { AuthStrategies } from "./auth_strategies";
import { formStrategy } from "./auth_strategies/form.strategy";

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies];

export let authenticator = new Authenticator<User>(sessionStorage);

// Register your strategies below
authenticator.use(formStrategy, AuthStrategies.FORM);
