// Auto-generated Spine to AE import script
(function() {
app.beginUndoGroup("Spine Import");
try {

var comp = app.project.items.addComp("ZenGarden_phonograph", 660, 743, 1, 2, 30);
comp.openInViewer();

var footageFolder = app.project.items.addFolder("Spine Footage");
var texDir = "F:/Code/AE/spineToAE/spine-files/唱片机/texture";
var ftg = {};
function imp(n) {
  var f = new File(texDir + "/" + n + ".png");
  if (!f.exists) return null;
  var item = app.project.importFile(new ImportOptions(f));
  item.parentFolder = footageFolder;
  return item;
}
ftg["ZenGarden_phonograph_base.png"] = imp("ZenGarden_phonograph_base.png");
ftg["ZenGarden_phonograph_needle.png"] = imp("ZenGarden_phonograph_needle.png");
ftg["ZenGarden_phonograph_record.png"] = imp("ZenGarden_phonograph_record.png");
ftg["ZenGarden_phonograph_shaft1.png"] = imp("ZenGarden_phonograph_shaft1.png");
ftg["ZenGarden_phonograph_shaft2.png"] = imp("ZenGarden_phonograph_shaft2.png");

var BL = {};
(function(){
  var n = comp.layers.addNull(2);
  n.name = "bone:root";
  n.label = 1;
  BL["root"] = n;
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([357.25,501.75]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(2);
  n.name = "bone:needle";
  n.label = 1;
  BL["needle"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([104.25,-36.5]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(2);
  n.name = "bone:record";
  n.label = 1;
  BL["record"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([58.5,-26.75]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(2);
  n.name = "bone:shaft2";
  n.label = 1;
  BL["shaft2"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([-7.5,-147]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(2);
  n.name = "bone:shaft1";
  n.label = 1;
  BL["shaft1"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([49.68602,-62.95]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();
(function(){
  var n = comp.layers.addNull(2);
  n.name = "bone:base";
  n.label = 1;
  BL["base"] = n;
  n.parent = BL["root"];
  var t = n.property("Transform");
  t.property("Anchor Point").setValue([50,50]);
  t.property("Position").setValue([44.5,2.75]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
})();

var SL = {};
SL["base"] = {};
(function(){
  var fg = ftg["ZenGarden_phonograph_base.png"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 2);
  ly.name = "base/ZenGarden_phonograph_base.png";
  ly.label = 9;
  ly.parent = BL["base"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.25, 50+0.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["base"]["ZenGarden_phonograph_base.png"] = ly;
})();
SL["shaft1"] = {};
(function(){
  var fg = ftg["ZenGarden_phonograph_shaft1.png"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 2);
  ly.name = "shaft1/ZenGarden_phonograph_shaft1.png";
  ly.label = 9;
  ly.parent = BL["shaft1"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+26.31, 50+-43.55]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["shaft1"]["ZenGarden_phonograph_shaft1.png"] = ly;
})();
SL["shaft2"] = {};
(function(){
  var fg = ftg["ZenGarden_phonograph_shaft2.png"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 2);
  ly.name = "shaft2/ZenGarden_phonograph_shaft2.png";
  ly.label = 9;
  ly.parent = BL["shaft2"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.25, 50+0.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["shaft2"]["ZenGarden_phonograph_shaft2.png"] = ly;
})();
SL["record"] = {};
(function(){
  var fg = ftg["ZenGarden_phonograph_record.png"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 2);
  ly.name = "record/ZenGarden_phonograph_record.png";
  ly.label = 9;
  ly.parent = BL["record"];
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width/2, fg.height/2]);
  t.property("Position").setValue([50+0.25, 50+0.25]);
  t.property("Rotation").setValue(0);
  t.property("Scale").setValue([100,100]);
  t.property("Opacity").setValue(100);
  SL["record"]["ZenGarden_phonograph_record.png"] = ly;
})();
SL["needle"] = {};
(function(){
  var fg = ftg["ZenGarden_phonograph_needle.png"];
  if (!fg) return;
  var ly = comp.layers.add(fg, 2);
  ly.name = "needle/ZenGarden_phonograph_needle.png";
  ly.label = 9;
  var t = ly.property("Transform");
  t.property("Anchor Point").setValue([fg.width*0.4471554545454545, fg.height*0.5100845272727272]);
  t.property("Position").setValue([330,371.5]);
  t.property("Position").expression = "var b0=thisComp.layer(\"bone:base\").toComp([50+(78.05),50+(-54.294)]);\nvar b1=thisComp.layer(\"bone:needle\").toComp([50+(-9.6621),50+(2.3705)]);\nb0*0.1457+b1*0.8543;";
  t.property("Rotation").setValue(0);
  t.property("Rotation").expression = "var p0a=thisComp.layer(\"bone:base\").toComp([50,50]);\nvar p0b=thisComp.layer(\"bone:base\").toComp([51,50]);\nvar a0=Math.atan2(p0b[1]-p0a[1],p0b[0]-p0a[0]);\nvar p1a=thisComp.layer(\"bone:needle\").toComp([50,50]);\nvar p1b=thisComp.layer(\"bone:needle\").toComp([51,50]);\nvar a1=Math.atan2(p1b[1]-p1a[1],p1b[0]-p1a[0]);\n(a0*0.1457+a1*0.8543-(0))*180/Math.PI;";
  t.property("Scale").setValue([97.33333333333334,98.63076923076923]);
  t.property("Opacity").setValue(100);
  SL["needle"]["ZenGarden_phonograph_needle.png"] = ly;
})();

// === Animation: default ===
(function(){
  var p = BL["needle"].property("Transform").property("Position");
  var ts = [0,0.03333,0.66667];
  var vs = [[104.25,-36.5],[104.25,-33],[104.25,-36.5]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{
    p.setTemporalEaseAtKey(2, [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)], [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)]);
    p.setTemporalEaseAtKey(3, [new KeyframeEase(0, 25), new KeyframeEase(0, 25)], [new KeyframeEase(0, 25), new KeyframeEase(0, 25)]);
  }catch(e){}
})();
(function(){
  var p = BL["record"].property("Transform").property("Position");
  var ts = [0,0.03333,0.66667];
  var vs = [[58.5,-26.75],[58.5,-22.75],[58.5,-26.75]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{
    p.setTemporalEaseAtKey(2, [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)], [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)]);
    p.setTemporalEaseAtKey(3, [new KeyframeEase(0, 25), new KeyframeEase(0, 25)], [new KeyframeEase(0, 25), new KeyframeEase(0, 25)]);
  }catch(e){}
})();
(function(){
  var p = BL["shaft1"].property("Transform").property("Position");
  var ts = [0,0.03333,0.66667];
  var vs = [[49.68602,-62.95],[42.68602,-64.7],[49.68602,-62.95]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{
    p.setTemporalEaseAtKey(2, [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)], [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)]);
    p.setTemporalEaseAtKey(3, [new KeyframeEase(0, 25), new KeyframeEase(0, 25)], [new KeyframeEase(0, 25), new KeyframeEase(0, 25)]);
  }catch(e){}
})();
(function(){
  var p = BL["shaft1"].property("Transform").property("Scale");
  var ts = [0,0.03333,0.66667];
  var vs = [[100,100],[100,106],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{
    p.setTemporalEaseAtKey(2, [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)], [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)]);
    p.setTemporalEaseAtKey(3, [new KeyframeEase(0, 25), new KeyframeEase(0, 25)], [new KeyframeEase(0, 25), new KeyframeEase(0, 25)]);
  }catch(e){}
})();
// Bone "shaft1" shear timeline omitted (AE has no native shear).
(function(){
  var p = BL["shaft2"].property("Transform").property("Position");
  var ts = [0,0.03333,0.66667];
  var vs = [[-7.5,-147],[-50.25,-143.47],[-7.5,-147]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{
    p.setTemporalEaseAtKey(2, [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)], [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)]);
    p.setTemporalEaseAtKey(3, [new KeyframeEase(0, 25), new KeyframeEase(0, 25)], [new KeyframeEase(0, 25), new KeyframeEase(0, 25)]);
  }catch(e){}
})();
(function(){
  var p = BL["shaft2"].property("Transform").property("Scale");
  var ts = [0,0.03333,0.66667];
  var vs = [[100,100],[120,73.425],[100,100]];
  for(var i=0;i<ts.length;i++) p.setValueAtTime(ts[i],vs[i]);
  var _KIE = KeyframeInterpolationType;
  try{
    p.setTemporalEaseAtKey(2, [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)], [new KeyframeEase(0, 0.1), new KeyframeEase(0, 0.1)]);
    p.setTemporalEaseAtKey(3, [new KeyframeEase(0, 25), new KeyframeEase(0, 25)], [new KeyframeEase(0, 25), new KeyframeEase(0, 25)]);
  }catch(e){}
})();
(function(){
  var ly = (SL["shaft2"]||{})["ZenGarden_phonograph_shaft2.png"];
  if(!ly) return;
  var op = ly.property("Transform").property("Opacity");
  op.setValueAtTime(0,100);
  op.setValueAtTime(1,100);
  for(var k=1;k<=op.numKeys;k++) op.setInterpolationTypeAtKey(k,KeyframeInterpolationType.HOLD);
})();

} catch(e) { alert("Spine Import Error: " + e.toString()); }
app.endUndoGroup();
})();