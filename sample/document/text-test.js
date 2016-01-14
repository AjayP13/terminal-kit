#!/usr/bin/env node
/*
	The Cedric's Swiss Knife (CSK) - CSK terminal toolbox test suite
	
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

/* jshint unused:false */



//console.error( "\n\n\n\n\n\n\n\n" ) ;
var termkit = require( '../../lib/termkit.js' ) ;
var term = termkit.terminal ;



term.clear() ;

var document = term.createDocument( {
//	backgroundAttr: { bgColor: 'magenta' , dim: true } ,
} ) ;

var text1 = termkit.Text.create( {
	parent: document ,
	content: 'Hello!' ,
	attr: { color: 'magenta' } ,
	x: 10 ,
	y: 2 ,
} ) ;

var container1 = termkit.Container.create( {
	parent: document ,
	x: 50 ,
	y: 8 ,
	width: 30 ,
	height: 10 ,
	backgroundAttr: { bgColor: 'yellow' } ,
} ) ;

var text2 = termkit.Text.create( {
	parent: container1 ,
	content: 'World!\nWorld!\nW...' ,
	attr: { color: 'blue' } ,
	x: 4 ,
	y: 4 ,
} ) ;

//console.error( text2.parent ) ; process.exit() ;
//container1.draw() ;


term.on( 'key' , function( key ) {
	
	switch( key )
	{
		case 'CTRL_C' :
			term.grabInput( false ) ;
			term.hideCursor( false ) ;
			term.styleReset() ;
			term.clear() ;
			process.exit() ;
			break ;
		
		case 'ENTER' :
		case 'KP_ENTER' :
			text2.setContent( text2.getContent() + '\n' ) ;
			break ;
		
		case 'BACKSPACE' :
		case 'DELETE' :
			text2.setContent( text2.getContent().split( '\n' ).slice( 0 , -1 ).join( '\n' ) ) ;
			break ;
		
		default :
			text2.setContent( text2.getContent() + key ) ;
			break ;
	}
} ) ;


