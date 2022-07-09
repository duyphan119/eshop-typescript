import React from "react";

export interface User {
  key?: string | number | React.Key;

  id: number;

  email: string;

  fullName: string;

  telephone: string;

  city?: string;

  district?: string;

  ward?: string;

  address?: string;

  isAdmin: boolean;
}
