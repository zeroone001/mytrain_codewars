function rgb(r, g, b)
{
   return toHex(r)+toHex(g)+toHex(b);
 }
functiontoHex(d){ if(d < 0 ) {return"00";} if(d > 255 ) {return"FF";} return ("0"+(Number(d).toString(16))).slice(-2).toUpperCase() }
//转到固定长度的十六进制字符串，不够则补0
function zero_fill_hex(num, digits) {
  var s = num.toString(16);
  while (s.length < digits)
    s = "0" + s;
  return s;
}

//mei的，怎么都没搜到怎么用javascript找出一个背景色的数值，只好自己解析
function rgb2hex(rgb) {
  //nnd, Firefox / IE not the same, fxck
  if (rgb.charAt(0) == '#')
    return rgb;
  var n = Number(rgb);
  var ds = rgb.split(/\D+/);
  var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
  return "#" + zero_fill_hex(decimal, 6);
}

