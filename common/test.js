const Matrix = require('./matrix');

let m = new Matrix(2,2);

m[0][0] = 1;
m[1][1] = 1;
m.print();
const m2 = m.mult(m);
m2.print();