import React from "react";
import { ExtraPayloadType } from "./common";
import { UserRole } from "./userRoles";
export interface Role {
  key?: string | number | React.Key;
  id: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  userRoles?: UserRole[];
}
export interface RolePayload extends ExtraPayloadType {}
