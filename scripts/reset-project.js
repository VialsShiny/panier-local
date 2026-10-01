#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It resets application source folders and recreates the default Expo Router structure.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "services", "utils", "constants"];
const exampleDir = "example";
const newAppDir = "app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pickup/[id]" options={{ title: "Pickup" }} />
    </Stack>
  );
}
`;

const tabsLayoutContent = `import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="scan" options={{ title: "Scan" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
`;

const placeholderContent = (title) => `import { Text, View } from "react-native";

export default function Screen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>${title}</Text>
    </View>
  );
}
`;

const routeFiles = [
  ["index.jsx", indexContent],
  ["_layout.jsx", layoutContent],
  ["(tabs)/_layout.jsx", tabsLayoutContent],
  ["(tabs)/index.jsx", placeholderContent("Edit app/(tabs)/index.jsx")],
  ["(tabs)/map.jsx", placeholderContent("Map")],
  ["(tabs)/scan.jsx", placeholderContent("Scan")],
  ["(tabs)/profile.jsx", placeholderContent("Profile")],
  [
    "pickup/[id].jsx",
    `import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PickupDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pickup {id}</Text>
    </View>
  );
}
`,
  ],
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Create the app-example directory
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move old directories to new app-example directory or delete them
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    await fs.promises.mkdir(path.join(root, newAppDir), { recursive: true });
    for (const directory of ["(tabs)", "pickup"]) {
      await fs.promises.mkdir(path.join(root, newAppDir, directory), { recursive: true });
    }
    for (const directory of ["components", "hooks", "services", "utils", "constants"]) {
      await fs.promises.mkdir(path.join(root, directory), { recursive: true });
    }
    for (const [file, content] of routeFiles) {
      await fs.promises.writeFile(path.join(root, newAppDir, file), content);
    }
    console.log("\n📁 Default app structure created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/(tabs)/index.jsx to edit the main screen.\n3. Put screens in /app and shared code in /components, /hooks, /services, /utils, or /constants.${
        userInput === "y"
          ? `\n4. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  "Do you want to move existing files to /example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);
