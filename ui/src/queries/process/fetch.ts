import { toast } from "react-toastify";
import { get } from "../../lib/request";

export async function getProcess() {
  const { data } = await get("/process/all");
  get("/process/all");
  if (data) return data;
}
