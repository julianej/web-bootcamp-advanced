
type TreeNode = FileNode | FolderNode;

type FileNode = {
  name: string;
  size: number;
  children?: FileNode[];
};

type FolderNode = { 
    name: string; 
    children: TreeNode[] };

const root: FolderNode = {
  name: "project",
  children: [
    { name: "README.md", size: 2 },
    {
      name: "src",
      children: [
        { name: "main.ts", size: 4 },
        { name: "utils", children: [{ name: "format.ts", size: 1 }] },
      ],
    },
    { name: "assets", children: [{ name: "logo.svg", size: 12 }] },
  ],
};

function totalSize(node: FileNode): number {
  // A file has no children, so return its size.
  if (!node.children) {
    return node.size;
  }

  // Add the sizes of all children.
  return node.children.reduce(
    (total, child) => total + totalSize(child),
    0
  );
}


function height(node: FileNode): number {
  if (!node.children || node.children.length === 0) {
    return 0;
  }

  return 1 + Math.max(
    ...node.children.map(child => height(child))
  );
}

function findPath(
  node: FileNode,
  name: string,
  path = ""
): string | undefined {
  const currentPath = `${path}/${node.name}`;

  if (node.name === name) {
    return currentPath;
  }

  if (node.children) {
    for (const child of node.children) {
      const result = findPath(child, name, currentPath);

      if (result !== undefined) {
        return result;
      }
    }
  }

  return undefined;
}