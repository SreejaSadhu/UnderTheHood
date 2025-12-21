export interface DemoFrame {
  id: number;
  caption: string;
}

export interface DataStructure {
  slug: string;
  name: string;
  hook: string;
  what: string;
  why: string;
  advantages: string[];
  consequences: {
    whyItStopsWorking: string[];
    whatReplacesIt: string[];
  };
  demoFrames: DemoFrame[];
}

export const dataStructures: DataStructure[] = [
  {
    slug: "arrays",
    name: "Arrays",
    hook: "Indexed access as a design idea",
    what: "A contiguous block of memory where elements are stored sequentially and accessed by numeric index.",
    why: "To enable constant-time access to any element when you know its position.",
    advantages: [
      "O(1) random access by index",
      "Cache-friendly due to memory locality",
      "Simple mental model for ordered data",
      "Efficient iteration and bulk operations",
    ],
    consequences: {
      whyItStopsWorking: [
        "Insertions and deletions require shifting elements",
        "Fixed size in many implementations requires resizing",
      ],
      whatReplacesIt: [
        "Linked lists for frequent insertions",
        "Hash maps when key-based lookup matters more than order",
      ],
    },
    demoFrames: [
      { id: 1, caption: "Memory layout showing contiguous allocation of array elements." },
      { id: 2, caption: "Index-based access: jumping directly to element at position N." },
      { id: 3, caption: "The cost of insertion: shifting all elements after the insertion point." },
    ],
  },
  {
    slug: "stacks",
    name: "Stacks",
    hook: "Why last action wins",
    what: "A collection where elements are added and removed from the same end, following LIFO order.",
    why: "To manage state where the most recent action must be handled first.",
    advantages: [
      "O(1) push and pop operations",
      "Natural model for undo/redo patterns",
      "Efficient for recursive problem solving",
      "Minimal memory overhead",
    ],
    consequences: {
      whyItStopsWorking: [
        "No access to elements other than the top",
        "Cannot efficiently search or reorder",
      ],
      whatReplacesIt: [
        "Deques when both ends need access",
        "Priority queues when order isn't LIFO",
      ],
    },
    demoFrames: [
      { id: 1, caption: "Browser history: each new page pushed, back button pops." },
      { id: 2, caption: "Function call stack: nested calls push, returns pop." },
    ],
  },
  {
    slug: "queues",
    name: "Queues",
    hook: "Ordering work in real systems",
    what: "A collection where elements are added at one end and removed from the other, following FIFO order.",
    why: "To process items in the order they arrive, ensuring fairness.",
    advantages: [
      "O(1) enqueue and dequeue operations",
      "Fair ordering of requests",
      "Natural model for task scheduling",
      "Decouples producers from consumers",
    ],
    consequences: {
      whyItStopsWorking: [
        "No priority handling — urgent items wait their turn",
        "Unbounded growth if producers outpace consumers",
      ],
      whatReplacesIt: [
        "Priority queues when some items matter more",
        "Ring buffers when fixed memory is required",
      ],
    },
    demoFrames: [
      { id: 1, caption: "Print queue: documents processed in submission order." },
      { id: 2, caption: "Message broker: events queued for downstream services." },
      { id: 3, caption: "Task scheduler: background jobs awaiting worker threads." },
    ],
  },
  {
    slug: "linked-lists",
    name: "Linked Lists",
    hook: "Pointers over positions",
    what: "A sequence of nodes where each node points to the next, enabling dynamic size.",
    why: "To allow efficient insertions and deletions without shifting elements.",
    advantages: [
      "O(1) insertion/deletion at known positions",
      "Dynamic size with no resizing cost",
      "Simple node-based mental model",
    ],
    consequences: {
      whyItStopsWorking: [
        "O(n) access time — must traverse from head",
        "Poor cache locality due to scattered memory",
      ],
      whatReplacesIt: [
        "Arrays when random access matters",
        "Skip lists for faster search",
      ],
    },
    demoFrames: [
      { id: 1, caption: "Node structure: data plus pointer to next node." },
      { id: 2, caption: "Insertion: rewiring pointers without moving data." },
    ],
  },
  {
    slug: "hash-maps",
    name: "Hash Maps",
    hook: "Trading space for speed",
    what: "A key-value store using a hash function to compute storage positions.",
    why: "To achieve near-constant-time lookup by key regardless of collection size.",
    advantages: [
      "O(1) average-case lookup, insert, delete",
      "Flexible key types",
      "Foundation for caches and indexes",
    ],
    consequences: {
      whyItStopsWorking: [
        "Hash collisions degrade to O(n) in worst case",
        "No ordering of keys",
        "Memory overhead for sparse tables",
      ],
      whatReplacesIt: [
        "Balanced trees when order matters",
        "Bloom filters for approximate membership",
      ],
    },
    demoFrames: [
      { id: 1, caption: "Hash function mapping keys to bucket indices." },
      { id: 2, caption: "Collision resolution: chaining or open addressing." },
      { id: 3, caption: "Load factor and rehashing: when the table grows." },
    ],
  },
  {
    slug: "trees",
    name: "Trees",
    hook: "Hierarchy as structure",
    what: "A hierarchical collection with a root node and child nodes forming branches.",
    why: "To represent hierarchical relationships and enable efficient searching.",
    advantages: [
      "Natural model for hierarchical data",
      "O(log n) search in balanced trees",
      "Efficient range queries",
    ],
    consequences: {
      whyItStopsWorking: [
        "Unbalanced trees degrade to O(n)",
        "Complex balancing algorithms required",
      ],
      whatReplacesIt: [
        "B-trees for disk-based storage",
        "Tries for prefix-based operations",
      ],
    },
    demoFrames: [
      { id: 1, caption: "File system: directories as parent nodes, files as leaves." },
      { id: 2, caption: "Binary search tree: ordered insertion enabling fast lookup." },
    ],
  },
];

export function getDataStructure(slug: string): DataStructure | undefined {
  return dataStructures.find((ds) => ds.slug === slug);
}
