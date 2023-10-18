export interface Process {
  name: string;
  pid: number;
  ppid: number;
}

export interface APIResponse {
  ok: boolean;
  message: string;
  data: any | null;
}
