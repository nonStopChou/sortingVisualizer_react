import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {bubbleSort, selectionSort, insertionSort, quickSort, mergeSort} from './sort_algorithm.js'

const animationSpeed = 25;
const datas = 100;
const bar_colors = ['green', 'reed', 'orange', 'yellow', 'purple', 'gray']
class Line extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			isHover:false,
			style:{
				left:this.props.position,
				borderColor:this.props.color,
				top: 600 - parseInt(this.props.value),
			}
		}
	}


	handleMouseOver = () => {
		this.setState({
			isHover:true,
		})
		const obj = document.getElementById('item_value')
		obj.innerHTML = this.props.value;
		this.setState({style:{...this.state.style, borderColor:"#2894FF"}});
	}

	handleMouseOut = () => {
		this.setState({
			isHover:false,
		})
		const obj = document.getElementById('item_value')
		obj.innerHTML = "";
		this.setState({style:{...this.state.style, borderColor:this.props.color}});
	}
	render(){
		return (
			<div className='vl' style={this.state.style} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></div>
		)
	}	
	


}

class SortVisualizer extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			lines : null,
			history : [],
			operations:[],
			isSetUp:false,
			counter:0,
			currentStep:-1,
			isRunning : false,
			selection: "Bubble_Sort",

		}
		document.body.style = 'background-color : #4F4F4F';
	}

	selectionChange = () => {
		const selection = document.getElementById('algorithm').value;
		this.setState({selection: selection});
	}

	randomInput = () => {
		if(!this.state.isRunning){
			console.log(this.state.isRunning);
			var input = [Array.from({length:datas}, () => Math.floor(Math.random() * 400))];
			var counter = this.state.counter;
			this.setState({history:input, counter:counter+1, currentStep:0});
		}
	}

	animate = (inputs) => {
		const [history, operations] = inputs;
		this.setState({history:history, operations:operations}, ()=>{
			for(let i = 0 ; i < history.length ; i++){
				setTimeout(()=>{
					this.setState({currentStep:i});
				}, animationSpeed * i);
			}
			setTimeout(()=>{
				this.setState({isRunning:false});
			}, animationSpeed * history.length);
		});
	}

	visualize = () => {
		if(!this.state.isRunning){
			this.setState({currentStep:0, isRunning:true});
			
			let returnValue = null;
			const input_array = this.state.history.slice(0, 1)[0];
			
			switch(this.state.selection){
				case "Bubble_Sort":
					returnValue = bubbleSort(input_array);
					break;
				case 'Selection_Sort':
					returnValue = selectionSort(input_array);
					break;
				case 'Insertion_Sort':
					returnValue = insertionSort(input_array);;
					break;
				case 'Quick_Sort':
					returnValue = quickSort(input_array);
					break;
				case 'Merge_Sort':
					returnValue = mergeSort(input_array);
					break;
			}
			this.animate(returnValue);
		}
	}

	render(){
		var lines = null;
		if(this.state.currentStep !== -1){
			const input = this.state.history[this.state.currentStep];
			const operations = this.state.operations[this.state.currentStep];
			lines = input.map((value, index) => {
						let percentage = 100 / (input.length + 1) * index;
						percentage = percentage.toString() + "%";
						
						let key = this.state.counter.toString() + '_' +this.state.currentStep.toString() + '_' + index.toString();
						
						// let color = "#FFD2D2";	
						let color = bar_colors[index % 6];

						if(this.state.isRunning){
							if(operations.includes(index)){
								color = "black";
							}
						}
						return (
								<Line key={key} position={percentage} color={color} value={value}/>
						);	
					});
		}

		return (
			<div>
				<nav className="bg-secondary navbar navbar-expand-lg p-4">
					<div className="collapse navbar-collapse">
							<ul className="navbar-nav">
									<li className="nav-item mx-4 pt-2">
										<select id='algorithm' onChange={()=>{this.selectionChange()}}>
											<option className="nav-link text-white" value="Bubble_Sort">Bubble Sort</option>
											<option className="nav-link text-white" value="Insertion_Sort">Insertion Sort</option>
											<option className="nav-link text-white" value="Selection_Sort">Selection Sort</option>
											<option className="nav-link text-white" value="Quick_Sort">Quick Sort</option>
											<option className="nav-link text-white" value="Merge_Sort">Merge Sort</option>
										</select>
									</li>
									<li className="nav-item">
										<button id="random" onClick={() => this.randomInput()}>Randomize Input</button>
									</li>
									<li className="nav-item">
										<button id="visual" onClick={() => this.visualize()}>Visualize</button>
									</li>
							</ul>

					</div>
				</nav>
				
				<div className="boundary">
					<label>Selection Item Value : <label id='item_value' style={{color:'White'}}></label></label>
					<li className="nav-link" >
						{lines}
					</li>
				</div>
			</div>
		);
	}

}


ReactDOM.render(
	<SortVisualizer />,
	document.getElementById('root'),
);


