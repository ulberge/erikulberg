var h = 86;
var w = 48;
var l = 84;
var bw = 3.5;
var bt = 1.5;
var sh = 20;
var dw = 60;
var rw = 84;
var WOOD = { label: 'HemFir', dimensions: [120,bt,bw], color: '#E6DB74' };
var WOOD2 = { label: 'HemFir', dimensions: [120,bw,bt], color: '#E6DB74' };
var CONCRETE = { label: 'Concrete', dimensions: [120,8,8], color: '#E6DB74' };

return {
  wall1: {
    parts: [
      [ WOOD, [ 0, h - bt ], w - 2*bw, "_" ],
      [ WOOD, [ 0, h - 2*bt ], w - 2*bw, "_" ],
      [ WOOD, [ 0, bt ], h - 3*bt, "|" ],
      [ WOOD, [ ( w - bt - ( 2*bw ) )/2, bt ], h - 3*bt, "|" ],
      [ WOOD, [ w - bt - ( 2*bw ), bt ], h - 3*bt, "|" ],
      [ WOOD, [ 0, 0 ], w - ( 2*bw ), "_" ]
    ],
    position: [0,0,0],
    rotation: [0,Math.PI/2,0]
  },
  doorWall: {
    parts: [
      [ WOOD, [  - 12, h+sh ], l+24, "_" ],
      [ WOOD, [ bt*2, h+sh - bt ], l - ( 4*bt ), "_" ],
      [ WOOD, [ bt*2, h - bt ], l - ( 4*bt ), "_" ],
      [ WOOD, [ bt*2, h - 2*bt ], l - ( 4*bt ), "_" ],
      [ WOOD2, [  ( l - dw )/2, h - bw - 2*bt ],  dw, "_" ],
      [ WOOD2, [  ( l - dw )/2, h - bw - 2*bt ],  dw, "_" ],
      [ WOOD, [ 0, bt ], h+sh - bt, "|" ],
      [ WOOD, [ bt, bt ], h+sh - bw - bt, "|" ],
      [ WOOD, [ bt*2, bt ], h - bt*3, "|" ],
      [ WOOD, [ bt*2, h ], sh - bt - bw, "|" ],
      [ WOOD, [ bt*2+( l - 5*bt )*0.25, h ], sh - bt - bw, "|" ],
      [ WOOD, [ bt*2+( l - 5*bt )*0.5, h ], sh - bt - bw, "|" ],
      [ WOOD, [ bt*2+( l - 5*bt )*0.75, h ], sh - bt - bw, "|" ],
      [ WOOD, [ l - bt*3, h ], sh - bt - bw, "|" ],
      [ WOOD, [  - bt+( l - dw )/2, bt ], h - 3*bt, "|" ],
      [ WOOD, [ l - ( l - dw )/2, bt ], h - 3*bt, "|" ],
      [ WOOD, [ l - bt*3, bt ], h - bt*3, "|" ],
      [ WOOD, [ l - 2*bt, bt ], h+sh - bw - bt, "|" ],
      [ WOOD, [ l - bt, bt ], h+sh - bt, "|" ],
      [ WOOD, [ l - ( ( l - dw )/2 ), 0 ], ( l - dw )/2, "_" ],
      [ WOOD, [ 0, 0 ], ( l - dw )/2, "_" ]
    ],
    position: [0,0,0],
    rotation: [0,0,0]
  },
  wallRight: {
    parts: [
      [ WOOD, [ 0, h - bt ], w - 2*bw, "_" ],
      [ WOOD, [ 0, h - 2*bt ], w - 2*bw, "_" ],
      [ WOOD, [ 0, bt ], h - 3*bt, "|" ],
      [ WOOD, [ ( w - bt - ( 2*bw ) )/2, bt ], h - 3*bt, "|" ],
      [ WOOD, [ w - bt - ( 2*bw ), bt ], h - 3*bt, "|" ],
      [ WOOD, [ 0, 0 ], w - ( 2*bw ), "_" ]
    ],
    position: [l - bw,0,0],
    rotation: [0,Math.PI/2,0]
  },
  backWall: {
    parts: [
      [ WOOD, [  - 12, h - bt ], l+24, "_" ],
      [ WOOD, [ 0, h - 2*bt ], l, "_" ],
      [ WOOD, [ 0, bt ], h - 3*bt, "|" ],
      [ WOOD, [ bt, bt ], 12, "|" ],
      [ WOOD, [ bt, ( h - 6 - bt - bt )/2 ], 12, "|" ],
      [ WOOD, [ bt, h - 2*bt - 12 ], 12, "|" ],
      [ WOOD, [ 2*bt, bt ], h - 3*bt, "|" ],
      [ WOOD, [ ( ( l - 5*bt )*0.25 )+3*bt, bt ], h - 3*bt, "|" ],
      [ WOOD, [ ( ( l - 5*bt )*0.5 )+3*bt, bt ], h - 3*bt, "|" ],
      [ WOOD, [ ( ( l - 5*bt )*0.75 )+3*bt, bt ], h - 3*bt, "|" ],
      [ WOOD, [ l - bt, bt ], h - 3*bt, "|" ],
      [ WOOD, [ l - 2*bt, bt ], 12, "|" ],
      [ WOOD, [ l - 2*bt, ( h - 6 - bt - bt )/2 ], 12, "|" ],
      [ WOOD, [ l - 2*bt, h - 2*bt - 12 ], 12, "|" ],
      [ WOOD, [ l - 3*bt, bt ], h - 3*bt, "|" ],
      [ WOOD, [ 0, 0 ], l, "_" ]
    ],
    position: [0,0, - w+bw],
    rotation: [0,0,0]
  },
  roof: {
    parts: [
      [ WOOD, [ 0,  - bt ], 96, "_" ],
      [ WOOD, [ 0, w+48 ], 96, "_" ],
      [ WOOD, [ 0, 0 ], 96, "|" ],
      [ WOOD, [ 96-bt, 0 ], 96, "|" ],
    ],
    position: [ - 12,h+sh - 15, - w+bw - 24],
    rotation: [Math.PI*0.41,0,0]
  },
};
