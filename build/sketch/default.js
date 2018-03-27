var WOOD = {label: 'HemFir', color: 0xfeb74c};
var PLYWOOD = {label: 'Plywood', color: 0xfeb74c}; 
var SIDING = {label: 'Siding', color: 0xFEDFAB}; 
var TABLE = {label: 'Table', color: 0xfeb74c}; 
var TREATED_WOOD = {label: 'Treated Wood', color: 0x8b5a2b};
var CONCRETE = {label: 'Concrete Block', color:  0x777777};
var depthHeight = 3.875+3.5; 
var blockSize = 8;
var blockHeight = 4;
var blockPosY = -depthHeight-blockHeight;
var margin = (blockSize-3.5)/2;
var doorWidth = 60;
var doorHeight = 82;
var mainHeight = doorHeight + 6.5;
var slantHeight = 18;
var topHeight = mainHeight + slantHeight;
var leanToHeight = mainHeight - slantHeight;
var leanToDistance = -44.5;
var insideHeight = mainHeight-4.5;
var numSupports = 5;
var wlength = 84;
var baseWidth = (wlength-doorWidth)/2;
var roofWidth = 132;
var angle = Math.atan(slantHeight/48);

return {

base: [[
[TABLE, [ 84, 3.875, 48 ], [ 0, -3.875, 0 ]],//floor
[TREATED_WOOD, [ 84, 3.5, 3.5 ], [ 0, -3.875-3.5, 0 ]],//ground beam1
[TREATED_WOOD, [ 84, 3.5, 3.5 ], [ 0, -3.875-3.5, 48-3.5 ]],//ground beam2
]],

blocks: [[
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, -margin ]],
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ (84-blockSize)/2, 0, -margin ]],
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, -margin ]],
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, 48-3.5-margin ]],
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ (84-blockSize)/2, 0, 48-3.5-margin ]],
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, 48-3.5-margin ]],
], [0,blockPosY,0]],

lean_to_blocks: [[
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ -margin, 0, -margin ]],
[CONCRETE, [ blockSize, blockHeight, blockSize ], [ 84-margin-3.5, 0, -margin ]],
], [0,blockPosY,leanToDistance]],

lean_to: [[
[TREATED_WOOD, [ 3.5, leanToHeight + depthHeight, 3.5 ], [ 0, -depthHeight, 0 ]], // pillar 1
[TREATED_WOOD, [ 3.5, leanToHeight + depthHeight, 3.5 ], [ 84-3.5, -depthHeight, 0 ]], // pillar 2
[WOOD, [ 84, 3.5, 1.5 ], [ 0, leanToHeight-3.5, -1.5 ]], // beam 1
[WOOD, [ 84, 3.5, 1.5 ], [ 0, leanToHeight-3.5, 3.5 ]], // beam 2
], [0,0,leanToDistance]],

back_wall: [[
{left_brace: [[ 
[WOOD, [ 1.5, insideHeight, 3.5 ], [ 0, 1.5, 0 ]],// side cap
[WOOD, [ 1.5, 12, 3.5 ], [ 1.5, 1.5, 0 ]],// short support
[WOOD, [ 1.5, 12, 3.5 ], [ 1.5, insideHeight-12+1.5, 0 ]],// short support
[WOOD, [ 1.5, 12, 3.5 ], [ 1.5, (insideHeight)/2-(12/2), 0 ]],// short support
]]},
{right_brace: [[
[WOOD, [ 1.5, insideHeight, 3.5 ], [ 0, 1.5, 0 ]], // side cap
[WOOD, [ 1.5, 12, 3.5 ], [ 1.5, 1.5, 0 ]], // short support
[WOOD, [ 1.5, 12, 3.5 ], [ 1.5, insideHeight-12+1.5, 0 ]],// short support
[WOOD, [ 1.5, 12, 3.5 ], [ 1.5, (insideHeight)/2-(12/2), 0 ]],// short support
], [84,0,3.5], [0,Math.PI,0]]},
{caps: [[
[WOOD, [ wlength, 1.5, 3.5 ], [ 0, mainHeight-1.5, 0 ]], // top cap
[WOOD, [ wlength, 1.5, 3.5 ], [ 0, mainHeight-3, 0 ]], // top cap
[WOOD, [ wlength, 1.5, 3.5 ], [ 0, 0, 0 ]], // bottom cap
]]},
{repeat_boards: [[ 
[WOOD,[ 1.5, insideHeight, 3.5 ],[0,0,0]],
[WOOD,[ 1.5, insideHeight, 3.5 ],[19.125,0,0]],
[WOOD,[ 1.5, insideHeight, 3.5 ],[38.25,0,0]],
[WOOD,[ 1.5, insideHeight, 3.5 ],[57.375,0,0]],
[WOOD,[ 1.5, insideHeight, 3.5 ],[76.5,0,0]],
], [ 3, 1.5, 0 ],[ 0, 0, 0 ]]},
]],

door_wall: [[
{outer_edges: [[ 
[WOOD, [ 1.5, topHeight-1.5, 3.5 ], [ 0, 1.5, 0 ]],
[WOOD, [ 1.5, topHeight-3.5-1.5, 3.5 ], [ 1.5, 1.5, 0 ]],
[WOOD, [ 1.5, topHeight-1.5, 3.5 ], [ wlength-1.5, 1.5, 0 ]],
[WOOD, [ 1.5, topHeight-3.5-1.5, 3.5 ], [ wlength-3, 1.5, 0 ]],
[WOOD, [ wlength-3, 3.5, 1.5 ], [ 1.5, topHeight-3.5, 0.5 ]],
[WOOD, [ wlength-3, 3.5, 1.5 ], [ 1.5, topHeight-3.5, 2 ]],
]]},
{edges: [[ 
[WOOD, [ 1.5, insideHeight, 3.5 ], [ 3, 1.5, 0 ]],
[WOOD, [ 1.5, insideHeight, 3.5 ], [ wlength-4.5, 1.5, 0 ]],
]]},
{caps: [[ 
[WOOD, [ wlength-6, 1.5, 3.5 ], [ 3, mainHeight-1.5, 0 ]],
[WOOD, [ wlength-6, 1.5, 3.5 ], [ 3, mainHeight-3, 0 ]],
]]},
{door: [[ 
[WOOD, [ 1.5, insideHeight, 3.5 ], [ ((wlength+doorWidth)/2)+1.5, 1.5, 0 ]],
[WOOD, [ 1.5, insideHeight, 3.5 ], [ ((wlength-doorWidth)/2)-3, 1.5, 0 ]],
[WOOD, [ 1.5, insideHeight-3.5, 3.5 ], [ ((wlength+doorWidth)/2), 1.5, 0 ]],
[WOOD, [ 1.5, insideHeight-3.5, 3.5 ], [ ((wlength-doorWidth)/2)-1.5, 1.5, 0 ]],
[WOOD, [ doorWidth+3, 3.5, 1.5 ], [ ((wlength-doorWidth)/2)-(1.5), insideHeight-2, 2 ]],
[WOOD, [ doorWidth+3, 3.5, 1.5 ], [ ((wlength-doorWidth)/2)-1.5, insideHeight-2, 0.5 ]],
]]},
{base: [[ 
[TREATED_WOOD, [ baseWidth, 1.5, 3.5 ], [ 0, 0, 0 ]],
[TREATED_WOOD, [ baseWidth, 1.5, 3.5 ], [ wlength-baseWidth, 0, 0 ]],
]]},
{top_section: [[ 
[WOOD, [ wlength-6, 1.5, 3.5 ], [ 3, topHeight-3.5-1.5, 0 ]],
]]},
{inner_repeat: [[
[WOOD,[ 1.5, slantHeight-5, 3.5 ],[0,0,0]],
[WOOD,[ 1.5, slantHeight-5, 3.5 ],[19.125,0,0]],
[WOOD,[ 1.5, slantHeight-5, 3.5 ],[38.25,0,0]],
[WOOD,[ 1.5, slantHeight-5, 3.5 ],[57.375,0,0]],
[WOOD,[ 1.5, slantHeight-5, 3.5 ],[76.5,0,0]],
], [ 3, mainHeight, 0 ]]},
], [ 0, 0, 48-3.5 ],[ 0, 0, 0 ]],

side_wall1: [[
{outer_edges: [[
[WOOD, [ 1.5, (topHeight-insideHeight-4.5)/2, 3.5 ], [ (wlength/2-1.5)/2, insideHeight+4.5, 0 ]],
[WOOD, [ 48-8.5, 1.5, 3.5 ], [ 1.5, mainHeight-1.5, 0 ]],
[WOOD, [ 48-8.5, 1.5, 3.5 ], [ 1.5, mainHeight-3, 0 ]],
[WOOD, [ 48-7, 1.5, 3.5 ], [ 0, 0, 0 ]],
]]},
{framing: [[
[WOOD,[ 1.5, topHeight-1.5, 3.5 ],[0,0,0]],
[WOOD,[ 1.5, mainHeight-4.5, 3.5 ],[13.16,0,0]],
[WOOD,[ 1.5, mainHeight-4.5, 3.5 ],[26.3,0,0]],
[WOOD,[ 1.5, mainHeight-4.5, 3.5 ],[39.5,0,0]],
], [ 0, 1.5, 0 ],[ 0, 0, 0 ]]}, 
], [ 0, 0, 48-3.5 ],[ 0, Math.PI/2, 0 ]],

side_wall2: [[
{outer_edges: [[
[WOOD, [ 1.5, (topHeight-insideHeight-4.5)/2, 3.5 ], [ (wlength/2-1.5)/2, insideHeight+4.5, 0 ]],
[WOOD, [ 48-8.5, 1.5, 3.5 ], [ 1.5, mainHeight-1.5, 0 ]],
[WOOD, [ 48-8.5, 1.5, 3.5 ], [ 1.5, mainHeight-3, 0 ]],
[WOOD, [ 48-7, 1.5, 3.5 ], [ 0, 0, 0 ]],
]]},
{framing: [[
[WOOD,[ 1.5, topHeight-1.5, 3.5 ],[0,0,0]],
[WOOD,[ 1.5, mainHeight-4.5, 3.5 ],[13.16,0,0]],
[WOOD,[ 1.5, mainHeight-4.5, 3.5 ],[26.3,0,0]],
[WOOD,[ 1.5, mainHeight-4.5, 3.5 ],[39.5,0,0]],
], [ 0, 1.5, 0 ],[ 0, 0, 0 ]]},
], [ wlength-3.5, 0, 48-3.5 ],[ 0, Math.PI/2, 0 ]],

roof: [[
[WOOD,[ 1.5, roofWidth, 3.5 ],[-6,0,0]],
[WOOD,[ 1.5, roofWidth, 3.5 ],[0,0,0]],
[WOOD,[ 1.5, roofWidth, 3.5 ],[20.625,0,0]],
[WOOD,[ 1.5, roofWidth, 3.5 ],[41.25,0,0]],
[WOOD,[ 1.5, roofWidth, 3.5 ],[61.875,0,0]],
[WOOD,[ 1.5, roofWidth, 3.5 ],[82.5,0,0]],
[WOOD,[ 1.5, roofWidth, 3.5 ],[82.5+6,0,0]],
], [ 0, leanToHeight-2, -60 ],[ (Math.PI/2)-(angle*1.05), 0, 0 ]],

roof_supports1: [[
[WOOD,[ 4.5, 1.5, 3.5  ],[0,18.642857142857142,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,37.285714285714285,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,55.92857142857143,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,74.57142857142857,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,93.21428571428571,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,111.85714285714286,0]],
], [ -4.5, leanToHeight-2, -60 ],[ (Math.PI/2)-(angle*1.05), 0, 0 ]],

roof_supports2: [[
[WOOD,[ 4.5, 1.5, 3.5  ],[0,18.642857142857142,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,37.285714285714285,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,55.92857142857143,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,74.57142857142857,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,93.21428571428571,0]],
[WOOD,[ 4.5, 1.5, 3.5  ],[0,111.85714285714286,0]],
], [ wlength, leanToHeight-2, -60 ],[ (Math.PI/2)-(angle*1.05), 0, 0 ]],

roof_board: [[
[PLYWOOD,[ wlength+12, roofWidth, 0.25 ],[0,0,0]],
], [ -6, leanToHeight-1, -60 ],[ (Math.PI/2)-(angle*1.05), 0, 0 ]],

siding: [[
{side1: [[
[SIDING,[ 3/8, 6, 48 ],[0,0,0]],
[SIDING,[ 3/8, 6, 48 ],[0,5.3125,0]],
[SIDING,[ 3/8, 6, 48 ],[0,10.625,0]],
[SIDING,[ 3/8, 6, 48 ],[0,15.9375,0]],
[SIDING,[ 3/8, 6, 48 ],[0,21.25,0]],
[SIDING,[ 3/8, 6, 48 ],[0,26.5625,0]],
[SIDING,[ 3/8, 6, 48 ],[0,31.875,0]],
[SIDING,[ 3/8, 6, 48 ],[0,37.1875,0]],
[SIDING,[ 3/8, 6, 48 ],[0,42.5,0]],
[SIDING,[ 3/8, 6, 48 ],[0,47.8125,0]],
[SIDING,[ 3/8, 6, 48 ],[0,53.125,0]],
[SIDING,[ 3/8, 6, 48 ],[0,58.4375,0]],
[SIDING,[ 3/8, 6, 48 ],[0,63.75,0]],
[SIDING,[ 3/8, 6, 48 ],[0,69.0625,0]],
[SIDING,[ 3/8, 6, 48 ],[0,74.375,0]],
[SIDING,[ 3/8, 6, 48 ],[0,79.6875,0]],
[SIDING,[ 3/8, 6, 48 ],[0,85,0]],
], [ -5/8, -4, 0 ],[ 0, 0, 0 ]]},
{side2: [[
[SIDING,[ 3/8, 6, 48 ],[0,0,0]],
[SIDING,[ 3/8, 6, 48 ],[0,5.3125,0]],
[SIDING,[ 3/8, 6, 48 ],[0,10.625,0]],
[SIDING,[ 3/8, 6, 48 ],[0,15.9375,0]],
[SIDING,[ 3/8, 6, 48 ],[0,21.25,0]],
[SIDING,[ 3/8, 6, 48 ],[0,26.5625,0]],
[SIDING,[ 3/8, 6, 48 ],[0,31.875,0]],
[SIDING,[ 3/8, 6, 48 ],[0,37.1875,0]],
[SIDING,[ 3/8, 6, 48 ],[0,42.5,0]],
[SIDING,[ 3/8, 6, 48 ],[0,47.8125,0]],
[SIDING,[ 3/8, 6, 48 ],[0,53.125,0]],
[SIDING,[ 3/8, 6, 48 ],[0,58.4375,0]],
[SIDING,[ 3/8, 6, 48 ],[0,63.75,0]],
[SIDING,[ 3/8, 6, 48 ],[0,69.0625,0]],
[SIDING,[ 3/8, 6, 48 ],[0,74.375,0]],
[SIDING,[ 3/8, 6, 48 ],[0,79.6875,0]],
[SIDING,[ 3/8, 6, 48 ],[0,85,0]],
], [ wlength+5/8, -4, 0 ],[ 0, 0, 0 ]]},

{sideing_back: [[
[SIDING,[ 3/8, 6, 84 ],[0,0,0]],
[SIDING,[ 3/8, 6, 84 ],[0,5.3125,0]],
[SIDING,[ 3/8, 6, 84 ],[0,10.625,0]],
[SIDING,[ 3/8, 6, 84 ],[0,15.9375,0]],
[SIDING,[ 3/8, 6, 84 ],[0,21.25,0]],
[SIDING,[ 3/8, 6, 84 ],[0,26.5625,0]],
[SIDING,[ 3/8, 6, 84 ],[0,31.875,0]],
[SIDING,[ 3/8, 6, 84 ],[0,37.1875,0]],
[SIDING,[ 3/8, 6, 84 ],[0,42.5,0]],
[SIDING,[ 3/8, 6, 84 ],[0,47.8125,0]],
[SIDING,[ 3/8, 6, 84 ],[0,53.125,0]],
[SIDING,[ 3/8, 6, 84 ],[0,58.4375,0]],
[SIDING,[ 3/8, 6, 84 ],[0,63.75,0]],
[SIDING,[ 3/8, 6, 84 ],[0,69.0625,0]],
[SIDING,[ 3/8, 6, 84 ],[0,74.375,0]],
[SIDING,[ 3/8, 6, 84 ],[0,79.6875,0]],
[SIDING,[ 3/8, 6, 84 ],[0,85,0]],
], [ 0, -3/8, 0 ],[ 0, Math.PI/2, 0 ]]},

{siding_front_left: [[
[SIDING,[ 3/8, 6, 12  ],[0,0,0]],
[SIDING,[ 3/8, 6, 12  ],[0,5.333333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,10.666666666666666,0]],
[SIDING,[ 3/8, 6, 12  ],[0,16,0]],
[SIDING,[ 3/8, 6, 12  ],[0,21.333333333333332,0]],
[SIDING,[ 3/8, 6, 12  ],[0,26.666666666666664,0]],
[SIDING,[ 3/8, 6, 12  ],[0,32,0]],
[SIDING,[ 3/8, 6, 12  ],[0,37.33333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,42.666666666666664,0]],
[SIDING,[ 3/8, 6, 12  ],[0,48,0]],
[SIDING,[ 3/8, 6, 12  ],[0,53.33333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,58.666666666666664,0]],
[SIDING,[ 3/8, 6, 12  ],[0,64,0]],
[SIDING,[ 3/8, 6, 12  ],[0,69.33333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,74.66666666666666,0]],
[SIDING,[ 3/8, 6, 12  ],[0,80,0]],
], [ 0, -4, 48+5/8 ],[ 0, Math.PI/2, 0 ]]},
{siding_front_right: [[
[SIDING,[ 3/8, 6, 12  ],[0,0,0]],
[SIDING,[ 3/8, 6, 12  ],[0,5.333333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,10.666666666666666,0]],
[SIDING,[ 3/8, 6, 12  ],[0,16,0]],
[SIDING,[ 3/8, 6, 12  ],[0,21.333333333333332,0]],
[SIDING,[ 3/8, 6, 12  ],[0,26.666666666666664,0]],
[SIDING,[ 3/8, 6, 12  ],[0,32,0]],
[SIDING,[ 3/8, 6, 12  ],[0,37.33333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,42.666666666666664,0]],
[SIDING,[ 3/8, 6, 12  ],[0,48,0]],
[SIDING,[ 3/8, 6, 12  ],[0,53.33333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,58.666666666666664,0]],
[SIDING,[ 3/8, 6, 12  ],[0,64,0]],
[SIDING,[ 3/8, 6, 12  ],[0,69.33333333333333,0]],
[SIDING,[ 3/8, 6, 12  ],[0,74.66666666666666,0]],
[SIDING,[ 3/8, 6, 12  ],[0,80,0]],
], [ wlength-12, -4, 48+5/8 ],[ 0, Math.PI/2, 0 ]]},
]],

};