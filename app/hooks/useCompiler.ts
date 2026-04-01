"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createUserFile,
  getLanguages,
  getResult,
  getUserFiles,
  submitCode,
  updateUserFile,
} from "@/lib/api";
import type { EditorFile, Language, PersistedCodeFile } from "@/app/types/compiler";

type UseCompilerState = {
  languages: Language[];
  files: EditorFile[];
  activeFileId: string;
  language: string;
  code: string;
  stdin: string;
  output: string;
  loading: boolean;
  languageLoading: boolean;
  filesLoading: boolean;
  saving: boolean;
  canSave: boolean;
  saveLabel: string;
  setStdin: (value: string) => void;
  setCode: (value: string) => void;
  selectLanguage: (languageId: string) => void;
  selectFile: (fileId: string) => void;
  createFile: () => void;
  renameFile: (fileId: string, nextName: string) => void;
  saveActiveFile: () => Promise<void>;
  runCode: () => Promise<void>;
};

type UseCompilerParams = {
  isAuthenticated: boolean;
  authLoading: boolean;
  userEmail?: string;
};

const CODE_LIMIT = 100_000;
const POLL_INTERVAL_MS = 800;

function createLocalId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `tmp-${Date.now()}`;
}

function createDefaultFile(languageId: string, index = 1): EditorFile {
  return {
    id: createLocalId(),
    name: `untitled-${index}`,
    language: languageId,
    code: "",
    isDirty: false,
  };
}

export function useCompiler({
  isAuthenticated,
  authLoading,
  userEmail,
}: UseCompilerParams): UseCompilerState {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [files, setFiles] = useState<EditorFile[]>([]);
  const [activeFileId, setActiveFileId] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [languageLoading, setLanguageLoading] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadedUserRef = useRef<string>("");

  const activeFile = useMemo(
    () => files.find((file) => file.id === activeFileId),
    [activeFileId, files]
  );

  const activeLanguage = activeFile?.language || "";
  const activeCode = activeFile?.code || "";

  const canSave = isAuthenticated && Boolean(activeFile);
  const saveLabel = saving ? "Saving..." : "Save";

  const ensureActiveFile = useCallback((nextFiles: EditorFile[]) => {
    if (nextFiles.length === 0) {
      setActiveFileId("");
      return;
    }

    setActiveFileId((previousId) => {
      if (nextFiles.some((file) => file.id === previousId)) {
        return previousId;
      }

      return nextFiles[0].id;
    });
  }, []);

  useEffect(() => {
    if (files.length === 0) {
      return;
    }

    if (!activeFileId || !files.some((file) => file.id === activeFileId)) {
      setActiveFileId(files[0].id);
    }
  }, [activeFileId, files]);

  useEffect(() => {
    let cancelled = false;

    async function loadLanguages() {
      try {
        const res = await getLanguages();
        const backendLanguages: Language[] = res?.data?.languages || [];

        if (cancelled) {
          return;
        }

        setLanguages(backendLanguages);

        if (backendLanguages.length > 0) {
          const first = backendLanguages[0];
          setFiles((previous) => {
            if (previous.length > 0) {
              return previous;
            }

            return [createDefaultFile(first.id)];
          });
        } else {
          setOutput("No languages available.");
        }
      } catch {
        if (!cancelled) {
          setOutput("Failed to load languages.");
        }
      } finally {
        if (!cancelled) {
          setLanguageLoading(false);
        }
      }
    }

    void loadLanguages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (languageLoading || authLoading || languages.length === 0) {
      return;
    }

    let cancelled = false;

    async function loadUserFiles() {
      if (!isAuthenticated || !userEmail) {
        loadedUserRef.current = "";
        setFiles((previous) => {
          if (previous.length > 0) {
            return previous;
          }

          return [createDefaultFile(languages[0].id)];
        });
        return;
      }

      if (loadedUserRef.current === userEmail) {
        return;
      }

      try {
        setFilesLoading(true);
        const response = await getUserFiles();
        const remoteFiles: PersistedCodeFile[] = response?.files || [];

        if (cancelled) {
          return;
        }

        if (remoteFiles.length === 0) {
          const initial = [createDefaultFile(languages[0].id)];
          setFiles(initial);
          ensureActiveFile(initial);
        } else {
          const mapped: EditorFile[] = remoteFiles.map((file) => ({
            id: file.id,
            dbId: file.id,
            name: file.name,
            language: file.language,
            code: file.code,
            isDirty: false,
          }));

          setFiles(mapped);
          ensureActiveFile(mapped);
        }

        loadedUserRef.current = userEmail;
      } catch {
        if (!cancelled) {
          setOutput("Failed to load saved files.");
        }
      } finally {
        if (!cancelled) {
          setFilesLoading(false);
        }
      }
    }

    void loadUserFiles();

    return () => {
      cancelled = true;
    };
  }, [
    authLoading,
    ensureActiveFile,
    isAuthenticated,
    languageLoading,
    languages,
    userEmail,
  ]);

  const setCode = useCallback((value: string) => {
    setFiles((previous) =>
      previous.map((file) =>
        file.id === activeFileId
          ? {
              ...file,
              code: value,
              isDirty: true,
            }
          : file
      )
    );
  }, [activeFileId]);

  const selectLanguage = useCallback((languageId: string) => {
    setFiles((previous) =>
      previous.map((file) =>
        file.id === activeFileId
          ? {
              ...file,
              language: languageId,
              isDirty: true,
            }
          : file
      )
    );
  }, [activeFileId]);

  const selectFile = useCallback((fileId: string) => {
    setActiveFileId(fileId);
    setOutput("");
  }, []);

  const createFile = useCallback(() => {
    const defaultLanguage = activeLanguage || languages[0]?.id || "";

    if (!defaultLanguage) {
      return;
    }

    setFiles((previous) => {
      const created = createDefaultFile(defaultLanguage, previous.length + 1);
      const nextFiles = [created, ...previous];
      setActiveFileId(created.id);
      return nextFiles;
    });
  }, [activeLanguage, languages]);

  const renameFile = useCallback((fileId: string, nextName: string) => {
    const sanitized = nextName.trim().slice(0, 80);
    if (!sanitized) {
      return;
    }

    setFiles((previous) =>
      previous.map((file) =>
        file.id === fileId
          ? {
              ...file,
              name: sanitized,
              isDirty: true,
            }
          : file
      )
    );
  }, []);

  const saveActiveFile = useCallback(async () => {
    if (!isAuthenticated || !activeFile) {
      setOutput("Sign in to save files to your account.");
      return;
    }

    const payload = {
      name: activeFile.name,
      language: activeFile.language,
      code: activeFile.code,
    };

    try {
      setSaving(true);
      const response = activeFile.dbId
        ? await updateUserFile(activeFile.dbId, payload)
        : await createUserFile(payload);

      const saved = response?.file as PersistedCodeFile | undefined;
      if (!saved) {
        setOutput("Unexpected save response.");
        return;
      }

      setFiles((previous) =>
        previous.map((file) =>
          file.id === activeFile.id
            ? {
                ...file,
                id: saved.id,
                dbId: saved.id,
                name: saved.name,
                language: saved.language,
                code: saved.code,
                isDirty: false,
              }
            : file
        )
      );

      setActiveFileId(saved.id);
      setOutput("Saved.");
    } catch {
      setOutput("Failed to save file.");
    } finally {
      setSaving(false);
    }
  }, [activeFile, isAuthenticated]);

  const runCode = useCallback(async () => {
    if (!activeLanguage) {
      return;
    }

    if (!activeCode) {
      return;
    }

    if (activeCode.length > CODE_LIMIT) {
      setOutput("Code exceeds 100KB limit.");
      return;
    }

    setLoading(true);
    setOutput("Submitting...");

    try {
      const submit = await submitCode({
        language: activeLanguage,
        code: activeCode,
        inputs: [stdin],
      });

      const jobId = submit?.data?.job_id;
      if (!jobId) {
        setOutput("Invalid response from server.");
        return;
      }

      let status = "QUEUED";
      let result: unknown;

      while (status === "QUEUED" || status === "RUNNING") {
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
        result = await getResult(jobId);
        status = (result as { data?: { status?: string } })?.data?.status || "FAILED";
      }

      const first = (result as { data?: { results?: Array<{ stdout?: string; stderr?: string }> } })?.data
        ?.results?.[0];

      if (first?.stdout) {
        setOutput(first.stdout);
      } else if (first?.stderr) {
        setOutput(first.stderr);
      } else {
        setOutput(`Execution finished with status: ${status}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setOutput(`Execution error. ${message}`.trim());
    } finally {
      setLoading(false);
    }
  }, [activeCode, activeLanguage, stdin]);

  return {
    languages,
    files,
    activeFileId,
    language: activeLanguage,
    code: activeCode,
    stdin,
    output,
    loading,
    languageLoading,
    filesLoading,
    saving,
    canSave,
    saveLabel,
    setStdin,
    setCode,
    selectLanguage,
    selectFile,
    createFile,
    renameFile,
    saveActiveFile,
    runCode,
  };
}
