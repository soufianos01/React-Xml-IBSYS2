import React, { Component } from 'react';

var parseString = require('xml2js').parseString;
var js2xmlparser = require("js2xmlparser");

class Main extends Component {
  state = {
    
  }
  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
  }
  
  uploadFile(event) {
    
      let file = event.target.files[0];
      file.text()
        .then(result => {
          let that = this;
          parseString(result, function (err, result) {
            that.updateStateHandler(result);
            // // updateStateHandler(result.input);
            // that.setState(result.input);
            // console.log(that.state)
            // console.log(result.input)
        });
        })
  }

  updateStateHandler = (result) => {
    let newState = {
      qualitycontrol: {"@": {type:"no", losequantity: "0", delay:"0"}},
      sellwish: {item:[]},
      selldirect: {item:[]},
      orderlist: {order:[]},
      productionlist: {production:[]},
      workingtimelist: {workingtime:[]},
    }

    newState.qualitycontrol["@"].type = result.input.qualitycontrol[0].$.type;
    newState.qualitycontrol["@"].losequantity = result.input.qualitycontrol[0].$.losequantity;
    newState.qualitycontrol["@"].delay = result.input.qualitycontrol[0].$.delay;

    result.input.sellwish[0].item.forEach(it => {
      let obj = {
        "@": {
          ...(it.$)
        }
      }
      newState.sellwish.item.push(obj);
    })

    result.input.selldirect[0].item.forEach(it => {
      let obj = {
        "@": {
          ...(it.$)
        }
      }
      newState.selldirect.item.push(obj);
    })

    result.input.orderlist[0].order.forEach(it => {
      let obj = {
        "@": {
          ...(it.$)
        }
      }
      newState.orderlist.order.push(obj);
    })

    result.input.productionlist[0].production.forEach(it => {
      let obj = {
        "@": {
          ...(it.$)
        }
      }
      newState.productionlist.production.push(obj);
    })

    result.input.workingtimelist[0].workingtime.forEach(it => {
      let obj = {
        "@": {
          ...(it.$)
        }
      }
      newState.workingtimelist.workingtime.push(obj);
    })

    this.setState(newState);

    // Convert state to XML
    console.log(js2xmlparser.parse("result", this.state));

  }
  
  render() {
    return <div>
        <h1>XML Upload and Generation for IBSYS2</h1>
        <span>
          <input type="file"
          name="myFile"
          onChange={this.uploadFile} />
        </span>
      </div>
  }
}

export default Main;