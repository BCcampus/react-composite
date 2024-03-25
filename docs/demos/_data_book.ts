export interface Section {
  id: number;
  levelNumbering?: string;
  title: string;
  sections?: Section[];
}

export interface Book {
  title: 'Introduction to Algorithms, Fourth Edition';
  authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'];
  isbn: '9780262046305';
  published: 'April 5, 2022';
  publisher: 'The MIT Press';
  content: Section[];
}

export const book: Book = {
  title: 'Introduction to Algorithms, Fourth Edition',
  authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
  isbn: '9780262046305',
  published: 'April 5, 2022',
  publisher: 'The MIT Press',
  content: [
    { id: 1, title: 'Preface' },
    {
      id: 10,
      levelNumbering: 'I',
      title: 'Foundations',
      sections: [
        { id: 11, title: 'Introduction' },
        {
          id: 100,
          levelNumbering: '1',
          title: 'The Role of Algorithms in Computing',
          sections: [
            { id: 110, levelNumbering: '1.1', title: 'Algorithms' },
            { id: 120, levelNumbering: '1.2', title: 'Algorithms as a technology' },
          ],
        },
        {
          id: 200,
          levelNumbering: '2',
          title: 'Getting Started',
          sections: [
            { id: 210, levelNumbering: '2.1', title: 'Insertion sort' },
            { id: 220, levelNumbering: '2.2', title: 'Analyzing algorithms' },
            { id: 230, levelNumbering: '2.3', title: 'Designing algorithms' },
          ],
        },
        {
          id: 300,
          levelNumbering: '3',
          title: 'Characterizing Running Times',
          sections: [
            { id: 310, levelNumbering: '3.1', title: 'O-notation' },
            { id: 320, levelNumbering: '3.2', title: 'Asymptotic notation: formal definitions' },
            { id: 330, levelNumbering: '3.3', title: 'Standard notations and common functions' },
          ],
        },
        {
          id: 400,
          levelNumbering: '4',
          title: 'Divide-and-Conquer',
          sections: [
            { id: 410, levelNumbering: '4.1', title: 'Multiplying square matrices' },
            {
              id: 420,
              levelNumbering: '4.2',
              title: 'Strassen’s algorithm for matrix multiplication',
            },
            {
              id: 430,
              levelNumbering: '4.3',
              title: 'The substitution method for solving recurrences',
            },
            {
              id: 440,
              levelNumbering: '4.4',
              title: 'The recursion-tree method for solving recurrences',
            },
            { id: 450, levelNumbering: '4.5', title: 'The master method for solving recurrences' },
            { id: 460, levelNumbering: '4.6', title: 'Proof of the continuous master theorem' },
            { id: 470, levelNumbering: '4.7', title: 'Akra-Bazzi recurrences' },
          ],
        },
        {
          id: 500,
          levelNumbering: '5',
          title: 'Probabilistic Analysis and Randomized Algorithms',
          sections: [
            { id: 510, levelNumbering: '5.1', title: 'The hiring problem' },
            { id: 520, levelNumbering: '5.2', title: 'Indicator random variables' },
            { id: 530, levelNumbering: '5.3', title: 'Randomized algorithms' },
            {
              id: 540,
              levelNumbering: '5.4',
              title: 'Probabilistic analysis and further uses of indicator random variables',
            },
          ],
        },
      ],
    },
    {
      id: 20,
      levelNumbering: 'II',
      title: 'Sorting and Order Statistics',
      sections: [
        { id: 21, title: 'Introduction' },
        {
          id: 600,
          levelNumbering: '6',
          title: 'Heapsort',
          sections: [
            { id: 610, levelNumbering: '6.1', title: 'Heaps' },
            { id: 620, levelNumbering: '6.2', title: 'Maintaining the heap property' },
            { id: 630, levelNumbering: '6.3', title: 'Building a heap' },
            { id: 640, levelNumbering: '6.4', title: 'The heapsort algorithm' },
            { id: 650, levelNumbering: '6.5', title: 'Priority queues' },
          ],
        },
        {
          id: 700,
          levelNumbering: '7',
          title: 'Quicksort',
          sections: [
            { id: 710, levelNumbering: '7.1', title: 'Description of quicksort' },
            { id: 720, levelNumbering: '7.2', title: 'Performance of quicksort' },
            { id: 730, levelNumbering: '7.3', title: 'A randomized version of quicksort' },
            { id: 740, levelNumbering: '7.4', title: 'Analysis of quicksort' },
          ],
        },
        {
          id: 800,
          levelNumbering: '8',
          title: 'Sorting in Linear Time',
          sections: [
            { id: 810, levelNumbering: '8.1', title: 'Lower bounds for sorting' },
            { id: 820, levelNumbering: '8.2', title: 'Counting sort' },
            { id: 830, levelNumbering: '8.3', title: 'Radix sort' },
            { id: 840, levelNumbering: '8.4', title: 'Bucket sort' },
          ],
        },
        {
          id: 900,
          levelNumbering: '9',
          title: 'Medians and Order Statistics',
          sections: [
            { id: 910, levelNumbering: '9.1', title: 'Minimum and maximum' },
            { id: 920, levelNumbering: '9.2', title: 'Selection in expected linear time' },
            { id: 930, levelNumbering: '9.3', title: 'Selection in worst-case linear time' },
          ],
        },
      ],
    },
    {
      id: 30,
      levelNumbering: 'III',
      title: 'Data Structures',
      sections: [
        { id: 31, title: 'Introduction' },
        {
          id: 1000,
          levelNumbering: '10',
          title: 'Elementary Data Structures',
          sections: [
            {
              id: 1010,
              levelNumbering: '10.1',
              title: 'Simple array-based data structures: arrays, matrices, stacks, queues',
            },
            { id: 1020, levelNumbering: '10.2', title: 'Linked lists' },
            { id: 1030, levelNumbering: '10.3', title: 'Representing rooted trees' },
          ],
        },
        {
          id: 1100,
          levelNumbering: '11',
          title: 'Hash Tables',
          sections: [
            { id: 1110, levelNumbering: '11.1', title: 'Direct-address tables' },
            { id: 1120, levelNumbering: '11.2', title: 'Hash tables' },
            { id: 1130, levelNumbering: '11.3', title: 'Hash functions' },
            { id: 1140, levelNumbering: '11.4', title: 'Open addressing' },
            { id: 1150, levelNumbering: '11.5', title: 'Practical considerations' },
          ],
        },
        {
          id: 1200,
          levelNumbering: '12',
          title: 'Binary Search Trees',
          sections: [
            { id: 1210, levelNumbering: '12.1', title: 'What is a binary search tree?' },
            { id: 1220, levelNumbering: '12.2', title: 'Querying a binary search tree' },
            { id: 1230, levelNumbering: '12.3', title: 'Insertion and deletion' },
          ],
        },
        {
          id: 1300,
          levelNumbering: '13',
          title: 'Red-Black Trees',
          sections: [
            { id: 1310, levelNumbering: '13.1', title: 'Properties of red-black trees' },
            { id: 1320, levelNumbering: '13.2', title: 'Rotations' },
            { id: 1330, levelNumbering: '13.3', title: 'Insertion' },
            { id: 1340, levelNumbering: '13.4', title: 'Deletion' },
          ],
        },
      ],
    },
    {
      id: 40,
      levelNumbering: 'IV',
      title: 'Advanced Design and Analysis Techniques',
      sections: [
        { id: 41, title: 'Introduction' },
        {
          id: 1400,
          levelNumbering: '14',
          title: 'Dynamic Programming',
          sections: [
            { id: 1410, levelNumbering: '14.1', title: 'Rod cutting' },
            { id: 1420, levelNumbering: '14.2', title: 'Matrix-chain multiplication' },
            { id: 1430, levelNumbering: '14.3', title: 'Elements of dynamic programming' },
            { id: 1440, levelNumbering: '14.4', title: 'Longest common subsequence' },
            { id: 1450, levelNumbering: '14.5', title: 'Optimal binary search trees' },
          ],
        },
        {
          id: 1500,
          levelNumbering: '15',
          title: 'Greedy Algorithms',
          sections: [
            { id: 1510, levelNumbering: '15.1', title: 'An activity-selection problem' },
            { id: 1520, levelNumbering: '15.2', title: 'Elements of the greedy strategy' },
            { id: 1530, levelNumbering: '15.3', title: 'Huffman codes' },
            { id: 1540, levelNumbering: '15.4', title: 'Offline caching' },
          ],
        },
        {
          id: 1600,
          levelNumbering: '16',
          title: 'Amortized Analysis',
          sections: [
            { id: 1610, levelNumbering: '16.1', title: 'Aggregate analysis' },
            { id: 1620, levelNumbering: '16.2', title: 'The accounting method' },
            { id: 1630, levelNumbering: '16.3', title: 'The potential method' },
            { id: 1640, levelNumbering: '16.4', title: 'Dynamic tables' },
          ],
        },
      ],
    },
    {
      id: 50,
      levelNumbering: 'V',
      title: 'Advanced Data Structures',
      sections: [
        { id: 51, title: 'Introduction' },
        {
          id: 1700,
          levelNumbering: '17',
          title: 'Augmenting Data Structures',
          sections: [
            { id: 1710, levelNumbering: '17.1', title: 'Dynamic order statistics' },
            { id: 1720, levelNumbering: '17.2', title: 'How to augment a data structure' },
            { id: 1730, levelNumbering: '17.3', title: 'Interval trees' },
          ],
        },
        {
          id: 1800,
          levelNumbering: '18',
          title: 'B-Trees',
          sections: [
            { id: 1810, levelNumbering: '18.1', title: 'Definition of B-trees' },
            { id: 1820, levelNumbering: '18.2', title: 'Basic operations on B-trees' },
            { id: 1830, levelNumbering: '18.3', title: 'Deleting a key from a B-tree' },
          ],
        },
        {
          id: 1900,
          levelNumbering: '19',
          title: 'Data Structures for Disjoint Sets',
          sections: [
            { id: 1910, levelNumbering: '19.1', title: 'Disjoint-set operations' },
            {
              id: 1920,
              levelNumbering: '19.2',
              title: 'Linked-list representation of disjoint sets',
            },
            { id: 1930, levelNumbering: '19.3', title: 'Disjoint-set forests' },
            {
              id: 1940,
              levelNumbering: '19.4',
              title: 'Analysis of union by rank with path compression',
            },
          ],
        },
      ],
    },
    {
      id: 60,
      levelNumbering: 'VI',
      title: 'Graph Algorithms',
      sections: [
        { id: 61, title: 'Introduction' },
        {
          id: 2000,
          levelNumbering: '20',
          title: 'Elementary Graph Algorithms',
          sections: [
            { id: 2010, levelNumbering: '20.1', title: 'Representations of graphs' },
            { id: 2020, levelNumbering: '20.2', title: 'Breadth-first search' },
            { id: 2030, levelNumbering: '20.3', title: 'Depth-first search' },
            { id: 2040, levelNumbering: '20.4', title: 'Topological sort' },
            { id: 2050, levelNumbering: '20.5', title: 'Strongly connected components' },
          ],
        },
        {
          id: 2100,
          levelNumbering: '21',
          title: 'Minimum Spanning Trees',
          sections: [
            { id: 2110, levelNumbering: '21.1', title: 'Growing a minimum spanning tree' },
            { id: 2120, levelNumbering: '21.2', title: 'The algorithms of Kruskal and Prim' },
          ],
        },
        {
          id: 2200,
          levelNumbering: '22',
          title: 'Single-Source Shortest Paths',
          sections: [
            { id: 2210, levelNumbering: '22.1', title: 'The Bellman-Ford algorithm' },
            {
              id: 2220,
              levelNumbering: '22.2',
              title: 'Single-source shortest paths in directed acyclic graphs',
            },
            { id: 2230, levelNumbering: '22.3', title: 'Dijkstra’s algorithm' },
            {
              id: 2240,
              levelNumbering: '22.4',
              title: 'Difference constraints and shortest paths',
            },
            { id: 2250, levelNumbering: '22.5', title: 'Proofs of shortest-paths properties' },
          ],
        },
        {
          id: 2300,
          levelNumbering: '23',
          title: 'All-Pairs Shortest Paths',
          sections: [
            { id: 2310, levelNumbering: '23.1', title: 'Shortest paths and matrix multiplication' },
            { id: 2320, levelNumbering: '23.2', title: 'The Floyd-Warshall algorithm' },
            { id: 2330, levelNumbering: '23.3', title: 'Johnson’s algorithm for sparse graphs' },
          ],
        },
        {
          id: 2400,
          levelNumbering: '24',
          title: 'Maximum Flow',
          sections: [
            { id: 2410, levelNumbering: '24.1', title: 'Flow networks' },
            { id: 2420, levelNumbering: '24.2', title: 'The Ford-Fulkerson method' },
            { id: 2430, levelNumbering: '24.3', title: 'Maximum bipartite matching' },
          ],
        },
        {
          id: 2500,
          levelNumbering: '25',
          title: 'Matchings in Bipartite Graphs',
          sections: [
            { id: 2510, levelNumbering: '25.1', title: 'Maximum bipartite matching (revisited)' },
            { id: 2520, levelNumbering: '25.2', title: 'The stable-marriage problem' },
            {
              id: 2530,
              levelNumbering: '25.3',
              title: 'The Hungarian algorithm for the assignment problem',
            },
          ],
        },
      ],
    },
    {
      id: 70,
      levelNumbering: 'VII',
      title: 'Selected Topics',
      sections: [
        { id: 71, title: 'Introduction' },
        {
          id: 2600,
          levelNumbering: '26',
          title: 'Parallel Algorithms',
          sections: [
            { id: 2610, levelNumbering: '26.1', title: 'The basics of fork-join parallelism' },
            { id: 2620, levelNumbering: '26.2', title: 'Parallel matrix multiplication' },
            { id: 2630, levelNumbering: '26.3', title: 'Parallel merge sort' },
          ],
        },
        {
          id: 2700,
          levelNumbering: '27',
          title: 'Online Algorithms',
          sections: [
            { id: 2710, levelNumbering: '27.1', title: 'Waiting for an elevator' },
            { id: 2720, levelNumbering: '27.2', title: 'Maintaining a search list' },
            { id: 2730, levelNumbering: '27.3', title: 'Online caching' },
          ],
        },
        {
          id: 2800,
          levelNumbering: '28',
          title: 'Matrix Operations',
          sections: [
            { id: 2810, levelNumbering: '28.1', title: 'Solving systems of linear equations' },
            { id: 2820, levelNumbering: '28.2', title: 'Inverting matrices' },
            {
              id: 2830,
              levelNumbering: '28.3',
              title: 'Symmetric positive-definite matrices and least-squares approximation',
            },
          ],
        },
        {
          id: 2900,
          levelNumbering: '29',
          title: 'Linear Programming',
          sections: [
            {
              id: 2910,
              levelNumbering: '29.1',
              title: 'Linear programming formulations and algorithms',
            },
            { id: 2920, levelNumbering: '29.2', title: 'Formulating problems as linear programs' },
            { id: 2930, levelNumbering: '29.3', title: 'Duality' },
          ],
        },
        {
          id: 3000,
          levelNumbering: '30',
          title: 'Polynomials and the FFT',
          sections: [
            { id: 3010, levelNumbering: '30.1', title: 'Representing polynomials' },
            { id: 3020, levelNumbering: '30.2', title: 'The DFT and FFT' },
            { id: 3030, levelNumbering: '30.3', title: 'FFT circuits' },
          ],
        },
        {
          id: 3100,
          levelNumbering: '31',
          title: 'Number-Theoretic Algorithms',
          sections: [
            { id: 3110, levelNumbering: '31.1', title: 'Elementary number-theoretic notions' },
            { id: 3120, levelNumbering: '31.2', title: 'Greatest common divisor' },
            { id: 3130, levelNumbering: '31.3', title: 'Modular arithmetic' },
            { id: 3140, levelNumbering: '31.4', title: 'Solving modular linear equations' },
            { id: 3150, levelNumbering: '31.5', title: 'The Chinese remainder theorem' },
            { id: 3160, levelNumbering: '31.6', title: 'Powers of an element' },
            { id: 3170, levelNumbering: '31.7', title: 'The RSA public-key cryptosystem' },
            { id: 3180, levelNumbering: '31.8', title: 'Primality testing' },
          ],
        },
        {
          id: 3200,
          levelNumbering: '32',
          title: 'String Matching',
          sections: [
            { id: 3210, levelNumbering: '32.1', title: 'The naive string-matching algorithm' },
            { id: 3220, levelNumbering: '32.2', title: 'The Rabin-Karp algorithm' },
            { id: 3230, levelNumbering: '32.3', title: 'String matching with finite automata' },
            { id: 3240, levelNumbering: '32.4', title: 'The Knuth-Morris-Pratt algorithm' },
            { id: 3250, levelNumbering: '32.5', title: 'Suffix arrays' },
          ],
        },
        {
          id: 3300,
          levelNumbering: '33',
          title: 'Machine-Learning Algorithms',
          sections: [
            { id: 3310, levelNumbering: '33.1', title: 'Clustering' },
            { id: 3320, levelNumbering: '33.2', title: 'Multiplicative-weights algorithms' },
            { id: 3330, levelNumbering: '33.3', title: 'Gradient descent' },
          ],
        },
        {
          id: 3400,
          levelNumbering: '34',
          title: 'NP-Completeness',
          sections: [
            { id: 3410, levelNumbering: '34.1', title: 'Polynomial time' },
            { id: 3420, levelNumbering: '34.2', title: 'Polynomial-time verification' },
            { id: 3430, levelNumbering: '34.3', title: 'NP-completeness and reducibility' },
            { id: 3440, levelNumbering: '34.4', title: 'NP-completeness proofs' },
            { id: 3450, levelNumbering: '34.5', title: 'NP-complete problems' },
          ],
        },
        {
          id: 3500,
          levelNumbering: '35',
          title: 'Approximation Algorithms',
          sections: [
            { id: 3510, levelNumbering: '35.1', title: 'The vertex-cover problem' },
            { id: 3520, levelNumbering: '35.2', title: 'The traveling-salesperson problem' },
            { id: 3530, levelNumbering: '35.3', title: 'The set-covering problem' },
            { id: 3540, levelNumbering: '35.4', title: 'Randomization and linear programming' },
            { id: 3550, levelNumbering: '35.5', title: 'The subset-sum problem' },
          ],
        },
      ],
    },
    {
      id: 80,
      levelNumbering: 'VIII',
      title: 'Appendix: Mathematical Background',
      sections: [
        { id: 81, title: 'Introduction' },
        {
          id: 8010,
          levelNumbering: 'A',
          title: 'Summations',
          sections: [
            { id: 8011, levelNumbering: 'A.1', title: 'Summation formulas and properties' },
            { id: 8012, levelNumbering: 'A.2', title: 'Bounding summations' },
          ],
        },
        {
          id: 8020,
          levelNumbering: 'B',
          title: 'Sets, Etc.',
          sections: [
            { id: 8021, levelNumbering: 'B.1', title: 'Sets' },
            { id: 8022, levelNumbering: 'B.2', title: 'Relations' },
            { id: 8023, levelNumbering: 'B.3', title: 'Functions' },
            { id: 8024, levelNumbering: 'B.4', title: 'Graphs' },
            { id: 8025, levelNumbering: 'B.5', title: 'Trees' },
          ],
        },
        {
          id: 8030,
          levelNumbering: 'C',
          title: 'Counting and Probability',
          sections: [
            { id: 8031, levelNumbering: 'C.1', title: 'Counting' },
            { id: 8032, levelNumbering: 'C.2', title: 'Probability' },
            { id: 8033, levelNumbering: 'C.3', title: 'Discrete random variables' },
            { id: 8034, levelNumbering: 'C.4', title: 'The geometric and binomial distributions' },
            { id: 8035, levelNumbering: 'C.5', title: 'The tails of the binomial distribution' },
          ],
        },
        {
          id: 8040,
          levelNumbering: 'D',
          title: 'Matrices',
          sections: [
            { id: 8041, levelNumbering: 'D.1', title: 'Matrices and matrix operations' },
            { id: 8042, levelNumbering: 'D.2', title: 'Basic matrix properties' },
          ],
        },
      ],
    },
    { id: 2, title: 'Bibliography' },
    { id: 3, title: 'Index' },
  ],
};
