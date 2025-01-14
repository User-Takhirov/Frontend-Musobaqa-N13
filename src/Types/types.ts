import React from "react";

export interface TableTypes {
  key?: number | string;
  name?: string;
  age?: number;
  address?: string;
  dataIndex?: number;
}
export interface columnType {
  title?: string;
  dataIndex?: string;
  key?: string;
  width?: string;
  align?: any;
  fontWeight?: any;
  render?: any;
}

export interface TaskType {
  id?: number | string;
  name?: string;
  type?: string;
}
export interface DataSourceType {
  key: string | number;
  id: string | number;
  name: string;
  type: string;
  email: string;
  title: string;
  tasks: string;
  status?: string;
  address?: string;
}
export interface AssignmentType {
  name?: string;
  id?: number | string;
  type?: string;
  key?: number | string;
}

export interface FormTypes {
  closeModal: (arg0: boolean) => void | any;
}

export interface HodimCreateTypes {
  id?: string | number;
  name?: string;
  last_name?: string;
  email?: string;
  type?: string;
}

export interface HodimFormTypes {
  onFinishFailed?: (errorInfo: React.ErrorInfo | any) => void;
  submit: (data: HodimCreateTypes) => void;
  initialValues?: any;
}
export interface CustomModalTypes {
  open: () => void | string;
  onOk: () => void | string;
  onCancel: () => void | string;
  title: string;
  children: React.ReactNode;
}
