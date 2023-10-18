import { toast } from "react-toastify";
import CustomException from "../../lib/CustomException";
import { post } from "../../lib/request";

export async function killProcesses(pids: Array<number>) {
  const body = {
    pids,
  };

  const { ok, data, message } = await post("/process/kill", body);

  if (!ok) throw new CustomException("Something went wrong");
  if (message) toast(message);

  return data;
}
