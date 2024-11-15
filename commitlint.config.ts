export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", ["sentence-case"]],
    "type-enum": [
      2,
      "always",
      [
        // Changes that affect the build system
        "build",
        // Changes to CI workflows
        "ci",
        // Dependency-only changes
        "deps",
        // Documentation-only changes
        "docs",
        // A new feature
        "feat",
        // A bug fix
        "fix",
        // A code change that improves performance
        "perf",
        // A code change that neither fixes a bug nor adds a feature
        "refactor",
        // Used for automated releases-only
        "release",
        // A commit that reverts a previous commit
        "revert",
        // Changes that do not affect the meaning of the code
        "style",
        // Adding missing tests or correcting existing tests
        "test",
      ],
    ],
  },
};
