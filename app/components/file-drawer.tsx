type DrawerFile = {
  id: string;
  name: string;
  isDirty?: boolean;
};

type FileDrawerProps = {
  open: boolean;
  files: DrawerFile[];
  activeFileId: string;
  onClose: () => void;
  onSelect: (fileId: string) => void;
  onCreate: () => void;
  onRename: (fileId: string, nextName: string) => void;
};

export function FileDrawer({
  open,
  files,
  activeFileId,
  onClose,
  onSelect,
  onCreate,
  onRename,
}: FileDrawerProps) {
  return (
    <>
      <div
        className={`drawer-overlay ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`file-drawer ${open ? "is-open" : ""}`}>
        <div className="file-drawer-header">
          <h2>Files</h2>
          <button type="button" className="ghost-button" onClick={onCreate}>
            New
          </button>
        </div>
        <div className="file-list">
          {files.map((file) => (
            <div
              key={file.id}
              className={`file-item ${file.id === activeFileId ? "is-active" : ""}`}
            >
              <button
                type="button"
                className="file-item-main"
                onClick={() => onSelect(file.id)}
              >
                <span>{file.name}</span>
                {file.isDirty ? <span className="dirty-indicator">*</span> : null}
              </button>

              <button
                type="button"
                className="mini-button"
                onClick={() => {
                  const nextName = window.prompt("Rename file", file.name);
                  if (!nextName) {
                    return;
                  }

                  onRename(file.id, nextName);
                }}
              >
                Rename
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
