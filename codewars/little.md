For example, you might get something like this:

var processes = [
  {pid: 1, ppid: -1},
  {pid: 219, ppid: 214},
  {pid: 214, ppid: 1},
  {pid: 124, ppid: 1}
]
This represents a set of four processes; process 1 (the root process), its two children processes 124 and 214, and 214's child process 219.

Your task is to take this flat list representation and create a proper tree out of it, with a node for each process and edges between parents and their children. Processes will be represented by a classProcess:

function Process(pid, children) {
  this.pid = pid;
  this.children = children;
}
where pid is the integer pid and children is an array of children processes. Using this representation, the above set of processes might be represented as:

new Process(1, [
  new Process(124, []),
  new Process(214, [
    new Process(219, []),
  ]),
])
function makeProcessTree(processes) { function search(ppid) { return processes.filter(function(process){ return process.ppid==ppid; }); } function branch(process){ return new Process(process.pid, search(process.pid).map(branch)); } var roots=search(-1); return roots.length ? branch(roots[0]) : null; }