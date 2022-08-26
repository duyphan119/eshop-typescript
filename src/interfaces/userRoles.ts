import React from "react";
import { ExtraPayloadType } from "./common";
import { Role } from "./role";
import { User } from "./user";
export interface UserRole {
  key?: string | number | React.Key;
  id: number;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
  roleId: number;
  user?: User;
  role?: Role;
}
export interface UserRolePayload extends ExtraPayloadType {}
