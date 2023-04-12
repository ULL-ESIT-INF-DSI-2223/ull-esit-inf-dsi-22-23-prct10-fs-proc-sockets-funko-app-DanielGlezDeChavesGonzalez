import { spawn } from "child_process";
import * as net from "net";

const server = net
  .createServer((connection) => {
    console.log("Client connected");
    connection.on("data", (dataJson) => {
      const data = JSON.parse(dataJson.toString());
      console.log(data);
      const command = spawn(data.command, data.args);
      let output = "";
      command.stdout.on("data", (data) => {
        output += data;
      });
      command.on("close", () => {
        connection.write(
          JSON.stringify({
            type: "command",
            command: data.command,
            args: data.args,
            stdout: output,
          })
        );
        console.log("enviado");
      });
    });
    connection.on("close", () => {
      console.log("Client disconnected");
    });
  })
  .listen(8080, () => {
    console.log("Server listening on port 8080");
  });
