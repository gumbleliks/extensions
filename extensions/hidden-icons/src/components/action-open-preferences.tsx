import { Action, ActionPanel, Icon, openCommandPreferences } from "@raycast/api";

export function ActionOpenPreferences() {
  return (
    <ActionPanel.Section>
      <Action
        icon={Icon.Gear}
        title="Open Extension Preferences"
        shortcut={{ modifiers: ["cmd"], key: "," }}
        onAction={openCommandPreferences}
      />
    </ActionPanel.Section>
  );
}
