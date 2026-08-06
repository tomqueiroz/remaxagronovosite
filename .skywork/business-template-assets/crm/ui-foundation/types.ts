import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type CrmNavigationItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
};

export type CrmSiteOption = { id: string; label: string };

export type CrmMetric = { label: string; value: string; detail?: string };

export type CrmTrendPoint = { label: string; value: number };

export type CrmStatusSlice = { label: string; value: number; color?: string };

export type CrmTableColumn<Row> = {
  id: string;
  label: string;
  className?: string;
  render: (row: Row) => ReactNode;
};

export type CrmPaginationState = {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
};
