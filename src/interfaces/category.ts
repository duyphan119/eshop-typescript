import React from "react";

export interface Category {
  key?: string | number | React.Key;

  id: number;

  parentId: number | null;

  slug: string;

  title: string;

  createdAt: string;

  updatedAt: string;

  sku: string;

  parent?: null | Category;

  children?: Category[];
}
