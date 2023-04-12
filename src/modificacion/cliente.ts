import * as net from "net";

const command = process.argv[2];
const args_command = process.argv.slice(3);

const client = net.connect({ port: 8080 }, () => {
  console.log("Connected to server!");

  client.write(
    JSON.stringify({
      type: "command",
      command: command,
      args: args_command,
    })
  );

  let output = "";
  client.on("data", (dataJson) => {
    const data = JSON.parse(dataJson.toString());
    console.log(data.stdout);
  });

  client.on("end", () => {
    console.log("Disconnected from server");
  });
});
