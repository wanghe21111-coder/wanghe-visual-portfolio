import { createReadStream, existsSync, statSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "out");
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const cleanPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");

  const candidates = [];

  if (cleanPath === "/" || cleanPath === ".") {
    candidates.push(path.join(root, "index.html"));
  } else {
    const withoutSlash = cleanPath.replace(/^[/\\]/, "");
    candidates.push(path.join(root, withoutSlash));
    candidates.push(path.join(root, `${withoutSlash}.html`));
    candidates.push(path.join(root, withoutSlash, "index.html"));
  }

  return candidates.find((candidate) => {
    const relative = path.relative(root, candidate);
    return relative && !relative.startsWith("..") && existsSync(candidate) && statSync(candidate).isFile();
  });
}

const server = createServer(async (request, response) => {
  const filePath = resolvePath(request.url ?? "/");

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(path.join(root, "404.html")).pipe(response);
    return;
  }

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      createReadStream(path.join(root, "404.html")).pipe(response);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
      "Cache-Control": "no-store"
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Preview server error");
  }
});

server.listen(port, host, () => {
  console.log(`Static preview ready at http://127.0.0.1:${port}`);
  console.log(`Also available at http://localhost:${port}`);
});
