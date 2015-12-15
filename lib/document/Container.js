/*
	The Cedric's Swiss Knife (CSK) - CSK terminal toolbox
	
	Copyright (c) 2009 - 2015 Cédric Ronvel 
	
	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/



// Container: an enclosed surface (ScreenBuffer).
// Later it will feature a viewport and an internal surface, to allow scrolling.



// Load modules
var Element = require( './Element.js' ) ;
var ScreenBuffer = require( '../ScreenBuffer.js' ) ;



function Container() { throw new Error( 'Use Container.create() instead' ) ; }
module.exports = Container ;
Container.prototype = Object.create( Element.prototype ) ;
Container.prototype.constructor = Container ;
Container.prototype.elementType = 'Container' ;



Container.create = function createContainer( options )
{
	var container = Object.create( Container.prototype ) ;
	container.create( options ) ;
	return container ;
} ;



Container.prototype.create = function createContainer( options )
{
	if ( ! options || typeof options !== 'object' ) { options = {} ; }
	
	Element.prototype.create.call( this , options ) ;
	
	Object.defineProperties( this , {
		dstChildren: { value: null , enumerable: true , writable: true } ,
		screenBuffer: { value: null , enumerable: true , writable: true } ,
		viewportRect: { value: null , enumerable: true , writable: true } ,
	} ) ;
	
	this.screenBuffer = ScreenBuffer.create( {
		dst: this.dst ,
		x: this.x ,
		y: this.y ,
		width: this.width ,
		height: this.height
	} ) ;
	
	this.dstChildren = this.screenBuffer ;
	
	//this.draw() ;
} ;



Container.prototype.resize = function resize( to )
{
	this.screenBuffer.resize( to ) ;
} ;



Container.prototype.drawSelf = function drawSelf()
{
	// tmp?
	this.screenBuffer.x = this.x ;
	this.screenBuffer.y = this.y ;
	
	this.screenBuffer.draw() ;
} ;


