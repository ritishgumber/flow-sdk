var Flow = require('../dist/CloudBoostFlow.js')
var fs = require('fs');


exports.getComponent = function () {
    //initiate a CloudBoost Flow Component
    var c = new Flow.Component();

    //set description
    c.description = 'Read File';

    //add inports
    c.addInPort('in', {
        defaultValue: 'index.js' //name of the file
    });

    //add outports
    c.addOutPort('out');
    c.addOutPort('err');

    //function to be executed
    c.process(function (input, output) {
        //check if data is present at `in` port
        if (!input.hasData('in')) {
            return;
        }
        //fetch data from `in` port
        var filePath = input.getData('in');

        //read file 
        fs.readFile(filePath, 'utf-8', (err, contents) => {
            if (err) {
                //error handler
                output.done(err);
                return;
            }
            //send file contents to the out port
            output.send({
                out: contents
            });

            //Finished processing
            output.done();
        });


    })

    //return component
    return c;

}