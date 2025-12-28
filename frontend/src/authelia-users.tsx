import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Page, PageSection } from "@patternfly/react-core";

// Import both PatternFly CSS files
// patternfly-base.css contains design tokens (--pf-t--global--* variables)
// patternfly.css contains component styles that reference those tokens
// Both are required for proper styling!
import "@patternfly/patternfly/patternfly-base.css";
import "@patternfly/patternfly/patternfly.css";

// Import dark theme support (must be after PatternFly CSS)
import "./dark-theme";

// Import our custom CSS overrides LAST so they take precedence over PatternFly defaults
import "./authelia-users.css";

import { UserListView } from "./views/UserListView";
import { UserFormView } from "./views/UserFormView";

type ViewState = { type: "list" } | { type: "create" } | { type: "edit"; userId: string };

function App() {
  const [view, setView] = useState<ViewState>({ type: "list" });

  const handleCreateUser = () => setView({ type: "create" });
  const handleEditUser = (userId: string) => setView({ type: "edit", userId });
  const handleBack = () => setView({ type: "list" });

  return (
    <Page id="authelia-users" className="pf-m-no-sidebar">
      <PageSection hasBodyWrapper={false}>
        {view.type === "list" && (
          <UserListView onCreateUser={handleCreateUser} onEditUser={handleEditUser} />
        )}
        {view.type === "create" && (
          <UserFormView mode="create" onSave={handleBack} onCancel={handleBack} />
        )}
        {view.type === "edit" && (
          <UserFormView
            mode="edit"
            userId={view.userId}
            onSave={handleBack}
            onCancel={handleBack}
          />
        )}
      </PageSection>
    </Page>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
