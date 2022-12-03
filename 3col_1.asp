starting(a).
starting(b).
starting(c).
starting(d).
edge(a,b, blue).
edge(a,c, blue).
edge(b,c, blue).
edge(c,d, blue).

node(X, red) | node(X, yellow) | node(X, green) :- starting(X).
:- node(X,C),node(Y,C), edge(X,Y,_),X!=Y.
