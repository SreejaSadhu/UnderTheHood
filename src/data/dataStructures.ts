export interface DemoFrame {
  id: number;
  title?: string;
  caption: string;
  image?: string;
  explanation?: string;
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
  headerImage?: string;
}

export const dataStructures: DataStructure[] = [
  {
    slug: "arrays",
    name: "Arrays",
    hook: "Indexed access as a design idea",
    headerImage: "/assets/header-images/arrays.png",
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
      {
        id: 1,
        title: "The Original Idea",
        caption: "Ranking happens on the backend. Items are scored, sorted, and frozen. By the time it reaches your phone, it's just a static ordered list.",
        image: "/assets/demo-images/arrays/1.png",
        explanation: "In production, we almost never sort these on the fly. It's too expensive. A cron job runs every hour, calculates the scores, sorts the array, and dumps it into a Redis cache. Your API just grabs that pre-baked list. Speed over freshness."
      },
      {
        id: 2,
        title: "The Scroll Trick",
        caption: "No searching. Knowing screen size and item height, the app calculates visibility and jumps straight to the index. Direct O(1) access.",
        image: "/assets/demo-images/arrays/2.png",
        explanation: "This is 'virtualization'. If you have a feed of 10,000 items, the DOM would crash if we rendered them all. Instead, we use math (index * height) to fake the scrollbar size and only render the 5 items actually on your screen. The array index is what makes looking up 'item 5000' instant."
      },
    ],
  },
  {
    slug: "stacks",
    name: "Stacks",
    hook: "Why last action wins",
    headerImage: "/assets/header-images/stacks.png",
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
      {
        id: 1,
        title: "Undo/Redo in Editors",
        caption: "Text editor history uses a stack where each action is pushed on top. Undo pops the most recent action, reverting changes one by one in LIFO order.",
        image: "/assets/demo-images/stacks/1.jpg",
        explanation: "We don't actually store the full file state every time you type a character. That would eat RAM. We store the 'diff'—just the change. But here's the catch: if we crash, that stack is gone. And usually, we cap it at 50 or 100 levels so your browser doesn't freeze."
      },
      {
        id: 2,
        title: "Function Call Stack",
        caption: "When functions call other functions, each new call is pushed onto the call stack. Only the top function runs. When it finishes, it's popped and control returns to the previous function.",
        image: "/assets/demo-images/stacks/2.png",
        explanation: "This is why 'Stack Overflow' is a literal error. If you write a recursive function that never stops, you fill up this reserved block of memory and the OS kills your program. It's a hard physical limit, usually a few megabytes per thread."
      },
      {
        id: 3,
        title: "Mobile App Navigation",
        caption: "Mobile app screens are stacked as you navigate deeper. The back button pops the top screen, revealing the previous one. Only the top screen is active.",
        image: "/assets/demo-images/stacks/3.png",
        explanation: "Ever notice an app get slow if you go 20 screens deep? That's because all 19 previous screens are still sitting in memory, 'frozen' in the stack. Efficient apps will detect this and kill the bottom ones to save memory, basically breaking the pure stack model to survive."
      },
    ],
  },
  {
    slug: "queues",
    name: "Queues",
    hook: "Ordering work in real systems",
    headerImage: "/assets/header-images/queues.png",
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
      {
        id: 1,
        title: "Messages & Notifications",
        caption: "Messaging systems use queues to deliver notifications in the order they arrive. Messages are enqueued at the back and dequeued from the front, ensuring FIFO processing.",
        image: "/assets/demo-images/queues/1.png",
        explanation: "We use queues here for 'decoupling'. If the notification service is down, the main app doesn't crash. It just keeps dumping messages into the queue. When the service wakes up, it drains the queue. It's the buffer zone that prevents cascading failures."
      },
      {
        id: 2,
        title: "Turning Chaos into Order",
        caption: "When many requests arrive unpredictably, queues protect systems by controlling flow. Requests are processed one at a time in the order received, preventing overload.",
        image: "/assets/demo-images/queues/2.png",
        explanation: "This is 'rate limiting'. Without a queue, a traffic spike hits the database directly and knocks it offline. The queue forces traffic into a single file line. Users might wait an extra second, but the server stays alive."
      },
    ],
  },
  {
    slug: "linked-lists",
    name: "Linked Lists",
    hook: "Pointers over positions",
    headerImage: "/assets/header-images/linked-lists.png",
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
      {
        id: 1,
        title: "Browser Back/Forward Navigation",
        caption: "Browser history uses a doubly linked list where each page knows its previous and next page. Navigation follows links, not indexes.",
        image: "/assets/demo-images/linked-lists/1.jpg",
        explanation: "Browsers use linked lists here because they often need to prune the history tree (like when you go back 3 pages and visit a new site, the 'forward' history is chopped off). Linked lists make cutting and grafting these chains instant, unlike arrays."
      },
      {
        id: 2,
        title: "Middleware Service Chain",
        caption: "Request handlers in web frameworks form a linked chain. Each middleware knows only the next handler, allowing dynamic insertion and removal.",
        image: "/assets/demo-images/linked-lists/2.png",
        explanation: "This pattern allows us to plug in a 'Logger' or 'Auth' check anywhere in the chain without rewriting the core code. The chain is just a list of functions calling `next()`. It's flexible, but if one link forgets to call `next()`, the whole request hangs forever."
      },
    ],
  },
  {
    slug: "hash-maps",
    name: "Hash Maps",
    hook: "Trading space for speed",
    headerImage: "/assets/header-images/hash-maps.png",
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
      {
        id: 1,
        title: "Conceptual View",
        caption: "Hash functions transform keys into internal bucket locations. HashMaps don't search—they compute where data lives. Same key always produces the same hash, enabling instant retrieval.",
        image: "/assets/demo-images/hash-maps/1.png",
        explanation: "The magic isn't the storage, it's the math. The hash function has to be fast and random. If it's slow, your 'instant' lookup drags. If it's not random, everyone lands in the same bucket and you're back to a slow list (Collision hell)."
      },
      {
        id: 2,
        title: "User Lookup",
        caption: "When a user logs in with a username, the system hashes it to find the exact location in the hash table. No searching through lists—direct access to user data in O(1) time.",
        image: "/assets/demo-images/hash-maps/2.png",
        explanation: "This is why you can log in instantly even if Facebook has 3 billion users. It doesn't check 3 billion names. It does one math operation on your email address and knows exactly where your record sits on the disk."
      },
      {
        id: 3,
        title: "Caching with HashMaps",
        caption: "Caches use hash maps to store computed results. On a request, the system checks if the key exists (cache hit). If found, return instantly. If not, compute and store for next time.",
        image: "/assets/demo-images/hash-maps/3.png",
        explanation: "The hardest thing in computer science is naming things and cache invalidation. Hash maps are great for storage, but deciding *when* to delete the entry so you don't serve old data? That's where the real bugs live."
      },
    ],
  },
  {
    slug: "trees",
    name: "Trees",
    hook: "Hierarchy as structure",
    headerImage: "/assets/header-images/trees.png",
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
      {
        id: 1,
        title: "Trie (Prefix Tree) - Autocomplete",
        caption: "Tries use tree structure for prefix-based search. Each level represents the next character, shared prefixes share the same path. Searching works by following characters step by step.",
        image: "/assets/demo-images/trees/1.png",
        explanation: "We don't actually use a database query for autocomplete. It's too slow. We load a compact Trie into memory. That way, as you type 'a-p-p', we're just walking three pointers in RAM. It's sub-millisecond fast."
      },
      {
        id: 2,
        title: "Decision Tree",
        caption: "Decision trees model choices as hierarchical branches. Each node represents a decision, each branch an outcome. Used in fraud detection, credit scoring, recommendations, and predictions.",
        image: "/assets/demo-images/trees/2.png",
        explanation: "Simple decision trees are readable, but real AI uses 'Random Forests'—thousands of these trees voting together. The trade-off is that you lose the ability to explain *why* the AI made a decision. It becomes a black box."
      },
      {
        id: 3,
        title: "DOM Tree (Web Pages)",
        caption: "Browsers structure HTML as a tree. Each element is a node with parent-child relationships. The DOM tree enables efficient rendering, updates, and element manipulation.",
        image: "/assets/demo-images/trees/3.png",
        explanation: "React's whole job is managing this tree. Toucing the real DOM is slow because the browser has to recalculate layout. So React builds a 'Virtual DOM' (a lightweight JS tree), diffs it, and only touches the real DOM where necessary."
      },
    ],
  },
  {
    slug: "strings",
    name: "Strings",
    hook: "Immutable sequences of characters",
    headerImage: "/assets/header-images/strings.png",
    what: "A sequence of characters, often immutable, used to represent text.",
    why: "To handle textual data efficiently with specialized operations.",
    advantages: [
      "Built-in support in most languages",
      "Efficient sharing (if immutable)",
      "Specialized algorithms (searching, regex)",
    ],
    consequences: {
      whyItStopsWorking: [
        "Concatenation can be expensive (O(n))",
        "Encoding issues (ASCII vs Unicode)",
      ],
      whatReplacesIt: [
        "Ropes for large text editing",
        "Byte arrays for raw binary data",
      ],
    },
    demoFrames: [
      {
        id: 1,
        title: "Command Line & Strings",
        caption: "How simple text commands are parsed and processed as strings in the terminal.",
        image: "/assets/demo-images/strings/1.jpg",
        explanation: "Everything in Linux is a file, or a string stream. The terminal doesn't 'know' commands. It just splits the string by spaces. That's why one missing quote or space can nuke your whole system."
      },
      {
        id: 2,
        title: "Autocomplete Matching",
        caption: "Using prefix matching on strings to find relevant results instantly.",
        image: "/assets/demo-images/strings/2.jpg",
        explanation: "Naive string matching is O(n*m). Slow. Real search engines use 'Inverted Indexes' (fancy hashmaps) or Suffix Trees so that finding a string in a billion documents takes constant time."
      },
      {
        id: 3,
        title: "Search Internals",
        caption: "Visualizing the character-by-character matching process in search algorithms.",
        image: "/assets/demo-images/strings/3.jpg",
        explanation: "Deep down, text search is just byte comparison. But Unicode makes this a nightmare. Does 'e' equal 'é'? Sorting and comparing strings across languages is one of the hardest solved problems in software."
      },
      {
        id: 4,
        title: "Authentication & Hashing",
        caption: "Transforming password strings into hashes for secure verification.",
        image: "/assets/demo-images/strings/4.png",
        explanation: "We never save your password. We save the hash. But hackers have 'Rainbow Tables' (pre-computed hash lists). So we 'salt' your password—add a random string before hashing—to make those tables useless."
      },
    ],
  },
  {
    slug: "heaps",
    name: "Heaps",
    hook: "Priority at your fingertips",
    headerImage: "/assets/header-images/heaps.png",
    what: "A complete binary tree where every parent is greater (max-heap) or smaller (min-heap) than its children.",
    why: "To efficiently access the highest or lowest priority element.",
    advantages: [
      "O(1) access to max/min element",
      "O(log n) insertion and deletion",
      "Space efficient (array-based)",
    ],
    consequences: {
      whyItStopsWorking: [
        "Slow searching for arbitrary elements O(n)",
        "Not stable (order of equals not preserved)",
      ],
      whatReplacesIt: [
        "Balanced BSTs for full ordering",
        "Sorted arrays for static data",
      ],
    },
    demoFrames: [
      {
        id: 1,
        title: "Hospital Triage System",
        caption: "Emergency rooms use max-heaps to prioritize patients. Highest priority (emergency) always at the top. Insert in O(log n), peek at top in O(1), extract max in O(log n) by bubbling down.",
        image: "/assets/demo-images/heaps/1.png",
        explanation: "Ordering a list of patients by severity every time a new one walks in is O(n log n). Too slow. A heap keeps the 'most critical' patient at the top instantly (O(1)), so doctors waste zero time deciding who to see next."
      },
      {
        id: 2,
        title: "Cloud Task Scheduling",
        caption: "Cloud systems like AWS and Kubernetes use priority queues (heaps) to schedule jobs. High-priority tasks are extracted first. The heap property ensures the highest priority is always at the top.",
        image: "/assets/demo-images/heaps/2.png",
        explanation: "When you spin up a server, you don't wait in a generic line. You pay more to jump the queue. The cloud provider uses a heap to ensure high-paying jobs (or system critical tasks) always get the next available CPU cycle."
      },
    ],
  },
  {
    slug: "graphs",
    name: "Graphs",
    hook: "Modeling relationships",
    headerImage: "/assets/header-images/graphs.png",
    what: "A collection of nodes (vertices) and edges that connect pairs of nodes.",
    why: "To model complex relationships like networks, maps, and dependencies.",
    advantages: [
      "Universally applicable to relationship data",
      "Rich set of algorithms (BFS, DFS, shortest path)",
      "Flexible representation (matrix vs list)",
    ],
    consequences: {
      whyItStopsWorking: [
        "Complexity increases with size (V+E)",
        "Hard to partition or shard",
      ],
      whatReplacesIt: [
        "Trees when no cycles exist",
        "Matrices for dense data",
      ],
    },
    demoFrames: [
      {
        id: 1,
        title: "Social Network Graph",
        caption: "Social networks model users as nodes and friendships/follows as edges. Graph algorithms find friend recommendations by discovering users connected to similar users.",
        image: "/assets/demo-images/graphs/1.png",
        explanation: "Relationships are hard to store in a normal SQL database (requiring massive JOIN tables). That's why companies like Facebook invented 'Graph Databases' (like GraphQL/Neo4j) to specifically traverse 'Friend of a Friend' links efficiently."
      },
      {
        id: 2,
        title: "Recommendation Systems",
        caption: "Spotify and Netflix use graphs to connect users, songs, and artists. Graph traversal finds related content through connections. AI ranks candidates discovered through graph paths.",
        image: "/assets/demo-images/graphs/2.jpg",
        explanation: "It's a 'Bipartite Graph'—users on one side, songs on the other. If I listen to what you listen to, the graph implies we have similar taste. The algorithm just walks the path from Me -> Song -> You -> Other Song -> Me."
      },
      {
        id: 3,
        title: "Navigation & Routing",
        caption: "Maps are graphs where intersections are nodes and roads are weighted edges. Shortest-path algorithms like Dijkstra's and A* find optimal routes considering traffic, distance, and road closures.",
        image: "/assets/demo-images/graphs/3.png",
        explanation: "The graph is actually 'weighted'. The distance might be short (5km), but the weight (time cost) is high because of traffic. GPS algorithms don't find the shortest path; they find the 'lowest cost' path. That's why it sends you through side streets."
      },
    ],
  },
];

export function getDataStructure(slug: string): DataStructure | undefined {
  return dataStructures.find((ds) => ds.slug === slug);
}
