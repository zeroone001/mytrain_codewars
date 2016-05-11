Description:

Cascading Style Sheets (CSS) is a style sheet language used for describing the look and formatting of a document written in a markup language. A style sheet consists of a list of rules. Each rule or rule-set consists of one or more selectors, and a declaration block. Selector describes which element it matches.

Sometimes element is matched to multiple selectors. In this case, element inherits multiple styles, from each rule it matches. Rules can override each other. To solve this problem, each selector has it's own 'specificity' - e.g. weight. The selector with greater specificity overrides the other selector.

Your task is to calculate the weights of two selectors and determine which of them will beat the other one.

compare("body p", "div"); // returns "body p"
compare(".class", "#id"); // returns "#id"
compare("div.big", ".small"); // returns "div.big"
compare(".big", ".small"); // returns ".small" (because it appears later)
For simplicity, all selectors in test cases are CSS1-compatible, test cases don't include pseudoclasses, pseudoelements, attribute selectors, etc. Below is an explanation on how to weight two selectors. You can read more about specificity here.

The simplest selector type is tagname selector. It writes as a simple alphanumeric identifier: eg body, div, h1, etc. It has the least weight. If selectors have multiple elements - the selector with more elements win. For example, body p beats div, because it refers to 2 (nested) elements rather than 1.

Another simple selector is .class selector. It begins with dot and refer to element with specific class attribute. Class selectors can also be applied to tagname selectors, so div.red refer to <div class="red"> element. They can be grouped, for example, .red.striped. Class selector beats tagname selector.

The most weighted selector type in stylesheet is #id selector. It begins with hash sign and refer to element with specific id attribute. It can also be standalone, or applied to an element. Id selector beats both selector types.

And the least weighted selector is *, which has no specificity and can be beat by any other selector.

Selectors can be combined, for example, body #menu ul li.active refers to li element with class="active", placed inside ul element, placed inside element width id="menu", placed insidebody.

Specificity calculation is simple.

Selector with more #id selectors wins
If both are same, the winner is selector with more .class selectors
If both are same, selector with more elements wins
If all of above values are same, the winner is selector that appear last
For example, let's represent the number of #id , .class, tagname selectors as array (in order from worst to best):

Selector	Specifity (#id,.class,tagname)
*	0, 0, 0
span	0, 0, 1
body p	0, 0, 2
.green	0, 1, 0
apple.yellow	0, 1, 1
div.menu li	0, 1, 2
.red .orange	0, 2, 0
div.big .first	0, 2, 1
#john	1, 0, 0
div#john	1, 0, 1
body #john span	1, 0, 2
menu .item #checkout.active	1, 2, 1
#foo div#bar.red .none	2, 2, 1

function compare(a,b){
  var tokens, exp = /(#\w+)|(\.\w+)|(\w+)/g;
  var i, precedence = [0, 0, 0];
  while (tokens = exp.exec(a))
    precedence = precedence.map(function (value, i) { return value + !!tokens[i + 1] });
  while (tokens = exp.exec(b))
    precedence = precedence.map(function (value, i) { return value - !!tokens[i + 1] });
  for (i = 0; i < 3; i++) {
    if (precedence[i] > 0) return a;
    if (precedence[i] < 0) return b;
  }
  return b;
} 

function compare(a,b){ function d(h,c){ return c ? (c.match(h) || []).length : d(h,b) - d(h,a)} return (d(/#/g) || d(/\./g) || d(/(^| )\w/g)) < 0 ? a : b; }

String.prototype.count = function(char) { return this.split(char).length - 1; } function compare(a,b) { function c(s) { var s = s.split(" "), t = "*#."; return s.reduce(function(p, c) { if (t.indexOf(c[0]) === -1) { return p + 1 } else return p }, 0); } if (a.count("#") > b.count("#")) return a; if (b.count("#") > a.count("#")) return b; if (a.count(".") > b.count(".")) return a; if (b.count(".") > a.count(".")) return b; if (c(a) > c(b)) return a; if (c(b) > c(a)) return b; return b; }

function compare(a,b){ var p = ['i','c','e'], fn = function (a, b, e) { return a[e] == b[e] ? null : a[e] < b[e] }.bind(null, spec(a), spec(b)); for (var i in p) { var ret = fn(p[i]); if (ret !== null) return [a,b][+ret]; } return b; } function spec(str) { return str.match(/(#|\.)?[^\s#.]*/gi).reduce(function(o, m){ return { i: o.i += m[0] == '#', c: o.c += m[0] == '.', e: o.e += /^[a-z]/gi.test(m) } }, {i: 0, c: 0, e: 0}); } 