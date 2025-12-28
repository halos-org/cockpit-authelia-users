import { createRoot } from "react-dom/client";
import { useState } from "react";
import "@patternfly/patternfly/patternfly.css";
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
    <div className="pf-v6-c-page">
      <main className="pf-v6-c-page__main">
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
      </main>
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
