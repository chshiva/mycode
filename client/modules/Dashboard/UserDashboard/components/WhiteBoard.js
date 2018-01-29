import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import styles from '../../Dashboard.css';

class WhiteBoard extends Component{
	constructor(props) {
		super(props);
		this.canvas = null;
		this.isDown = false;
		this.lineColor = '#000';
		this.fillColor = null;
    this.pauseSelection = false;
		this.jsonObjects = [];
    this.state = {
      current : 'Pointer'
    }
	}

	componentDidMount() {
    console.log("Its mounted", window.width, window.height);
		this.canvas = new fabric.Canvas('canvas');
		// this.canvas.setWidth(document.getElementById('canvPlace').offsetWidth);
		// this.canvas.setHeight(document.getElementById('canvPlace').offsetHeight);
    this.canvas.setWidth(window.innerWidth - 602);
    this.canvas.setHeight(window.innerHeight - 144);
    // console.log("Its mounted", document.getElementById('canvPlace').offsetWidth, document.getElementById('canvPlace').offsetHeight);

    if(this.canvas && this.props && this.props.whiteBoardData) {
      // console.log("whiteBoardData-- ", this.props.whiteBoardData)
      this.canvas.loadFromJSON(this.props.whiteBoardData);
      this.canvas.renderAll();
    }

		this.SyncWhiteBoard = this.SyncWhiteBoard.bind(this);
		this.props.confObject.WhiteBoardListener(this.SyncWhiteBoard);

		var that = this;
		this.canvas.on("path:created", function(o){
			that.emitCanvas();
		});

		this.canvas.on('object:modified', function(o){
			that.emitCanvas();
		});

    this.canvas.on('before:selection:cleared', function(o){
        that.emitCanvas();
    });
		//Default Brush
		// this.canvas.isDrawingMode = true;
    // this.canvas.freeDrawingBrush.width = 5;
	}

	emitCanvas(){
 		var jsonData = JSON.stringify(this.canvas);

 		//Undo and Redo
 		// this.jsonObjects.push(jsonData);

 		let objWb = {
                  command: 'WB-SYNC',
                  content: {wbContent: jsonData},
                  type: 'STRING'
                };
    this.props.confObject.sendMessage(objWb, 0);
    // var objWB = {key: 'WB', sender: Meteor.userId(), data: jsonData};
    
    // objCore.Conference(objCore).sendMessages(objWB);
	}

	selectDrawing(e){
    this.setState({current : e.currentTarget.title});
		this.canvas.isDrawingMode = false;
  	this.canvas.selection = true;
	}

	pencil(e){
    this.setState({current : e.currentTarget.title});
		this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.width = 5;
    this.canvas.freeDrawingBrush.color = this.lineColor;
	}

	rectangleDraw(e){
    this.setState({current : e.currentTarget.title});
    this.canvas.isDrawingMode = false;
    var rect, isDown, origX, origY;

    var that = this;
    this.clearCanvasEvents();
    this.canvas.observe('mouse:down', function(o){
      that.isDown = true;
      var pointer = that.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = that.canvas.getPointer(o.e);
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x-origX,
        height: pointer.y-origY,
        angle: 0,
        fill: 'rgba(0,0,0,0)',
        stroke: that.lineColor,
        strokeWidth: 3,
        transparentCorners: false,
      });
      that.canvas.add(rect);
    });

    this.canvas.observe('mouse:move', function(o){
      if (!that.isDown) return;
      var pointer = that.canvas.getPointer(o.e);
      
      if(origX>pointer.x){
        rect.set({ left: Math.abs(pointer.x) });
      }
      if(origY>pointer.y){
        rect.set({ top: Math.abs(pointer.y) });
      }
      
      if(rect){
        rect.set({ width: Math.abs(origX - pointer.x) });
      	rect.set({ height: Math.abs(origY - pointer.y) });
      }

      that.canvas.renderAll();
      that.canvas.isDrawingMode = false;
    });

    this.canvas.observe('mouse:up', function(o){
      that.isDown = false;
      that.canvas.remove(rect);
      that.canvas.off('mouse:down');
      that.canvas.off('mouse:move');
      that.canvas.off('mouse:up');
      that.canvas.add(rect);
      that.emitCanvas();
    });
	}

  clearCanvasEvents() {
    this.canvas.off('mouse:down');
    this.canvas.off('mouse:move');
    this.canvas.off('mouse:up');
  }

	circleDraw(e){
    this.setState({current : e.currentTarget.title});
    this.canvas.isDrawingMode = false;
    var circle, isDown, origX, origY;

    var that = this;
    this.clearCanvasEvents();
    this.canvas.observe('mouse:down', function(o){
      that.isDown = true;
      var pointer = that.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      circle = new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        //radius: 1,
        radius: pointer.x-origX,
        fill: 'rgba(0,0,0,0)',
        stroke: that.lineColor,
        strokeWidth: 3,
        selectable: true,
        originX: 'center', originY: 'center'
      });
      that.canvas.add(circle);
    });

    this.canvas.observe('mouse:move', function(o){
      if (!that.isDown) return;

      var pointer = that.canvas.getPointer(o.e);
      if(circle){
          circle.set({ radius: Math.abs(origX - pointer.x) });
      }
      that.canvas.renderAll();
      that.canvas.isDrawingMode = false;
      that.canvas.off('mouse:down');
    });

    this.canvas.observe('mouse:up', function(o){
      that.isDown = false;
      that.canvas.remove(circle);
      that.canvas.off('mouse:down');
      that.canvas.off('mouse:move');
      that.canvas.off('mouse:up');
      that.canvas.add(circle);
      that.canvas.selection = false;
      that.emitCanvas();
    });
	}

	lineDraw(e){
    this.setState({current : e.currentTarget.title});
		var line, isDown, origX, origY;
		var that = this;
		this.isDown = false;
    this.canvas.isDrawingMode = false;
    this.clearCanvasEvents();
    this.canvas.observe('mouse:down', function(o){
      that.isDown = true;
      var pointer = that.canvas.getPointer(o.e);
      var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
      line = new fabric.Line(points, {
        strokeWidth: 5,
        fill: 'rgba(0,0,0,0)',
        stroke: that.lineColor,
        originX: 'center',
        originY: 'center'
      });
      that.canvas.add(line);
    });

    this.canvas.observe('mouse:move', function(o){
      if (!that.isDown) return;
      var pointer = that.canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      that.canvas.renderAll();
      that.canvas.off('mouse:down');
    });

    this.canvas.observe('mouse:up', function(o){
      that.isDown = false;
      that.canvas.remove(line);
      that.canvas.off('mouse:move');
      that.canvas.off('mouse:down');
      that.canvas.off('mouse:up');
      that.canvas.add(line);
      that.emitCanvas();
    });
	}

	ellipseDraw(e){
    this.clearCanvasEvents();
    this.setState({current : e.currentTarget.title});
    this.canvas.isDrawingMode = false;
    var ellip, isDown, origX, origY;
    var that = this;
    console.log("this.isDown === ", that.isDown);
    this.canvas.observe('mouse:down', function(o){
      that.isDown = true;
      var pointer = that.canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      var pointer = that.canvas.getPointer(o.e);
      ellip = new fabric.Ellipse({
        left: origX,
        top: origY,
        originX: 'center',
        originY: 'center',
        rx: 1,
        ry: 1,
        angle: 0,
        fill: 'rgba(0,0,0,0)',
        stroke: that.lineColor,
        strokeWidth: 3,
        selectable: true,
        transparentCorners: true
      });
      that.canvas.add(ellip);
    });

    this.canvas.observe('mouse:move', function(o){
      if (!that.isDown) return;
      var pointer = that.canvas.getPointer(o.e);
      ellip.set({ rx: Math.abs(origX - pointer.x) });
      ellip.set({ ry: Math.abs(origY - pointer.y) });
      that.canvas.renderAll();
      that.canvas.isDrawingMode = false;
    });

    this.canvas.observe('mouse:up', function(o){
      that.isDown = false;
      that.canvas.remove(ellip);
      that.canvas.off('mouse:down');
      that.canvas.off('mouse:up');
      that.canvas.off('mouse:move');
      that.canvas.add(ellip);
      that.emitCanvas();
    });
	}

	setText(e){
    console.log("active object === ", this.canvas.getActiveObject());
    // this.canvas.selection = false;
    this.canvas.isDrawingMode = false;

    if (this.canvas.getActiveObject()) {
      this.canvas.discardActiveObject();
    }
    this.setState({current : e.currentTarget.title});
		
	  var that = this;
    var t;
    this.clearCanvasEvents();
    this.pauseSelection = true;
    this.canvas.on('mouse:down', function(o){
    console.log('Moving....')
  	var pointer = that.canvas.getPointer(o.e);
    var origX = pointer.x;
    var origY = pointer.y;
            
    t = new fabric.IText("Enter Text Here...", {
      top: origY,
      left: origX,
      width: 200,
      height:200,
      fill: that.lineColor,
      fontSize: 22,
      lockScalingX: false,
      lockScalingY: false,
      hasRotatingPoint: false,
      transparentCorners: false,
      cornerSize: 7,
      selectionStart:0,
      selectionEnd: 18,
    });

    t.on("selection:changed", function(){
      // console.log("change event");
      if(t.text == "Enter Text Here..."){
        // t.selectAll();
        // t.text = "";
      }
    });

    t.on("editing:entered", function(){
      if(t.text == "Enter Text Here..."){
        // t.selectAll();
        // t.text = "";
      } 
    });

    that.canvas.add(t).setActiveObject(t);
      // that.canvas.renderAll();
      t.enterEditing();
      // t.selectAll();
      // that.canvas.setActiveObject(t);
	    
	    t.on("editing:exited", function(){
        console.log("EDITED");
        if(t.text == ""){
            t.text = "Enter Text Here...";
        }
        t.off("selection:changed");
        t.off("editing:exited");
        t.off("editing:entered");
        // that.pauseSelection = false;
        that.emitCanvas();
    	});
            
      that.canvas.off('mouse:down');
    });
    // this.canvas.on("text:changed", function(){
    // 	// that.emitCanvas();
    // 	that.canvas.off('mouse:down');
    // });

    // emitCanvas();
	}

	removeActiveObject(e){
    this.setState({current : e.currentTarget.title});
		this.canvas.isDrawingMode = false;

		var that = this;
    var activeObject = this.canvas.getActiveObject();
    var activeGroup = this.canvas.getActiveObjects();
      console.log('Active', activeObject.length, activeGroup.length);
    if (activeGroup.length == 1) {
      // if (confirm('Are you sure?')) {
      this.canvas.remove(activeObject);
      // }
    }
    
    if (activeGroup.length > 1) {
      if (confirm('Are you sure?')) {
        // var objectsInGroup = activeGroup.getObjects();
        // this.canvas.discardActiveGroup();
        activeGroup.forEach(function(object) {
        	that.canvas.remove(object);
        });
            
      }
    }

    this.emitCanvas();
	}

	clearAll(e){
    console.log("whiteboard cleared");
    this.setState({current : e.currentTarget.title});
    this.canvas.isDrawingMode = false;
    var self = this;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_whiteboardObjects_alert, 
      function (result) {
        if(result) {          
          self.canvas.clear();
          self.emitCanvas();
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});  ;     
	}

	setLineColor(e){
    this.lineColor = e.target.value;
		var activeObject = this.canvas.getActiveObject();
    if(activeObject){
      activeObject.stroke = this.lineColor;
      activeObject.color = this.lineColor;
    }

    if(this.canvas.isDrawingMode){
      // this.canvas.isDrawingMode = false;
      this.canvas.freeDrawingBrush.color = this.lineColor;
      // this.canvas.isDrawingMode = true;
    }

    // emitCanvas();
	}

	setFillColor(e){
		let colorValue = e.target.value
		var activeObject = this.canvas.getActiveObject();
		if(activeObject){
			activeObject.fill = colorValue;
      this.canvas.renderAll();
      this.emitCanvas();
		}
	}

	render(){
		let cls_flexToolBar = `${styles.toolBarFlex} ${styles.flexColumn}`;
		return(
			<div className={styles.whiteBoardContainer}>
				<div className={styles.whiteboardToolBar}>
					<div className={styles.thinScroll}>
						<ul className={cls_flexToolBar}>
							<li id="pointer" title={this.props.intl.messages.pointer} onClick={this.selectDrawing.bind(this)} className={this.state.current == 'Pointer' ? styles.active : ''}>
								<img src="/images/whiteboard/move-tool.png" />
							</li>
							<li id="pencil" title={this.props.intl.messages.pencil} onClick={this.pencil.bind(this)} className={this.state.current == 'Pencil' ? styles.active : ''}>
								<img src="/images/whiteboard/pencil.png" />
							</li>
							<li id="square" title={this.props.intl.messages.square} onClick={this.rectangleDraw.bind(this)} className={this.state.current == 'Square' ? styles.active : ''}>
								<img src="/images/whiteboard/square.png" />
							</li>
							<li id="circle" title={this.props.intl.messages.circle} onClick={this.circleDraw.bind(this)} className={this.state.current == 'Circle' ? styles.active : ''}>
								<img src="/images/whiteboard/circle.png" />
							</li>
							<li id="oval" title={this.props.intl.messages.oval} onClick={this.ellipseDraw.bind(this)} className={this.state.current == 'Oval' ? styles.active : ''}>
								<img src="/images/whiteboard/oval.png" />
							</li>
							<li id="line" title={this.props.intl.messages.line} onClick={this.lineDraw.bind(this)} className={this.state.current == 'Line' ? styles.active : ''}>
								<img src="/images/whiteboard/line.png" />
							</li>
							<li id="alphabets" title={this.props.intl.messages.alphabets} onClick={this.setText.bind(this)} className={this.state.current == 'Alphabets' ? styles.active : ''}>
								<img src="/images/whiteboard/a.png" />
							</li>
							<li id="delete" title={this.props.intl.messages.delete} onClick={this.removeActiveObject.bind(this)} className={this.state.current == 'Delete' ? styles.active : ''}>
								<img src="/images/whiteboard/delete.png" />
							</li>
							<li id="eraseAll" title={this.props.intl.messages.erase_all} onClick={this.clearAll.bind(this)} className={this.state.current == 'Erase All' ? styles.active : ''}>
								<img src="/images/whiteboard/whiteboard.png" />
							</li>
							{/*<li title="Upload File">
															<img src="/images/whiteboard/img-file.png" />
														</li>*/}
							<li id="fillBackgroundColor" title={this.props.intl.messages.fill_background_colors} className={styles.colorPallet} >
								<input type="color" id="colorpicker" onChange={this.setFillColor.bind(this)} data-toggle="tooltip" data-placement="right" title={this.props.intl.messages.background}/>
							</li>
							<li id="stroke" title={this.props.intl.messages.stroke} className={styles.colorPallet} >
								<input className={styles.line} type="color" id="linecolor" onChange={this.setLineColor.bind(this)} data-toggle="tooltip" data-placement="right" title={this.props.intl.messages.line_color} />
							</li>
						</ul>
					</div>
				</div>
				<div id='canvPlace' className={styles.canvasContainer}>
					<canvas id="canvas"></canvas>
				</div>
			</div>
		);
	}

	////////////////////////////////
	SyncWhiteBoard(objData){
		// console.log(objData, this.canvas);
		if(this.canvas && objData){
			this.canvas.loadFromJSON(objData);
			this.canvas.renderAll();
		}
	}
	/////////////////////////////

  componentWillUnmount() {
    // console.log("this.props.confObject-----------", this.props.confObject.getConnectionStatus())
    if(this.props.confObject.getConnectionStatus()){
      this.props.saveWhiteBoardData(JSON.stringify(this.canvas));
    }
  }

}

WhiteBoard.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

WhiteBoard.propTypes = {
  intl: PropTypes.object,
  confObject: PropTypes.object,
};

export default injectIntl(WhiteBoard);
