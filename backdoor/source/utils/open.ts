import { exec } from "child_process";

export function openUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = `open ${url}`;
    exec(command, (error) => {
      if (error) reject(error);
      resolve(`Opening: ${url}`);
    });
  });
}
