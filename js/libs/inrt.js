let mobile = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
if(!mobile){
  _ns("inrt.scroller");

  //
  // Initialization
  //

  inrt.scroller = function(cfg)
  {
    this.el = document.getElementById(cfg.elementId);

    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.velocity = { x: 0, y: 0 };
    this.scrollTimer = 0;

    this.invertMovement = cfg.invertMovement || false;
    this.defaultDrag = cfg.defaultDrag || 0.9;
    this.maxScrollSpeed = cfg.maxScrollSpeed || 40;

    this.el.onmousedown = delegate(this, this.onMouseDown);

    // touch device support
    this.el.addEventListener("touchstart", delegate(this, this.onTouchStart));
  };

  //
  // Events
  //

  // on mouse down
  inrt.scroller.prototype.onMouseDown = function(e)
  {
    if(e == null)
    {
      e = window.event;
    }

    var t = e.target != null ? e.target : e.srcElement;

    if(e.button == 1 && window.event != null || e.button == 0)
    {
      this.setStartPos(e.clientX, e.clientY);

      document.onmousemove = delegate(this, this.onMouseMove);
      document.onmouseup = delegate(this,this.onMouseUp);

      return false;
    }
  };

  // on mouse move
  inrt.scroller.prototype.onMouseMove = function(e)
  {
    if(e == null)
    {
      e = window.event;
    }

    this.updateScrollPos(e.clientX, e.clientY);
  };

  // on mouse up
  inrt.scroller.prototype.onMouseUp = function(e)
  {
    document.onmousemove = null;
    document.onmouseup = null;

    this.finish();
  };

  // on touch start
  inrt.scroller.prototype.onTouchStart = function(e)
  {
    e.preventDefault();

    if(e.changedTouches)
    {
      var t = e.changedTouches[0];

      this.setStartPos(t.clientX, t.clientY);

      this.tempMove = delegate(this, this.onTouchMove);
      this.tempEnd = delegate(this, this.onTouchEnd);

      document.addEventListener("touchmove", this.tempMove);
      document.addEventListener("touchend", this.tempEnd);
    }
  };

  // on touch move
  inrt.scroller.prototype.onTouchMove = function(e)
  {
    e.preventDefault();

    if(e.changedTouches)
    {
      var t = e.changedTouches[0];
      this.updateScrollPos(t.clientX, t.clientY);
    }
  };

  // on touch end
  inrt.scroller.prototype.onTouchEnd = function(e)
  {
    e.preventDefault();

    document.removeEventListener("touchmove", this.tempMove);
    document.removeEventListener("touchend", this.tempEnd);

    this.tempMove = this.tempEnd = null;

    this.finish();
  };

  //
  // Implementation
  //

  // update scroll pos
  inrt.scroller.prototype.updateScrollPos = function(x, y)
  {
    var oldX = this.el.scrollLeft;
    var oldY = this.el.scrollTop;

    var invert = this.invertMovement ? -1 : 1;
    this.el.scrollLeft = (this.offsetX + invert * (- x + this.startX));
    this.el.scrollTop = (this.offsetY + invert * (- y + this.startY));

    this.velocity = { x: this.el.scrollLeft - oldX, y: this.el.scrollTop - oldY };
  };

  // set start pos
  inrt.scroller.prototype.setStartPos = function(x, y)
  {
    this.startX = x;
    this.startY = y;

    this.velocity = {x: 0, y: 0};

    this.offsetX = this.el.scrollLeft;
    this.offsetY = this.el.scrollTop;
  };

  // cap speed
  inrt.scroller.prototype.capSpeed = function(value)
  {
    var res = 0;

    if(Math.abs(value) > this.maxScrollSpeed)
    {
      res = this.maxScrollSpeed;
      res *= (value < 0 ? -1 : 1);
      return res;
    }

    return value;
  };

  // finish
  inrt.scroller.prototype.finish = function()
  {
    this.velocity = { x: this.capSpeed(this.velocity.x), y: this.capSpeed(this.velocity.y) };

    if(this.velocity.x != 0 || this.velocity.y != 0)
    {
      requestAnimFrame(delegate(this, this.update));
    }
  };

  // update movement
  inrt.scroller.prototype.update = function()
  {
    // decelerate
    this.velocity.x = this.velocity.x * this.defaultDrag;
    this.velocity.y = this.velocity.y * this.defaultDrag;

    this.velocity.x = Math.round(this.velocity.x * 10) / 10;
    this.velocity.y = Math.round(this.velocity.y * 10) / 10;

    // make sure on full pixel
    this.el.scrollLeft = Math.round(this.el.scrollLeft + this.velocity.x);
    this.el.scrollTop = Math.round(this.el.scrollTop + this.velocity.y);

    if(Math.floor(Math.abs(this.velocity.x)) != 0 ||  Math.floor(Math.abs(this.velocity.y)) != 0)
    {
      requestAnimFrame(delegate(this, this.update));
    }
  };

  //
  // Helpers
  //

  // Namespace creator
  function _ns(id)
  {
    var t = window;
    var path = id.split(".");

    while(path.length != 0)
    {
      var p = path.shift();
      t[p] = t[p] || {};
      t = t[p];
    }
  };

  // Bind context
  function delegate(ctx, func)
  {
    return function() { return func.apply(ctx,arguments); };
  };

  // request animation polyfill
  // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
}
