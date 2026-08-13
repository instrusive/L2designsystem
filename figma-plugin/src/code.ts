import { syncVariables } from "./variables";
import { syncTextStyles } from "./text-styles";
import { syncIcons } from "./icons";
import { syncComponents } from "./components";

figma.showUI(__html__, { width: 360, height: 420 });

function log(msg: string): void {
  figma.ui.postMessage({ type: "log", message: msg });
}

figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type !== "sync") return;

  try {
    log("Syncing colors, radius, and spacing variables...");
    const vars = await syncVariables(log);

    log("Syncing text styles...");
    const textStyles = await syncTextStyles(log);

    log("Building icon library...");
    const { nextY: afterIcons, components: icons } = await syncIcons(vars, 0, log);

    log("Building components (existing ones are left untouched)...");
    await syncComponents(vars, textStyles, icons, afterIcons, log);

    log("Done.");
    figma.ui.postMessage({ type: "done" });
    figma.notify("L2 Design System synced.");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`Error: ${message}`);
    figma.ui.postMessage({ type: "done" });
    figma.notify(`Sync failed: ${message}`, { error: true });
  }
};
