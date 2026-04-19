// Auto-generated Spine to AE import script
(function() {
app.beginUndoGroup("Spine Import");
try {

var comp = app.project.items.addComp("SunFlower", 712, 719, 1, 3, 30);
comp.openInViewer();

var footageFolder = app.project.items.addFolder("Spine Footage");
var texDir = "F:/Code/AE/spineToAE/spine-files/向日葵/texture";
var ftg = {};
function imp(n) {
  var f = new File(texDir + "/" + n + ".png");
  if (!f.exists) return null;
  var item = app.project.importFile(new ImportOptions(f));
  item.parentFolder = footageFolder;
  return item;
}
ftg["SunFlower_rightpetal2"] = imp("SunFlower_rightpetal2");
ftg["PeaShooter_frontleaf_right_tip"] = imp("PeaShooter_frontleaf_right_tip");
ftg["SunFlower_toppetals"] = imp("SunFlower_toppetals");
ftg["SunFlower_leftpetal6"] = imp("SunFlower_leftpetal6");
ftg["PeaShooter_frontleaf_left_tip"] = imp("PeaShooter_frontleaf_left_tip");
ftg["PeaShooter_frontleaf"] = imp("PeaShooter_frontleaf");
ftg["SunFlower_head"] = imp("SunFlower_head");
ftg["SunFlower_head2"] = imp("SunFlower_head2");
ftg["SunFlower_leftpetal3"] = imp("SunFlower_leftpetal3");
ftg["sunflower-yawn"] = imp("sunflower-yawn");
ftg["sunflower_exhale"] = imp("sunflower_exhale");
ftg["sunflower_inhale"] = imp("sunflower_inhale");
ftg["SunFlower_leftpetal1"] = imp("SunFlower_leftpetal1");
ftg["SunFlower_blink1"] = imp("SunFlower_blink1");
ftg["SunFlower_blink2"] = imp("SunFlower_blink2");
ftg["SunFlower_blink3"] = imp("SunFlower_blink3");
ftg["SunFlower_head_sing2"] = imp("SunFlower_head_sing2");
ftg["SunFlower_leftpetal5"] = imp("SunFlower_leftpetal5");
ftg["SunFlower_head_sing1"] = imp("SunFlower_head_sing1");
ftg["PeaShooter_backleaf_lefttip"] = imp("PeaShooter_backleaf_lefttip");
ftg["SunFlower_rightpetal3"] = imp("SunFlower_rightpetal3");
ftg["SunFlower_rightpetal9"] = imp("SunFlower_rightpetal9");
ftg["SunFlower_leftpetal4"] = imp("SunFlower_leftpetal4");
ftg["SunFlower_rightpetal7"] = imp("SunFlower_rightpetal7");
ftg["SunFlower_leftpetal8"] = imp("SunFlower_leftpetal8");
ftg["SunFlower_rightpetal6"] = imp("SunFlower_rightpetal6");
ftg["SunFlower_head_sing4"] = imp("SunFlower_head_sing4");
ftg["PeaShooter_backleaf_righttip"] = imp("PeaShooter_backleaf_righttip");
ftg["SunFlower_leftpetal2"] = imp("SunFlower_leftpetal2");
ftg["SunFlower_leftpetal7"] = imp("SunFlower_leftpetal7");
ftg["SunFlower_rightpetal8"] = imp("SunFlower_rightpetal8");
ftg["SunFlower_rightpetal5"] = imp("SunFlower_rightpetal5");
ftg["SunFlower_head_wink"] = imp("SunFlower_head_wink");
ftg["PeaShooter_stalk"] = imp("PeaShooter_stalk");
ftg["SunFlower_rightpetal4"] = imp("SunFlower_rightpetal4");
ftg["SunFlower_head_sing5"] = imp("SunFlower_head_sing5");
ftg["SunFlower_head_sing3"] = imp("SunFlower_head_sing3");
ftg["SunFlower_bottompetals"] = imp("SunFlower_bottompetals");
ftg["Tween 3"] = imp("Tween 3");
ftg["SunFlower_rightpetal1"] = imp("SunFlower_rightpetal1");

var BL = {};
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:root";
  n.label = 1;
  BL["root"] = n;
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([392.49,487.34999999999997]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:head";
  n.label = 1;
  BL["head"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([24.56,-135.77]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:anim_idle";
  n.label = 1;
  BL["anim_idle"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([41.7,55.92]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,89]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:anim_blink";
  n.label = 1;
  BL["anim_blink"] = n;
  n.parent = BL["anim_idle"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([60,25.76]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([79.999,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_toppetals";
  n.label = 1;
  BL["SunFlower_toppetals"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([43.45,-31.08]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal1";
  n.label = 1;
  BL["SunFlower_rightpetal1"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([86.45,-24.58]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([79.999,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal2";
  n.label = 1;
  BL["SunFlower_rightpetal2"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([114.7,-11.829999999999998]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.24,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal3";
  n.label = 1;
  BL["SunFlower_rightpetal3"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([137.2,2.6700000000000017]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal4";
  n.label = 1;
  BL["SunFlower_rightpetal4"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([159.45,22.17]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal5";
  n.label = 1;
  BL["SunFlower_rightpetal5"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([169.2,53.92]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.24,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal6";
  n.label = 1;
  BL["SunFlower_rightpetal6"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([158.2,83.92]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.24,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal7";
  n.label = 1;
  BL["SunFlower_rightpetal7"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([138.2,111.42]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.284,86.746]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal8";
  n.label = 1;
  BL["SunFlower_rightpetal8"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([115.95,126.42]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.284,86.746]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_rightpetal9";
  n.label = 1;
  BL["SunFlower_rightpetal9"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([92.95,140.67000000000002]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([79.999,86.746]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_bottompetals";
  n.label = 1;
  BL["SunFlower_bottompetals"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([40.7,147.39]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([79.999,98.518]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal1";
  n.label = 1;
  BL["SunFlower_leftpetal1"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([2.450000000000003,-26.58]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([79.999,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal2";
  n.label = 1;
  BL["SunFlower_leftpetal2"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-23.299999999999997,-15.079999999999998]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal3";
  n.label = 1;
  BL["SunFlower_leftpetal3"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-53.55,8.170000000000002]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.55099999999999,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal4";
  n.label = 1;
  BL["SunFlower_leftpetal4"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-76.05,31.17]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.55099999999999,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal5";
  n.label = 1;
  BL["SunFlower_leftpetal5"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-88.05000000000001,68.92]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.55099999999999,79.999]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal6";
  n.label = 1;
  BL["SunFlower_leftpetal6"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-74.05,104.17]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([80.649,86.746]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal7";
  n.label = 1;
  BL["SunFlower_leftpetal7"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-45.8,128.42000000000002]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([101,108]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:SunFlower_leftpetal8";
  n.label = 1;
  BL["SunFlower_leftpetal8"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-10.299999999999997,144.42000000000002]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([79.999,86.746]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:frontleaf_left_tip";
  n.label = 1;
  BL["frontleaf_left_tip"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-43.239999999999995,37.15]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([55.54,55.54]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:frontleaf_right_tip";
  n.label = 1;
  BL["frontleaf_right_tip"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([130.26,10.649999999999999]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([55.54,55.54]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:frontleaf";
  n.label = 1;
  BL["frontleaf"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([37.26,16.4]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([55.54,55.54]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:backleaf_right_tip";
  n.label = 1;
  BL["backleaf_right_tip"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([81.26,-31.349999999999994]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([55.54,55.54]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:backleaf_left_tip";
  n.label = 1;
  BL["backleaf_left_tip"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-26.489999999999995,-23.599999999999994]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([55.54,55.54]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:backleaf";
  n.label = 1;
  BL["backleaf"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([25.76,-14.849999999999994]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:stem";
  n.label = 1;
  BL["stem"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([47.85,20.03]);
  t.property("Rotation").setValue(-118.61);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:stem_mid";
  n.label = 1;
  BL["stem_mid"] = n;
  n.parent = BL["stem"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([99.22999999999999,49.9999971]);
  t.property("Rotation").setValue(28.8);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:mouth";
  n.label = 1;
  BL["mouth"] = n;
  n.parent = BL["head"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([63.980000000000004,82.50999999999999]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(3);
  n.name = "bone:eye-translation";
  n.label = 1;
  BL["eye-translation"] = n;
  n.parent = BL["anim_blink"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([55.66,57.05]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();

var SL = {};
SL["backleaf"] = {};
(function(){
  var fg = ftg["Tween 3"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "backleaf/Tween 3";
  ly.label = 9;
  ly.parent = BL["backleaf"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+5, 50+0]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["backleaf"]["Tween 3"] = ly;
})();
SL["backleaf_left_tip"] = {};
(function(){
  var fg = ftg["PeaShooter_backleaf_lefttip"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "backleaf_left_tip/PeaShooter_backleaf_lefttip";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.5797112500000001, fg.height*0.45646875000000003]);
  t.property("Position").setValue([356,359.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:backleaf\").toComp([50+(-31.9725),50+(-16.635)]);\nvar b1=thisComp.layer(\"bone:backleaf_left_tip\").toComp([50+(-7.5225),50+(-2.5575)]);\nb0*0.5+b1*0.5;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:backleaf\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:backleaf\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:backleaf_left_tip\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:backleaf_left_tip\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.5+a1*0.5-(0))*180/Math.PI;";
  t.property("Scale").setValue([49.95703466666666,50.56845333333333]);
  t.property("Opacity").setValue(100);
  SL["backleaf_left_tip"]["PeaShooter_backleaf_lefttip"] = ly;
})();
SL["backleaf_right_tip"] = {};
(function(){
  var fg = ftg["PeaShooter_backleaf_righttip"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "backleaf_right_tip/PeaShooter_backleaf_righttip";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.3880775, fg.height*0.55316125]);
  t.property("Position").setValue([356,359.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:backleaf_right_tip\").toComp([50+(19.6981),50+(-11.657)]);\nvar b1=thisComp.layer(\"bone:backleaf\").toComp([50+(48.0855),50+(-15.7778)]);\nb0*0.3754+b1*0.6246;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:backleaf_right_tip\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:backleaf_right_tip\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:backleaf\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:backleaf\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.3754+a1*0.6246-(0))*180/Math.PI;";
  t.property("Scale").setValue([50.675423333333335,48.896592]);
  t.property("Opacity").setValue(100);
  SL["backleaf_right_tip"]["PeaShooter_backleaf_righttip"] = ly;
})();
SL["PeaShooter_stalk"] = {};
(function(){
  var fg = ftg["PeaShooter_stalk"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "PeaShooter_stalk/PeaShooter_stalk";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.5120754545454546, fg.height*0.5568136363636363]);
  t.property("Position").setValue([356,359.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:stem_mid\").toComp([50+(28.8324),50+(-5.4712)]);\nvar b1=thisComp.layer(\"bone:stem\").toComp([50+(16.6907),50+(3.9257)]);\nb0*0.4943+b1*0.5057;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:stem_mid\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:stem_mid\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:stem\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:stem\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.4943+a1*0.5057-(-1.8217))*180/Math.PI;";
  t.property("Scale").setValue([72.93312484690527,53.60173883776058]);
  t.property("Opacity").setValue(100);
  SL["PeaShooter_stalk"]["PeaShooter_stalk"] = ly;
})();
SL["frontleaf"] = {};
(function(){
  var fg = ftg["PeaShooter_frontleaf"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "frontleaf/PeaShooter_frontleaf";
  ly.label = 9;
  ly.parent = BL["frontleaf"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+-1, 50+3]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["frontleaf"]["PeaShooter_frontleaf"] = ly;
})();
SL["frontleaf_right_tip"] = {};
(function(){
  var fg = ftg["PeaShooter_frontleaf_right_tip"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "frontleaf_right_tip/PeaShooter_frontleaf_right_tip";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.36202, fg.height*0.50385875]);
  t.property("Position").setValue([356,359.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:frontleaf\").toComp([50+(140.25),50+(-35)]);\nvar b1=thisComp.layer(\"bone:frontleaf_right_tip\").toComp([50+(9.0067),50+(8.3033)]);\nb0*0.25+b1*0.75;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:frontleaf\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:frontleaf\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:frontleaf_right_tip\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:frontleaf_right_tip\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.25+a1*0.75-(0))*180/Math.PI;";
  t.property("Scale").setValue([53.005069333333324,52.435887741935474]);
  t.property("Opacity").setValue(100);
  SL["frontleaf_right_tip"]["PeaShooter_frontleaf_right_tip"] = ly;
})();
SL["frontleaf_left_tip"] = {};
(function(){
  var fg = ftg["PeaShooter_frontleaf_left_tip"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "frontleaf_left_tip/PeaShooter_frontleaf_left_tip";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.47846, fg.height*0.5338877777777778]);
  t.property("Position").setValue([356,359.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:frontleaf\").toComp([50+(-122.29),50+(14.27)]);\nvar b1=thisComp.layer(\"bone:frontleaf_left_tip\").toComp([50+(-26.2983),50+(27.725)]);\nb0*0.3333+b1*0.6667;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:frontleaf\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:frontleaf\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:frontleaf_left_tip\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:frontleaf_left_tip\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.3333+a1*0.6667-(0))*180/Math.PI;";
  t.property("Scale").setValue([53.16722181818182,55.54017655172413]);
  t.property("Opacity").setValue(100);
  SL["frontleaf_left_tip"]["PeaShooter_frontleaf_left_tip"] = ly;
})();
SL["SunFlower_leftpetal8"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal8"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal8/SunFlower_leftpetal8";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal8"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.25, 50+1.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal8"]["SunFlower_leftpetal8"] = ly;
})();
SL["SunFlower_leftpetal7"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal7"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal7/SunFlower_leftpetal7";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal7"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.75, 50+1]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal7"]["SunFlower_leftpetal7"] = ly;
})();
SL["SunFlower_leftpetal6"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal6"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal6/SunFlower_leftpetal6";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal6"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.75, 50+1]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal6"]["SunFlower_leftpetal6"] = ly;
})();
SL["SunFlower_leftpetal5"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal5"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal5/SunFlower_leftpetal5";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal5"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+-1.25, 50+-1.5]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal5"]["SunFlower_leftpetal5"] = ly;
})();
SL["SunFlower_leftpetal4"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal4"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal4/SunFlower_leftpetal4";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal4"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.75, 50+1]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal4"]["SunFlower_leftpetal4"] = ly;
})();
SL["SunFlower_leftpetal3"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal3"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal3/SunFlower_leftpetal3";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal3"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.75, 50+1.75]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal3"]["SunFlower_leftpetal3"] = ly;
})();
SL["SunFlower_leftpetal2"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal2"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal2/SunFlower_leftpetal2";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal2"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+2.5, 50+2.5]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal2"]["SunFlower_leftpetal2"] = ly;
})();
SL["SunFlower_leftpetal1"] = {};
(function(){
  var fg = ftg["SunFlower_leftpetal1"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_leftpetal1/SunFlower_leftpetal1";
  ly.label = 9;
  ly.parent = BL["SunFlower_leftpetal1"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+1.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_leftpetal1"]["SunFlower_leftpetal1"] = ly;
})();
SL["SunFlower_bottompetals"] = {};
(function(){
  var fg = ftg["SunFlower_bottompetals"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_bottompetals/SunFlower_bottompetals";
  ly.label = 9;
  ly.parent = BL["SunFlower_bottompetals"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+3.75, 50+1.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_bottompetals"]["SunFlower_bottompetals"] = ly;
})();
SL["SunFlower_rightpetal9"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal9"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal9/SunFlower_rightpetal9";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal9"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+-4.1]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal9"]["SunFlower_rightpetal9"] = ly;
})();
SL["SunFlower_rightpetal8"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal8"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal8/SunFlower_rightpetal8";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal8"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+-0.43536]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal8"]["SunFlower_rightpetal8"] = ly;
})();
SL["SunFlower_rightpetal7"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal7"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal7/SunFlower_rightpetal7";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal7"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+1.5]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal7"]["SunFlower_rightpetal7"] = ly;
})();
SL["SunFlower_rightpetal6"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal6"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal6/SunFlower_rightpetal6";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal6"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+1.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal6"]["SunFlower_rightpetal6"] = ly;
})();
SL["SunFlower_rightpetal5"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal5"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal5/SunFlower_rightpetal5";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal5"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+1]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal5"]["SunFlower_rightpetal5"] = ly;
})();
SL["SunFlower_rightpetal4"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal4"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal4/SunFlower_rightpetal4";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal4"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.75, 50+2.5]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal4"]["SunFlower_rightpetal4"] = ly;
})();
SL["SunFlower_rightpetal3"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal3"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal3/SunFlower_rightpetal3";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal3"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.75, 50+4.75]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal3"]["SunFlower_rightpetal3"] = ly;
})();
SL["SunFlower_rightpetal2"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal2"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal2/SunFlower_rightpetal2";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal2"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+1]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal2"]["SunFlower_rightpetal2"] = ly;
})();
SL["SunFlower_rightpetal1"] = {};
(function(){
  var fg = ftg["SunFlower_rightpetal1"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_rightpetal1/SunFlower_rightpetal1";
  ly.label = 9;
  ly.parent = BL["SunFlower_rightpetal1"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.5, 50+1.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_rightpetal1"]["SunFlower_rightpetal1"] = ly;
})();
SL["SunFlower_toppetals"] = {};
(function(){
  var fg = ftg["SunFlower_toppetals"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_toppetals/SunFlower_toppetals";
  ly.label = 9;
  ly.parent = BL["SunFlower_toppetals"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+4.5, 50+2]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_toppetals"]["SunFlower_toppetals"] = ly;
})();
SL["anim_idle"] = {};
(function(){
  var fg = ftg["SunFlower_head"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "anim_idle/SunFlower_head";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1, 50+-2.25]);
  t.property("Rotation").setValue(-0.47359);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["anim_idle"]["SunFlower_head"] = ly;
})();
(function(){
  var fg = ftg["SunFlower_head2"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "anim_idle/SunFlower_head2";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1, 50+-2.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(0);
  SL["anim_idle"]["SunFlower_head2"] = ly;
})();
SL["anim_blink"] = {};
(function(){
  var fg = ftg["SunFlower_blink1"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "anim_blink/SunFlower_blink1";
  ly.label = 9;
  ly.parent = BL["anim_blink"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+2.2, 50+6.5]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(0);
  SL["anim_blink"]["SunFlower_blink1"] = ly;
})();
(function(){
  var fg = ftg["SunFlower_blink2"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "anim_blink/SunFlower_blink2";
  ly.label = 9;
  ly.parent = BL["anim_blink"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+2.2, 50+6.8]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(0);
  SL["anim_blink"]["SunFlower_blink2"] = ly;
})();
(function(){
  var fg = ftg["SunFlower_blink3"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "anim_blink/SunFlower_blink3";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.5079062500000001, fg.height*0.49834375000000003]);
  t.property("Position").setValue([356,359.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:head\").toComp([50+(4.4074),50+(-11.7258)]);\nvar b1=thisComp.layer(\"bone:eye-translation\").toComp([50+(-2.2656),50+(-1.6063)]);\nb0*0.8168+b1*0.1832;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:head\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:head\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:eye-translation\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:eye-translation\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.8168+a1*0.1832-(0))*180/Math.PI;";
  t.property("Scale").setValue([80,71.2]);
  t.property("Opacity").setValue(0);
  SL["anim_blink"]["SunFlower_blink3"] = ly;
})();
SL["sunflower-mouth"] = {};
(function(){
  var fg = ftg["sunflower-yawn"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "sunflower-mouth/sunflower-yawn";
  ly.label = 9;
  ly.parent = BL["mouth"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+-3.51, 50+4.08]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(0);
  SL["sunflower-mouth"]["sunflower-yawn"] = ly;
})();
(function(){
  var fg = ftg["sunflower_exhale"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "sunflower-mouth/sunflower_exhale";
  ly.label = 9;
  ly.parent = BL["mouth"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+-3.51, 50+4.08]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([135,135]);
  t.property("Opacity").setValue(0);
  SL["sunflower-mouth"]["sunflower_exhale"] = ly;
})();
(function(){
  var fg = ftg["sunflower_inhale"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "sunflower-mouth/sunflower_inhale";
  ly.label = 9;
  ly.parent = BL["mouth"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+-3.51, 50+4.08]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(0);
  SL["sunflower-mouth"]["sunflower_inhale"] = ly;
})();
SL["SunFlower_head_sing1"] = {};
(function(){
  var fg = ftg["SunFlower_head_sing1"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_head_sing1/SunFlower_head_sing1";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+1.32, 50+-1.97]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_head_sing1"]["SunFlower_head_sing1"] = ly;
})();
SL["SunFlower_head_sing2"] = {};
(function(){
  var fg = ftg["SunFlower_head_sing2"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_head_sing2/SunFlower_head_sing2";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.99998, 50+-1.97]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_head_sing2"]["SunFlower_head_sing2"] = ly;
})();
SL["SunFlower_head_sing3"] = {};
(function(){
  var fg = ftg["SunFlower_head_sing3"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_head_sing3/SunFlower_head_sing3";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.99998, 50+-1.97]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_head_sing3"]["SunFlower_head_sing3"] = ly;
})();
SL["SunFlower_head_sing4"] = {};
(function(){
  var fg = ftg["SunFlower_head_sing4"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_head_sing4/SunFlower_head_sing4";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.99998, 50+-1.97]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_head_sing4"]["SunFlower_head_sing4"] = ly;
})();
SL["SunFlower_head_sing5"] = {};
(function(){
  var fg = ftg["SunFlower_head_sing5"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_head_sing5/SunFlower_head_sing5";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.99996, 50+-1.97]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_head_sing5"]["SunFlower_head_sing5"] = ly;
})();
SL["SunFlower_head_wink"] = {};
(function(){
  var fg = ftg["SunFlower_head_wink"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 3);
  ly.name = "SunFlower_head_wink/SunFlower_head_wink";
  ly.label = 9;
  ly.parent = BL["anim_idle"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.99996, 50+-1.97]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["SunFlower_head_wink"]["SunFlower_head_wink"] = ly;
})();

// === Animation: idle ===
(function(){
  var p = BL["SunFlower_rightpetal3"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[137.2,2.6700000000000017],[142.95,-0.5799999999999983],[154.95,-29.08],[163.45,-31.83],[177.45,-30.08],[196.2,1.6700100000000049],[192.95,4.670000000000002],[178.7,-25.83],[164.7,-33.08],[155.95,-35.83],[137.2,2.6700000000000017]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal3"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[100,100],[102,100],[101,100],[99.732,100],[102,97.722],[99.723,103],[100,102],[99.7,100],[99.7,100],[101,123],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal3" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_toppetals"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[43.45,-31.08],[45.95,-44.83],[57.2,-70.83],[68.45,-72.08],[83.7,-72.58],[101.2,-35.83],[97.45,-32.83],[82.45,-67.58],[68.45,-79.82999999999998],[59.7,-71.58],[43.45,-31.08]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_toppetals"].property("Transform").property("Scale");
  var ts = [0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[100,100],[102,100],[100,113.99999999999999],[100,144],[100,103],[100,102],[100,100],[100,100],[100,138],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(7, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_toppetals" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["backleaf_right_tip"].property("Transform").property("Position");
  var ts = [0,0.41667,0.91667,1.5,2];
  var vs = [[81.26,-31.349999999999994],[87.01,-19.349999999999994],[94.43,-25.64],[87.01,-19.349999999999994],[81.76001000000001,-31.349999999999994]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["backleaf_right_tip"].property("Transform").property("Scale");
  var ts = [0,0.41667,0.91667,1.5,2];
  var vs = [[55.54,55.54],[66.648,44.248718],[63.871,58.31700000000001],[66.648,44.248718],[55.54,55.54]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
// Bone "backleaf_right_tip" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["stem_mid"].property("Transform").property("Rotation");
  var ts = [0.51667,1,1.48,2];
  var vs = [28.8,34.8,28.3,28.8];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["stem_mid"].property("Transform").property("Position");
  var ts = [0,0.21667,0.33333,0.51667,1.02,1.62,2];
  var vs = [[99.22999999999999,49.9999971],[112.86999999999999,52.1299971],[114.99,49.9999971],[114.99,44.8999971],[108.1,46.6199971],[119.16999999999999,48.6799971],[99.22999999999999,49.9999971]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_bottompetals"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[40.7,147.39],[44.49,142.14],[55.45,125.14],[66.2,120.14],[81.45,125.64],[98.45,145.14],[95.7,145.39],[80.2,128.39],[66.7,123.64],[57.45,121.89],[40.7,147.39]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_bottompetals"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[79.999,98.518],[80.79899,96.72989829999999],[81.59898,79.99858635999999],[79.999,79.99858635999999],[79.999,76.8243364],[79.999,87.21010396],[79.999,91.32914154],[79.999,79.99858635999999],[79.999,79.99858635999999],[79.999,81.62807407999999],[79.999,98.518]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_bottompetals" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_leftpetal4"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-76.05,31.17],[-72.05,27.67],[-64.3,5.420000000000002],[-51.05,-1.0799999999999983],[-32.989999999999995,-1.759999999999998],[-18.299999999999997,30.42],[-22.049999999999997,39.92],[-37.05,10.170000000000002],[-51.05,5.420000000000002],[-58.55,2.9200000000000017],[-76.05,31.17]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal4"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.55099999999999,79.999],[82.96753,79.999],[83.77304,79.999],[80.02419646,79.999],[80.02580748,89.59888000000001],[80.01694687,82.39897],[80.46078288,81.59898],[79.99842014,79.999],[79.99842014,79.999],[80.37700983999999,78.53101835000001],[80.55099999999999,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal4" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal2"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[114.7,-11.829999999999998],[119.7,-19.58],[129.7,-49.58],[138.45,-51.58],[154.95,-50.83],[172.45,-16.08],[168.7,-11.079999999999998],[153.7,-44.83],[139.7,-54.58],[130.95,-51.33],[114.7,-11.829999999999998]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal2"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.24,79.999],[81.8448,79.999],[81.0424,79.999],[80.0249568,79.999],[80.24,82.39897],[80.01693279999999,82.39897],[80.24,81.59898],[79.99928,79.999],[79.99928,79.999],[80.03217839999999,87.19891000000001],[80.24,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal2" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["backleaf_left_tip"].property("Transform").property("Position");
  var ts = [0,0.41667,0.91667,1.5,2];
  var vs = [[-26.489999999999995,-23.599999999999994],[-25.739989999999995,-14.599999999999994],[-26.989989999999995,-15.349999999999994],[-25.739989999999995,-14.599999999999994],[-26.489999999999995,-23.599999999999994]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["backleaf_left_tip"].property("Transform").property("Scale");
  var ts = [0,0.41667,0.91667,1.5,2];
  var vs = [[55.54,55.54],[60.53860000000001,44.267046199999996],[66.648,63.315599999999996],[60.53860000000001,44.267046199999996],[55.54,55.54]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
// Bone "backleaf_left_tip" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["frontleaf_left_tip"].property("Transform").property("Rotation");
  var ts = [0,0.5,1,1.5,2];
  var vs = [0,8.28,0,8.28,0];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["frontleaf_left_tip"].property("Transform").property("Position");
  var ts = [0,0.5,1,1.5,2];
  var vs = [[-43.239999999999995,37.15],[-43.49001,33.9],[-46.05,41.230000000000004],[-43.49001,33.9],[-43.239999999999995,37.15]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["frontleaf_left_tip"].property("Transform").property("Scale");
  var ts = [0,0.5,1,1.5,2];
  var vs = [[55.54,55.54],[66.0926,64.9818],[57.7616,58.31700000000001],[66.0926,64.9818],[55.54,55.54]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
// Bone "frontleaf_left_tip" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["frontleaf_right_tip"].property("Transform").property("Rotation");
  var ts = [0,0.5,1,1.5,2];
  var vs = [0,-9.28,0,-9.28,0];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["frontleaf_right_tip"].property("Transform").property("Position");
  var ts = [0,0.5,1,1.5,2];
  var vs = [[130.26,10.649999999999999],[137.26,2.6499999999999986],[140.48,18.89],[137.26,2.6499999999999986],[130.26,10.649999999999999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["frontleaf_right_tip"].property("Transform").property("Scale");
  var ts = [0,0.5,1,1.5,2];
  var vs = [[55.54,55.54],[72.7574,64.9818],[59.983200000000004,53.53833840000001],[72.7574,64.9818],[55.54,55.54]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
// Bone "frontleaf_right_tip" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_leftpetal2"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-23.299999999999997,-15.079999999999998],[-19.549999999999997,-22.58],[-11.799999999999997,-49.83],[0.45000000000000284,-52.83],[14.450000000000003,-49.33],[33.2,-19.33],[29.450000000000003,-11.829999999999998],[14.450000000000003,-42.83],[0.45000000000000284,-52.58],[-8.299999999999997,-46.33],[-23.299999999999997,-15.079999999999998]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal2"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[100,100],[101,100],[102,100],[100,100],[100,114.99999999999999],[100,103],[101,102],[100,100],[100,100],[100,103],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal2" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_leftpetal5"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-88.05000000000001,68.92],[-84.05000000000001,65.42],[-76.30000000000001,41.92],[-63.05000000000001,34.92],[-44.94000000000001,33.71],[-30.30000000000001,67.67],[-31.62000000000001,76.95],[-49.05000000000001,46.42],[-63.05000000000001,41.67],[-71.80000000000001,35.5],[-88.05000000000001,68.92]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal5"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.55099999999999,79.999],[82.96753,79.999],[83.77304,79.999],[80.02419646,79.999],[83.77304,81.59898],[80.01694687,82.39897],[88.6061,81.59898],[79.99842014,79.999],[79.99842014,79.999],[80.55099999999999,81.59898],[80.55099999999999,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal5" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal1"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[86.45,-24.58],[91.2,-35.08],[100.95,-63.58],[111.45,-64.58],[126.7,-61.58],[144.2,-28.33],[140.45,-24.58],[125.45,-58.58],[111.45,-68.33],[102.7,-62.58],[86.45,-24.58]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal1"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[79.999,79.999],[80.79899,79.999],[81.59898,79.999],[79.999,79.999],[79.999,93.59882999999999],[79.999,82.39897],[79.999,81.59898],[79.999,79.999],[79.999,79.999],[79.999,100.79874],[79.999,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal1" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal7"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[138.2,111.42],[143.45,105.67],[153.7,87.67],[163.2,84.92],[178.45,88.17],[193.45,110.67001],[190.45,112.17001],[177.2,90.92],[163.2,86.17],[154.45,80.92],[138.2,111.42]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal7"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.284,86.746],[81.88968,84.49667622],[81.88968,79.99889612000001],[80.02468268,79.99889612000001],[79.9989918,81.70865978],[80.01665428,96.28806],[80.284,91.0833],[79.9989918,79.99889612000001],[79.9989918,79.99889612000001],[80.03351392,81.62798599999999],[80.284,86.746]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal7" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal8"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[115.95,126.42],[120.95,122.42],[130.95,104.67],[140.95,99.92],[156.2,103.92],[173.7,126.64423000000001],[169.7,125.39],[154.95,106.42],[140.95,101.67],[132.2,97.17],[115.95,126.42]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal8"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.284,86.746],[81.88968,88.48092000000001],[81.08684000000001,79.99889612000001],[80.02468268,79.99889612000001],[79.9989918,81.70865978],[80.01665428,92.81822000000001],[80.284,95.42060000000001],[79.9989918,79.99889612000001],[79.9989918,79.99889612000001],[80.03351392,81.62798599999999],[80.284,86.746]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal8" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["stem"].property("Transform").property("Rotation");
  var ts = [0,1,2];
  var vs = [-118.61,-83.81,-118.61];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["stem"].property("Transform").property("Position");
  var ts = [0,1,2];
  var vs = [[47.85,20.03],[39.42,20.03],[47.85,20.03]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal7"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-45.8,128.42000000000002],[-41.8,122.42],[-33.55,100.67],[-20.799999999999997,95.92],[-5.549999999999997,99.42],[11.950000000000003,126.42],[8.200000000000003,131.17000000000002],[-6.799999999999997,106.42],[-20.799999999999997,101.67],[-29.549999999999997,102.17],[-45.8,128.42000000000002]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal7"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[101,108],[102.01,105.19956000000002],[102.01,99.59976000000002],[100.21927,99.59976000000002],[100.18695,111.24000000000001],[100.20917,94.81320000000001],[100.85759,103.82256000000001],[100.18695,99.59976000000002],[100.18695,99.59976000000002],[100.38693,101.62908000000002],[101,108]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal7" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal9"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[92.95,140.67000000000002],[97.7,134.92000000000002],[107.45,118.92],[117.95,114.17],[133.2,119.42],[149.45,140.11846],[146.2,139.34],[131.95,121.42],[117.95,116.67],[109.2,113.67],[92.95,140.67000000000002]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal9"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[79.999,86.746],[80.79899,88.48092000000001],[81.59898,79.99889612000001],[79.999,79.99889612000001],[79.999,81.70865978],[79.999,81.74856293999999],[79.999,87.61346],[79.999,79.99889612000001],[79.999,79.99889612000001],[79.999,81.62798599999999],[79.999,86.746]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal9" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_leftpetal8"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-10.299999999999997,144.42000000000002],[-6.049999999999997,138.17000000000002],[2.700000000000003,120.42],[14.700000000000003,116.17],[29.950000000000003,119.42],[47.45,143.42000000000002],[43.7,143.42000000000002],[28.700000000000003,125.92],[14.700000000000003,121.17],[5.950000000000003,120.92],[-10.299999999999997,144.42000000000002]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal8"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[79.999,86.746],[80.79899,88.48092000000001],[81.59898,79.99889612000001],[79.999,79.99889612000001],[79.999,76.82485998],[79.999,91.0833],[79.999,94.55314000000001],[79.999,79.99889612000001],[79.999,79.99889612000001],[79.999,81.62798599999999],[79.999,86.746]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal8" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_leftpetal1"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[2.450000000000003,-26.58],[6.950000000000003,-36.83],[15.700000000000003,-64.58],[27.450000000000003,-67.33],[42.7,-61.58],[60.2,-30.83],[56.45,-27.58],[41.45,-58.08],[27.450000000000003,-67.83],[18.700000000000003,-61.08],[2.450000000000003,-26.58]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal1"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[79.999,79.999],[80.79899,79.999],[81.59898,79.999],[79.999,79.999],[79.999,108.79864],[79.999,82.39897],[79.999,81.59898],[79.999,79.999],[79.999,79.999],[79.999,86.39892],[79.999,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal1" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_leftpetal6"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-74.05,104.17],[-68.05,97.67],[-62.05,75.92],[-49.05,69.42],[-30.15,68.44],[-13.259999999999998,101.95],[-16.299999999999997,106.67],[-35.05,80.67],[-49.05,75.92],[-55.98,70.51],[-74.05,104.17]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal6"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.649,86.746],[81.45549000000001,84.49667622],[81.45549000000001,79.99889612000001],[80.02477674000001,79.99889612000001],[93.55283999999999,83.91721294],[90.32688,82.4433984],[86.29443,81.62798599999999],[79.99896906000001,79.99889612000001],[79.99896906000001,79.99889612000001],[93.55283999999999,81.62798599999999],[80.649,86.746]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal6" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal5"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[169.2,53.92],[174.7,54.42001],[184.95,31.92],[194.2,28.92],[209.45,27.67],[226.95,60.17],[223.2,66.42],[208.2,34.17],[194.2,29.42],[185.45,22.17],[169.2,53.92]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal5"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.24,79.999],[83.4496,79.999],[85.0544,79.999],[80.0249568,79.999],[81.0424,81.59898],[80.01693279999999,82.39897],[80.24,81.59898],[79.99928,79.999],[79.99928,79.999],[81.0424,81.59898],[80.24,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal5" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal6"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[158.2,83.92],[163.7,83.42001],[175.2,62.92],[184.45,59.42],[199.7,61.67],[214.7,88.17],[210.2,93.42],[198.45,64.92],[184.45,60.17],[175.7,53.67],[158.2,83.92]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal6"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.24,79.999],[82.6472,79.999],[83.4496,79.999],[80.0249568,79.999],[82.6472,81.59898],[80.24,105.59868000000002],[80.24,97.59877999999999],[79.99928,79.999],[79.99928,79.999],[80.0337832,81.59898],[80.24,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal6" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["anim_idle"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[41.7,55.92],[47.2,46.67],[57.95,28.42],[66.7,25.92],[81.95,28.17],[99.45,54.67],[95.7,51.92],[80.7,31.92],[65.7,24.42],[57.95,28.42],[41.7,55.92]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["anim_idle"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[100,89],[100,92.56],[100,99.68],[100,101.46],[100,105.91],[100,88.95461],[100,92.56],[100,99.68],[100,105.91],[100,99.68],[100,89]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["frontleaf"].property("Transform").property("Position");
  var ts = [0,0.5,1,1.5,2];
  var vs = [[37.26,16.4],[38.01001,12.399999999999999],[39.01,20.4],[38.01001,12.399999999999999],[37.26,16.4]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["frontleaf"].property("Transform").property("Scale");
  var ts = [0,0.5,1,1.5,2];
  var vs = [[55.54,55.54],[57.20620000000001,63.871],[59.983200000000004,48.7346838],[57.20620000000001,63.871],[55.54,55.54]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal3"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[-53.55,8.170000000000002],[-49.55,2.9200000000000017],[-42.55,-24.58],[-29.799999999999997,-32.08],[-13.86,-27.33],[2.950000000000003,-1.5799999999999983],[-0.7999999999999972,5.420000000000002],[-15.799999999999997,-21.33],[-29.799999999999997,-28.58],[-38.55,-26.08],[-53.55,8.170000000000002]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_leftpetal3"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[80.55099999999999,79.999],[82.16201999999998,79.999],[82.16201999999998,79.999],[80.02419646,79.999],[80.23040702,94.39882],[80.01694687,82.39897],[80.46078288,81.59898],[79.99842014,79.999],[79.99842014,79.999],[80.43339553999999,78.53101835000001],[80.55099999999999,79.999]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(2, _KIE.HOLD); }catch(e){}
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_leftpetal3" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["SunFlower_rightpetal4"].property("Transform").property("Position");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[159.45,22.17],[166.7,20.67],[181.45,-3.8299999999999983],[188.2,-7.329999999999998],[200.95,-7.829999999999998],[223.45,23.169990000000002],[219.7,29.67],[204.7,-1.8299999999999983],[190.7,-6.579999999999998],[179.45,-12.329999999999998],[159.45,22.17]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["SunFlower_rightpetal4"].property("Transform").property("Scale");
  var ts = [0,0.08333,0.25,0.5,0.75,1,1.08,1.25,1.5,1.75,2];
  var vs = [[100,100],[102,100],[102,100],[99.732,100],[102,93.489],[99.723,103],[100,102],[99.7,100],[99.7,100],[101,111.00000000000001],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{ p.setInterpolationTypeAtKey(2, _KIE.HOLD); }catch(e){}
  try{ p.setInterpolationTypeAtKey(8, _KIE.HOLD); }catch(e){}
})();
// Bone "SunFlower_rightpetal4" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["backleaf"].property("Transform").property("Position");
  var ts = [0,0.41667,0.91667,1.5,2];
  var vs = [[25.76,-14.849999999999994],[28.01,-7.099999999999994],[30.26,-11.599999999999994],[28.01,-7.099999999999994],[25.76,-14.849999999999994]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();
(function(){
  var p = BL["backleaf"].property("Transform").property("Scale");
  var ts = [0,0.41667,0.91667,1.5,2];
  var vs = [[100,100],[105,76.1],[110.00000000000001,94.992],[105,76.1],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
})();

} catch(e) { alert("Spine Import Error: " + e.toString()); }
app.endUndoGroup();
})();