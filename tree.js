function minn(tre){
    let min = 100000000;
    let ch;
    let ch1;
    for (let i in tre){
        if (tre[i].freq <= min & !tre[i].used){
            min = tre[i].freq;
            ch = i;
        }
    }
    min = 100000000;
    min = tre[0].freq;
    for (let i in tre){
        if (tre[i].freq <= min & i != ch & !tre[i].used){
            min = tre[i].freq;
            ch1 = i;
        }
    }
    min = 10000000;
    if (ch1 == undefined){
        for (let i = 0; i < tre.length; i++){
            if (tre[i].freq <= min & i != ch & !tre[i].used){
                min = tre[i].freq;
                ch1 = i;
            } 
        }
    }
    return new Array(ch,ch1);
}
function Node(freq, letter, used, father, code) {
    this.freq = freq;
    this.letter = letter;
    this.used = used;
    this.father = father;
    this.code = code;
};

let fs = require('fs');
let s = fs.readFileSync("tree.txt").toString();
let alph = new Object();
let tree = new Array();

for (let i = 0; i < s.length; i++) {
    if (alph[s.charAt(i)])
        alph[s.charAt(i)]++;
    else
        alph[s.charAt(i)] = 1;
}
for (let i in alph) {
    let n = new Node(alph[i], i, 0, 0, "");
    tree.push(n)
}
let len = tree.length;
for (let i = 0; i < len-1; i++) {
    let a = minn(tree)[0];
    let b = minn(tree)[1];
    tree[a].used = 1;
    tree[b].used = 1;
    let n = new Node(tree[a].freq + tree[b].freq, tree[a].letter + tree[b].letter, 0, 0,"");
    tree[a].code = "1";
    tree[b].code = "0";
    tree.push(n);
    tree[a].father = tree.length - 1;
    tree[b].father = tree.length - 1;
}
for (let i = tree.length-2; i >= 0; i--){
    tree[i].code += tree[tree[i].father].code;
}
let n1 = Array();

for (let i = 0; i < len; i++){
    n1[tree[i].letter] = tree[i].code.split("").reverse().join("");
}
let s1 = "";
for (let i in s){
    s1 += n1[s[i]];
    
}
fs.writeFileSync("output.txt", s1);