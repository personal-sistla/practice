// https://www.hackerrank.com/challenges/poisonous-plants

function max(a, b) {
    return (a > b) ? a : b;
}

function min(a, b) {
    return (a < b) ? a : b;
}

function node(a) {
    var self = this;
    self.data = a;
    self.next = null;
    
    self.print = function() {
        var n = self;
        var s = "";
        while(n != null) {
            s += (n.data + " ");
            n = n.next;
        }
        console.log(s);
    }
}

function greedy(input) {
    var i, root = null, current = null, pre = null, p1 = input.split("\n")[1].split(" ").map(Number), clr = false;
    for(i=p1.length-1;i>=0;--i) {
        if(current === null) {
            root = new node(p1[i]);
            current = root;
        } else {
            current.next = new node(p1[i]);
            current = current.next;
        }
    }
    var d = 0;
    while(!clr) {
        clr = true;
        current = root;
        pre = null;
        while(current !== null && current.next !== null) {
            if(current.data > current.next.data) {
                clr = false;
                if(pre === null) {
                    root = current.next;
                } else {
                    pre.next = current.next;
                }                
            } else {
                pre = current;
            }
            current = current.next;
        } 
        //root.print();
        ++d;
    }
    
    console.log(--d);
} 

function optimized(len, pest) {
    let maxD = 0, currD = 0, stk = [];
        
    for(let i=0;i<len;i++) {
        currD = 0;
        while(stk.length > 0 && pest[i] <= stk[stk.length-1].p) {
            currD = max(currD, stk.pop().d);
            console.log('w:', i, currD, maxD, stk);
        }
        if(stk.length == 0) currD = 0; else currD++;
        maxD = max(currD, maxD);
        stk.push({ d: currD, p: pest[i] });
        console.log('f:', i, currD, maxD, stk);
    }
    console.log(maxD);
} 

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//     _input += input;
// });

// process.stdin.on("end", function () {
//    var input = _input.split("\n").map(function(a){ return a.split(" ").map(Number);});
//    optimized(input[0][0], input[1]);
// });
optimized(8, [6,5,8,9,4,7,10,9]);