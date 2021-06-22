export interface offDutyData {
  date: string;
  status: string;
}

export interface devOpsData {
  date: string;
  task: Record<string, any>[];
  type: string[];
}

export interface typeColorMapping {
  /**
   * 优先级
   */
  priority: string[];
  /**
   * 映射关系
   */
  mapping: Record<string, string>;
}
