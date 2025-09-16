export interface RolFormPermission {
  id: number;
  rolid: number;
  formid: number;
  permissionid: number;
  permissionName: string;
  rolName: string;
  formName: string;
}

export interface RolFormPermissionDisplay {
  permissionName: string;
  rolName: string;
  formName: string;
}

export interface CreateRolFormPermission {
  rolName: string;
  formName: string;
  permissionName: string;
}

export interface UpdateRolFormPermission {
  id: number;
  rolName: string;
  formName: string;
  permissionName: string;
}